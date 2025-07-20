import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}

  create(createQuoteDto: CreateQuoteDto) {
    return this.prisma.quote.create({ data: createQuoteDto });
  }

  findAll() {
    return this.prisma.quote.findMany({ include: { company: true, user: true } });
  }

  async findOne(id: string) {
    const quote = await this.prisma.quote.findUnique({ where: { id }, include: { company: true, user: true } });
    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }
    return quote;
  }

  async update(id: string, updateQuoteDto: UpdateQuoteDto) {
    await this.findOne(id);
    return this.prisma.quote.update({ where: { id }, data: updateQuoteDto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.quote.delete({ where: { id } });
  }
}
