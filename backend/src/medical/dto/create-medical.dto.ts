import {
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { MedicalHistoryEnum } from '../enums/medical.enum';
import { SeverityEnum } from '../enums/severity.enum';

export class CreateMedicalDto {
  @IsEnum(MedicalHistoryEnum)
  medicalType: MedicalHistoryEnum;

  @IsString()
  medicalDescription: string;

  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  attachments?: string[];

  @IsString()
  @IsOptional()
  notes?: string;

  @IsEnum(SeverityEnum)
  @IsOptional()
  severity?: SeverityEnum;

  @IsString()
  @IsOptional()
  doctorName?: string;

  @IsBoolean()
  @IsOptional()
  isShared?: boolean;

  @IsString()
  @IsOptional()
  hospitalName?: string;
}
