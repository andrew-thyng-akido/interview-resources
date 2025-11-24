import { IsArray, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

// Update DTO (corrected):
// - All fields optional for PATCH semantics
// - Validation still enforced when fields provided
// - Preserves typing and guards each flavor entry
export class UpdateCoffeeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  flavors?: string[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;
}
