import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PenController } from './pen.controller';
import { PenService } from './pen.service';
import { Pen } from '../entities/pen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pen])],
  controllers: [PenController],
  providers: [PenService],
  exports: [PenService],
})
export class PenModule {}
