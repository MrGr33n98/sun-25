import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const { serviceIds, ...companyData } = createCompanyDto;

    const company = await this.prisma.company.create({
      data: {
        ...companyData,
        services: serviceIds
          ? {
              create: serviceIds.map((serviceId) => ({
                serviceId,
              })),
            }
          : undefined,
      },
      include: {
        services: {
          include: {
            service: true,
          },
        },
        reviews: true,
        projects: true,
      },
    });

    return company;
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CompanyWhereUniqueInput;
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params || {};

    return this.prisma.company.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        services: {
          include: {
            service: true,
          },
        },
        reviews: true,
        projects: true,
        _count: {
          select: {
            reviews: true,
            projects: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        services: {
          include: {
            service: true,
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        projects: true,
        _count: {
          select: {
            reviews: true,
            projects: true,
          },
        },
      },
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const { serviceIds, ...companyData } = updateCompanyDto;

    // Check if company exists
    await this.findOne(id);

    const company = await this.prisma.company.update({
      where: { id },
      data: {
        ...companyData,
        services: serviceIds
          ? {
              deleteMany: {},
              create: serviceIds.map((serviceId) => ({
                serviceId,
              })),
            }
          : undefined,
      },
      include: {
        services: {
          include: {
            service: true,
          },
        },
        reviews: true,
        projects: true,
      },
    });

    return company;
  }

  async remove(id: string) {
    // Check if company exists
    await this.findOne(id);

    return this.prisma.company.delete({
      where: { id },
    });
  }

  async search(query: string, filters?: {
    city?: string;
    state?: string;
    services?: string[];
    minRating?: number;
  }) {
    const where: Prisma.CompanyWhereInput = {
      AND: [
        {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        filters?.city ? { city: { equals: filters.city, mode: 'insensitive' } } : {},
        filters?.state ? { state: { equals: filters.state, mode: 'insensitive' } } : {},
        filters?.minRating ? { rating: { gte: filters.minRating } } : {},
        filters?.services?.length
          ? {
              services: {
                some: {
                  service: {
                    id: { in: filters.services },
                  },
                },
              },
            }
          : {},
      ],
    };

    return this.findAll({
      where,
      orderBy: { rating: 'desc' },
    });
  }

  async updateRating(companyId: string) {
    const reviews = await this.prisma.review.findMany({
      where: { companyId },
      select: { rating: true },
    });

    if (reviews.length === 0) {
      return this.prisma.company.update({
        where: { id: companyId },
        data: { rating: 0, reviewCount: 0 },
      });
    }

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    return this.prisma.company.update({
      where: { id: companyId },
      data: {
        rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
        reviewCount: reviews.length,
      },
    });
  }
}

