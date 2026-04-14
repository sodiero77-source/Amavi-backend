import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateResidentDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsDateString()
  dateOfBirth!: string;

  @IsDateString()
  admissionDate!: string;
}
