import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, ArrayNotEmpty } from 'class-validator';

// Create DTO (corrected):
// - Explicit validation decorators
// - Enforces non-empty strings and positive price
// - Requires non-empty flavors array of strings
export class CreateCoffeeDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  brand!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  flavors!: string[];

  @IsNumber()
  @IsPositive()
  price!: number;
}
