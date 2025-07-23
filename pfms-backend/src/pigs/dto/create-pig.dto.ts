import { IsString, IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreatePigDto {
  @IsString()
  tag_id: string;

  @IsString()
  @IsOptional()
  rfid_tag?: string;

  @IsEnum(['male', 'female'])
  sex: string;

  @IsString()
  breed: string;

  @IsDateString()
  date_of_birth: string;

  @IsNumber()
  weight: number;

  @IsEnum(['alive', 'dead', 'sold', 'slaughtered'])
  @IsOptional()
  status?: string = 'alive';

  @IsString()
  @IsOptional()
  batch_id?: string;

  @IsString()
  @IsOptional()
  current_pen_id?: string;

  @IsString()
  @IsOptional()
  sire_id?: string;

  @IsString()
  @IsOptional()
  dam_id?: string;
}
