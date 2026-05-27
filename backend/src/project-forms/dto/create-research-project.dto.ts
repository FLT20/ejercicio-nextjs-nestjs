import { IsArray, IsIn, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { BaseProjectFormDto } from './base-project-form.dto';

export class CreateResearchProjectDto extends BaseProjectFormDto {
  @IsString()
  @MinLength(10)
  researchQuestion!: string;

  @IsIn(['survey', 'experiment', 'interview', 'document-analysis'])
  methodology!: 'survey' | 'experiment' | 'interview' | 'document-analysis';

  @IsInt()
  @Min(1)
  expectedParticipants!: number;

  @IsArray()
  @IsString({ each: true })
  deliverables!: string[];

  @IsOptional()
  @IsString()
  ethicsApprovalCode?: string;
}
