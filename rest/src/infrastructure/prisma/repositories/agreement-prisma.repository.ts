import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';
import { Agreement } from 'src/domain/model/agreement/agreement.entity';
import { IAgreementRepository } from 'src/domain/model/agreement/agreement.repository';
import { Agreement as PrismaAgreement } from '@prisma/client';

@Injectable()
export class AgreementPrismaRepository implements IAgreementRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsert(agreement: Agreement): Promise<Agreement> {
    const record = await this.prisma.agreement.upsert({
      where: { companyId: agreement.companyId },
      create: {
        companyId: agreement.companyId,
        vacationDays: agreement.vacationDays,
        medicalDays: agreement.medicalDays,
        deathDays: agreement.deathDays,
        movingDays: agreement.movingDays,
      },
      update: {
        vacationDays: agreement.vacationDays,
        medicalDays: agreement.medicalDays,
        deathDays: agreement.deathDays,
        movingDays: agreement.movingDays,
      },
    });
    return this.toEntity(record);
  }

  async findByCompanyId(companyId: string): Promise<Agreement | null> {
    const record = await this.prisma.agreement.findUnique({
      where: { companyId },
    });
    return record ? this.toEntity(record) : null;
  }

  async deleteByCompanyId(companyId: string): Promise<void> {
    await this.prisma.agreement
      .delete({ where: { companyId } })
      .catch(() => {});
  }

  private toEntity(record: PrismaAgreement): Agreement {
    return new Agreement(
      record.id,
      record.companyId,
      record.vacationDays,
      record.medicalDays,
      record.deathDays,
      record.movingDays,
    );
  }
}
