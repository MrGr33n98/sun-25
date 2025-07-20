import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { QuoteStatus } from '@prisma/client';

export class CreateQuoteDto {
  @IsEnum(QuoteStatus)
  @IsOptional()
  status?: QuoteStatus;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  budget?: number;

  @IsOptional()
  @IsString()
  message?: string;

  @IsString()
  userId: string;

  @IsString()
  companyId: string;
}
