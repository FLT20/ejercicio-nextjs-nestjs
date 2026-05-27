import { IsArray, IsIn, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { BaseProjectFormDto } from './base-project-form.dto';

export class CreateSoftwareProjectDto extends BaseProjectFormDto {
  @IsIn(['web', 'api', 'dashboard', 'automation'])
  softwareType!: 'web' | 'api' | 'dashboard' | 'automation';

  @IsArray()
  @IsString({ each: true })
  mainFeatures!: string[];

  @IsArray()
  @IsString({ each: true })
  targetPlatforms!: string[];

  @IsString()
  @MinLength(10)
  technicalRequirements!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  estimatedUsers?: number;
}
