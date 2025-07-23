import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Batch } from '../entities/batch.entity';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';

@Injectable()
export class BatchService {
  constructor(
    @InjectRepository(Batch)
    private batchRepository: Repository<Batch>,
  ) {}

  async create(createBatchDto: CreateBatchDto): Promise<Batch> {
    const batch = this.batchRepository.create({
      ...createBatchDto,
      farm: { id: createBatchDto.farm_id } as any,
    });
    return await this.batchRepository.save(batch);
  }

  async findAll(): Promise<Batch[]> {
    return await this.batchRepository.find({
      relations: ['farm', 'pigs'],
    });
  }

  async findOne(id: string): Promise<Batch> {
    const batch = await this.batchRepository.findOne({
      where: { id },
      relations: ['farm', 'pigs'],
    });
    if (!batch) {
      throw new NotFoundException(`Batch with ID ${id} not found`);
    }
    return batch;
  }

  async update(id: string, updateBatchDto: UpdateBatchDto): Promise<Batch> {
    const batch = await this.findOne(id);
    Object.assign(batch, updateBatchDto);
    return await this.batchRepository.save(batch);
  }

  async remove(id: string): Promise<void> {
    const batch = await this.findOne(id);
    await this.batchRepository.remove(batch);
  }

  async findByFarm(farmId: string): Promise<Batch[]> {
    return await this.batchRepository.find({
      where: { farm: { id: farmId } },
      relations: ['farm', 'pigs'],
    });
  }
}
