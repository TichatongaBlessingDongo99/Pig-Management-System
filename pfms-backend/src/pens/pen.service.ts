import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pen } from '../entities/pen.entity';
import { CreatePenDto } from './dto/create-pen.dto';
import { UpdatePenDto } from './dto/update-pen.dto';

@Injectable()
export class PenService {
  constructor(
    @InjectRepository(Pen)
    private penRepository: Repository<Pen>,
  ) {}

  async create(createPenDto: CreatePenDto): Promise<Pen> {
    const pen = this.penRepository.create({
      ...createPenDto,
      farm: { id: createPenDto.farm_id } as any,
    });
    return await this.penRepository.save(pen);
  }

  async findAll(): Promise<Pen[]> {
    return await this.penRepository.find({
      relations: ['farm', 'pigs'],
    });
  }

  async findOne(id: string): Promise<Pen> {
    const pen = await this.penRepository.findOne({
      where: { id },
      relations: ['farm', 'pigs'],
    });
    if (!pen) {
      throw new NotFoundException(`Pen with ID ${id} not found`);
    }
    return pen;
  }

  async update(id: string, updatePenDto: UpdatePenDto): Promise<Pen> {
    const pen = await this.findOne(id);
    Object.assign(pen, updatePenDto);
    return await this.penRepository.save(pen);
  }

  async remove(id: string): Promise<void> {
    const pen = await this.findOne(id);
    await this.penRepository.remove(pen);
  }

  async findByFarm(farmId: string): Promise<Pen[]> {
    return await this.penRepository.find({
      where: { farm: { id: farmId } },
      relations: ['farm', 'pigs'],
    });
  }

  async findAvailable(): Promise<Pen[]> {
    return await this.penRepository
      .createQueryBuilder('pen')
      .leftJoin('pen.pigs', 'pig')
      .having('COUNT(pig.id) < pen.capacity')
      .groupBy('pen.id')
      .getMany();
  }
}
