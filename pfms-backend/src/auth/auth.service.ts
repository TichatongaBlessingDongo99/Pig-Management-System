import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole, UserStatus } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    
    const user = await this.userRepository.findOne({ 
      where: { email, status: UserStatus.ACTIVE },
      relations: ['farm']
    });
    
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role,
      farmId: user.farm?.id 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        farm: user.farm ? {
          id: user.farm.id,
          name: user.farm.name
        } : null
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    const { email, password, farmId, ...userData } = createUserDto;
    
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = this.userRepository.create({
      ...userData,
      email,
      password_hash: hashedPassword,
      status: UserStatus.ACTIVE,
      farm: farmId ? { id: farmId } as any : null,
    });

    const savedUser = await this.userRepository.save(user);
    
    // Remove password hash from response
    const { password_hash, ...userResponse } = savedUser;
    return userResponse;
  }

  async validateUser(payload: any) {
    const user = await this.userRepository.findOne({ 
      where: { id: payload.sub, status: UserStatus.ACTIVE },
      relations: ['farm']
    });
    
    if (!user) {
      throw new UnauthorizedException();
    }
    
    return user;
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['farm']
    });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const { password_hash, ...userResponse } = user;
    return userResponse;
  }
}
