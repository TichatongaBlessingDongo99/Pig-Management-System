import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Health } from '../entities/health.entity';
import { CreateHealthDto } from './dto/create-health.dto';
import { UpdateHealthDto } from './dto/update-health.dto';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(Health)
    private healthRepository: Repository<Health>,
  ) {}

  async create(createHealthDto: CreateHealthDto): Promise<Health> {
    const health = this.healthRepository.create({
      ...createHealthDto,
      pig: { id: createHealthDto.pig_id } as any,
    });
    return await this.healthRepository.save(health);
  }

  async findAll(): Promise<Health[]> {
    return await this.healthRepository.find({
      relations: ['pig', 'pig.farm'],
    });
  }

  async findOne(id: string): Promise<Health> {
    const health = await this.healthRepository.findOne({
      where: { id },
      relations: ['pig', 'pig.farm'],
    });
    if (!health) {
      throw new NotFoundException(`Health record with ID ${id} not found`);
    }
    return health;
  }

  async update(id: string, updateHealthDto: UpdateHealthDto): Promise<Health> {
    const health = await this.findOne(id);
    Object.assign(health, updateHealthDto);
    return await this.healthRepository.save(health);
  }

  async remove(id: string): Promise<void> {
    const health = await this.findOne(id);
    await this.healthRepository.remove(health);
  }

  async findByPig(pigId: string): Promise<Health[]> {
    return await this.healthRepository.find({
      where: { pig: { id: pigId } },
      relations: ['pig'],
      order: { examination_date: 'DESC' },
    });
  }

  async findByStatus(status: string): Promise<Health[]> {
    return await this.healthRepository.find({
      where: { health_status: status as any },
      relations: ['pig', 'pig.farm'],
    });
  }
}
