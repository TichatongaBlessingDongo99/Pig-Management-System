import { IsString, IsOptional, IsDateString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBatchDto {
  @ApiProperty({ description: 'Unique batch number' })
  @IsString()
  batch_number: string;

  @ApiProperty({ description: 'Farm ID where this batch belongs' })
  @IsUUID()
  farm_id: string;

  @ApiProperty({ description: 'Breed information' })
  @IsString()
  breed: string;

  @ApiProperty({ description: 'Batch start date' })
  @IsDateString()
  start_date: Date;

  @ApiProperty({ description: 'Batch end date', required: false })
  @IsOptional()
  @IsDateString()
  end_date?: Date;

  @ApiProperty({ description: 'Additional notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
