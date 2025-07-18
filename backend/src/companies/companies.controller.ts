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
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('city') city?: string,
    @Query('state') state?: string,
    @Query('services') services?: string,
    @Query('minRating') minRating?: string,
  ) {
    const skip = (page - 1) * limit;
    const take = limit;

    const filters = {
      city,
      state,
      services: services ? services.split(',') : undefined,
      minRating: minRating ? parseFloat(minRating) : undefined,
    };

    // Remove undefined values
    Object.keys(filters).forEach(key => 
      filters[key] === undefined && delete filters[key]
    );

    return this.companiesService.findAll({
      skip,
      take,
      where: this.buildWhereClause(filters),
      orderBy: { rating: 'desc' },
    });
  }

  @Get('search')
  search(
    @Query('q') query: string,
    @Query('city') city?: string,
    @Query('state') state?: string,
    @Query('services') services?: string,
    @Query('minRating') minRating?: string,
  ) {
    const filters = {
      city,
      state,
      services: services ? services.split(',') : undefined,
      minRating: minRating ? parseFloat(minRating) : undefined,
    };

    // Remove undefined values
    Object.keys(filters).forEach(key => 
      filters[key] === undefined && delete filters[key]
    );

    return this.companiesService.search(query || '', filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }

  private buildWhereClause(filters: any) {
    const where: any = {};

    if (filters.city) {
      where.city = { equals: filters.city, mode: 'insensitive' };
    }

    if (filters.state) {
      where.state = { equals: filters.state, mode: 'insensitive' };
    }

    if (filters.minRating) {
      where.rating = { gte: filters.minRating };
    }

    if (filters.services?.length) {
      where.services = {
        some: {
          service: {
            id: { in: filters.services },
          },
        },
      };
    }

    return where;
  }
}

