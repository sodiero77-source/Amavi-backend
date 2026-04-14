import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMedicationOrderDto {
  @IsString()
  @IsNotEmpty()
  residentId!: string;

  @IsString()
  @IsNotEmpty()
  medicationName!: string;

  @IsString()
  @IsNotEmpty()
  dose!: string;

  @IsString()
  @IsNotEmpty()
  route!: string;

  @IsString()
  @IsNotEmpty()
  frequency!: string;
}
