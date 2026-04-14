import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  residentId?: string;

  @IsOptional()
  @IsISO8601()
  dueAt?: string;
}
