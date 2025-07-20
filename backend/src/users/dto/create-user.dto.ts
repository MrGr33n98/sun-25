import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  role?: UserRole;

  @IsOptional()
  @IsString()
  companyId?: string;
}
