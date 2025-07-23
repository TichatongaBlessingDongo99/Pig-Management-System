import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedingLog } from '../entities/feeding-log.entity';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';

@Injectable()
export class FeedingService {
  constructor(
    @InjectRepository(FeedingLog)
    private feedingRepository: Repository<FeedingLog>,
  ) {}

  async create(createFeedingDto: CreateFeedingDto): Promise<FeedingLog> {
    const feeding = this.feedingRepository.create({
      ...createFeedingDto,
      pig: { id: createFeedingDto.pig_id } as any,
    });
    return await this.feedingRepository.save(feeding);
  }

  async findAll(): Promise<FeedingLog[]> {
    return await this.feedingRepository.find({
      relations: ['pig', 'pig.farm'],
      order: { feeding_date: 'DESC' },
    });
  }

  async findOne(id: string): Promise<FeedingLog> {
    const feeding = await this.feedingRepository.findOne({
      where: { id },
      relations: ['pig', 'pig.farm'],
    });
    if (!feeding) {
      throw new NotFoundException(`Feeding record with ID ${id} not found`);
    }
    return feeding;
  }

  async update(id: string, updateFeedingDto: UpdateFeedingDto): Promise<FeedingLog> {
    const feeding = await this.findOne(id);
    Object.assign(feeding, updateFeedingDto);
    return await this.feedingRepository.save(feeding);
  }

  async remove(id: string): Promise<void> {
    const feeding = await this.findOne(id);
    await this.feedingRepository.remove(feeding);
  }

  async findByPig(pigId: string): Promise<FeedingLog[]> {
    return await this.feedingRepository.find({
      where: { pig: { id: pigId } },
      relations: ['pig'],
      order: { feeding_date: 'DESC' },
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<FeedingLog[]> {
    return await this.feedingRepository
      .createQueryBuilder('feeding')
      .leftJoinAndSelect('feeding.pig', 'pig')
      .leftJoinAndSelect('pig.farm', 'farm')
      .where('feeding.feeding_date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .orderBy('feeding.feeding_date', 'DESC')
      .getMany();
  }
}
