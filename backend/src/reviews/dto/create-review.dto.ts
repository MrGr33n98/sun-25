import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsString()
  userId: string;

  @IsString()
  companyId: string;
}

