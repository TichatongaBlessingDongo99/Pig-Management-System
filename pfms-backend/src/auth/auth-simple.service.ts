import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Mock user data for development (replace with database when ready)
const mockUsers = [
  {
    id: '1',
    email: 'admin@pfms.com',
    name: 'System Administrator',
    role: 'admin',
    status: 'active',
  },
  {
    id: '2', 
    email: 'manager@pfms.com',
    name: 'Farm Manager',
    role: 'manager',
    status: 'active',
  },
];

@Injectable()
export class AuthServiceSimple {
  constructor(private jwtService: JwtService) {}

  async login(email: string, password: string) {
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // For demo purposes, accept simple passwords
    const validPasswords = {
      'admin@pfms.com': 'admin123',
      'manager@pfms.com': 'manager123',
    };

    if (validPasswords[email] !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role,
      name: user.name 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async validateUser(payload: any) {
    const user = mockUsers.find(u => u.id === payload.sub);
    if (!user || user.status !== 'active') {
      return null;
    }
    return {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };
  }
}
