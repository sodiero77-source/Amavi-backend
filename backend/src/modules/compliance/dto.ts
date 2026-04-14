import { IsOptional, IsString } from 'class-validator';

export class CreateComplianceAlertDto {
  @IsString()
  title!: string;

  @IsString()
  detail!: string;

  @IsOptional()
  @IsString()
  residentId?: string;
}
