import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class BaseProjectFormDto {
  @IsString()
  @IsNotEmpty()
  projectName!: string;

  @IsString()
  @IsNotEmpty()
  applicantName!: string;

  @IsEmail()
  applicantEmail!: string;

  @IsString()
  @MinLength(20)
  summary!: string;
}
