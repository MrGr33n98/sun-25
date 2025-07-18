import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { CompaniesService } from '../companies/companies.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, CompaniesService],
  exports: [ReviewsService],
})
export class ReviewsModule {}

