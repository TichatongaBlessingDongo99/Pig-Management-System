import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedingController } from './feeding.controller';
import { FeedingService } from './feeding.service';
import { FeedingLog } from '../entities/feeding-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedingLog])],
  controllers: [FeedingController],
  providers: [FeedingService],
  exports: [FeedingService],
})
export class FeedingModule {}
