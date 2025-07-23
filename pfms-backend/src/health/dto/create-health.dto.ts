import { IsString, IsOptional, IsDateString, IsUUID, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { HealthStatus } from '../../entities/health.entity';

export class CreateHealthDto {
  @ApiProperty({ description: 'Pig ID for this health record' })
  @IsUUID()
  pig_id: string;

  @ApiProperty({ description: 'Date of health examination' })
  @IsDateString()
  examination_date: Date;

  @ApiProperty({ enum: HealthStatus, description: 'Health status of the pig' })
  @IsEnum(HealthStatus)
  health_status: HealthStatus;

  @ApiProperty({ description: 'Weight during check', required: false })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ description: 'Temperature reading', required: false })
  @IsOptional()
  @IsNumber()
  temperature?: number;

  @ApiProperty({ description: 'Treatment administered', required: false })
  @IsOptional()
  @IsString()
  treatment?: string;

  @ApiProperty({ description: 'Veterinarian name', required: false })
  @IsOptional()
  @IsString()
  veterinarian?: string;

  @ApiProperty({ description: 'Health check notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
