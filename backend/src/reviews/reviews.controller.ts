import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Headers,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('companyId') companyId?: string,
    @Query('userId') userId?: string,
    @Query('minRating') minRating?: string,
  ) {
    const skip = (page - 1) * limit;
    const take = limit;

    return this.reviewsService.findAll({
      skip,
      take,
      companyId,
      userId,
      minRating: minRating ? parseInt(minRating) : undefined,
    });
  }

  @Get('company/:companyId/stats')
  getCompanyReviewStats(@Param('companyId') companyId: string) {
    return this.reviewsService.getCompanyReviewStats(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @Headers('user-id') userId: string,
  ) {
    return this.reviewsService.update(id, updateReviewDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('user-id') userId: string) {
    return this.reviewsService.remove(id, userId);
  }
}

