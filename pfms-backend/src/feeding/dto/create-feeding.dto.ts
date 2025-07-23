import { IsString, IsOptional, IsDateString, IsUUID, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedingDto {
  @ApiProperty({ description: 'Pig ID for this feeding record' })
  @IsUUID()
  pig_id: string;

  @ApiProperty({ description: 'Date of feeding' })
  @IsDateString()
  feeding_date: Date;

  @ApiProperty({ description: 'Type of feed given' })
  @IsString()
  feed_type: string;

  @ApiProperty({ description: 'Amount of feed in kg' })
  @IsNumber()
  @Min(0)
  quantity_kg: number;

  @ApiProperty({ description: 'Cost per kg of feed', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  cost_per_kg?: number;

  @ApiProperty({ description: 'Additional feeding notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
