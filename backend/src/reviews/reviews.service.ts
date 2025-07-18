import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class ReviewsService {
  constructor(
    private prisma: PrismaService,
    private companiesService: CompaniesService,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    // Check if user already reviewed this company
    const existingReview = await this.prisma.review.findFirst({
      where: {
        userId: createReviewDto.userId,
        companyId: createReviewDto.companyId,
      },
    });

    if (existingReview) {
      throw new ForbiddenException('User has already reviewed this company');
    }

    const review = await this.prisma.review.create({
      data: createReviewDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Update company rating
    await this.companiesService.updateRating(createReviewDto.companyId);

    return review;
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    companyId?: string;
    userId?: string;
    minRating?: number;
  }) {
    const { skip, take, companyId, userId, minRating } = params || {};

    const where: any = {};

    if (companyId) where.companyId = companyId;
    if (userId) where.userId = userId;
    if (minRating) where.rating = { gte: minRating };

    return this.prisma.review.findMany({
      skip,
      take,
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto, userId: string) {
    const review = await this.findOne(id);

    // Check if user owns this review
    if (review.userId !== userId) {
      throw new ForbiddenException('You can only update your own reviews');
    }

    const updatedReview = await this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Update company rating if rating was changed
    if (updateReviewDto.rating !== undefined) {
      await this.companiesService.updateRating(review.companyId);
    }

    return updatedReview;
  }

  async remove(id: string, userId: string) {
    const review = await this.findOne(id);

    // Check if user owns this review
    if (review.userId !== userId) {
      throw new ForbiddenException('You can only delete your own reviews');
    }

    await this.prisma.review.delete({
      where: { id },
    });

    // Update company rating
    await this.companiesService.updateRating(review.companyId);

    return { message: 'Review deleted successfully' };
  }

  async getCompanyReviewStats(companyId: string) {
    const reviews = await this.prisma.review.findMany({
      where: { companyId },
      select: { rating: true },
    });

    if (reviews.length === 0) {
      return {
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
      };
    }

    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

    const ratingDistribution = reviews.reduce(
      (acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    );

    return {
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      ratingDistribution,
    };
  }
}

