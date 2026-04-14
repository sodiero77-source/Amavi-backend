import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClinicalNoteDto {
  @IsString()
  @IsNotEmpty()
  residentId!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsString()
  @IsNotEmpty()
  problem!: string;

  @IsString()
  @IsNotEmpty()
  goal!: string;

  @IsString()
  @IsNotEmpty()
  objective!: string;
}
