import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Company } from 'src/domain/company/company.entity';
import { ICompanyRepository } from 'src/domain/company/company.repository';

@Injectable()
export class CompanyPrismaRepository implements ICompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(company: Company): Promise<Company> {
    const record = await this.prisma.company.create({
      data: {
        name: company.name,
      },
    });

    return new Company(record.id, record.name);
  }

  async findByName(name: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({ where: { name } });
    return company ? new Company(company.id, company.name) : null;
  }

  async findById(id: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({ where: { id } });
    return company ? new Company(company.id, company.name) : null;
  }
}
