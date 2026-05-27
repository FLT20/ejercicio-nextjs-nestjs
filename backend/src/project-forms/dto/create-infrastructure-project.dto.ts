import { IsArray, IsIn, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { BaseProjectFormDto } from './base-project-form.dto';

export class CreateInfrastructureProjectDto extends BaseProjectFormDto {
  @IsIn(['cloud', 'on-premise', 'hybrid'])
  environment!: 'cloud' | 'on-premise' | 'hybrid';

  @IsArray()
  @IsString({ each: true })
  services!: string[];

  @IsString()
  @MinLength(10)
  availabilityRequirement!: string;

  @IsInt()
  @Min(1)
  estimatedMonthlyLoad!: number;

  @IsOptional()
  @IsString()
  securityRequirements?: string;
}
