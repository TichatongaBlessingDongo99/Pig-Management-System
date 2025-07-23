import { IsString, IsNumber, IsOptional, IsUUID, Min, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PenType } from '../../entities/pen.entity';

export class CreatePenDto {
  @ApiProperty({ description: 'Pen identifier/number' })
  @IsString()
  pen_number: string;

  @ApiProperty({ description: 'Farm ID where this pen belongs' })
  @IsUUID()
  farm_id: string;

  @ApiProperty({ description: 'Maximum capacity of the pen' })
  @IsNumber()
  @Min(1)
  capacity: number;

  @ApiProperty({ enum: PenType, description: 'Type of pen' })
  @IsEnum(PenType)
  pen_type: PenType;

  @ApiProperty({ description: 'Location description', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ description: 'Additional notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
