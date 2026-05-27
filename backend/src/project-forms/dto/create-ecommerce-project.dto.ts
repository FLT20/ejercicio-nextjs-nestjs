import { IsArray, IsIn, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { BaseProjectFormDto } from './base-project-form.dto';

export class CreateEcommerceProjectDto extends BaseProjectFormDto {
  @IsInt()
  @Min(1)
  productCount!: number;

  @IsArray()
  @IsString({ each: true })
  paymentMethods!: string[];

  @IsArray()
  @IsString({ each: true })
  shippingRegions!: string[];

  @IsIn(['physical', 'digital', 'mixed'])
  inventoryType!: 'physical' | 'digital' | 'mixed';

  @IsOptional()
  @IsString()
  @MinLength(5)
  integrations?: string;
}
