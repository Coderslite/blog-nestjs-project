import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  name: string;
}
