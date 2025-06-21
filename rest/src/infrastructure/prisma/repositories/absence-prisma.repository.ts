import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';
import { Absence } from 'src/domain/model/absence/absence.entity';
import { IAbsenceRepository } from 'src/domain/model/absence/absence.repository';
import { Absence as PrismaAbsence } from '@prisma/client';
import { AbsenceType } from 'src/domain/model/absence/absence-type';

@Injectable()
export class AbsencePrismaRepository implements IAbsenceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(absence: Absence): Promise<Absence> {
    const record = await this.prisma.absence.create({
      data: {
        userId: absence.userId,
        type: absence.type,
        startDate: absence.startDate,
        endDate: absence.endDate,
        days: absence.days,
        approved: absence.approved,
      },
    });
    return this.toEntity(record);
  }

  async findById(id: string): Promise<Absence | null> {
    const record = await this.prisma.absence.findUnique({ where: { id } });
    return record ? this.toEntity(record) : null;
  }

  async approve(id: string): Promise<Absence> {
    const record = await this.prisma.absence.update({
      where: { id },
      data: { approved: true },
    });
    return this.toEntity(record);
  }

  async countApprovedDaysByUserAndType(
    userId: string,
    type: AbsenceType,
  ): Promise<number> {
    const result = await this.prisma.absence.aggregate({
      where: { userId, type, approved: true },
      _sum: { days: true },
    });
    return result._sum.days ?? 0;
  }

  private toEntity(record: PrismaAbsence): Absence {
    return new Absence(
      record.id,
      record.userId,
      record.type as AbsenceType,
      record.startDate,
      record.endDate,
      record.days,
      record.approved,
    );
  }
}
