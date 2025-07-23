import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Pig } from '../entities/pig.entity';
import { Farm } from '../entities/farm.entity';
import { Batch } from '../entities/batch.entity';
import { Pen } from '../entities/pen.entity';
import { Health } from '../entities/health.entity';
import { FeedingLog } from '../entities/feeding-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pig, Farm, Batch, Pen, Health, FeedingLog])],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
