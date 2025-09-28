import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';
import { IWorkSessionRepository } from 'src/domain/model/work-session/work-session.repository';
import { WorkSession } from 'src/domain/model/work-session/work-session.entity';
import { WorkSession as PrismaWorkSession } from '@prisma/client';
import { WorkSessionMetadataVo } from 'src/domain/model/work-session/work-session-metadata.vo';

@Injectable()
export class WorkSessionPrismaRepository implements IWorkSessionRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createOpen(
    userId: string,
    startAtUtc: Date,
    metadata?: WorkSessionMetadataVo,
  ): Promise<WorkSession> {
    const record = await this.prisma.workSession.create({
      data: {
        userId: userId,
        startAt: startAtUtc,
        endAt: null,
        metadata: metadata?.toJSON(),
      },
    });

    return this.toEntity(record);
  }
  closeOpenByUser(userId: number, endAtUtc: Date): Promise<WorkSession> {
    throw new Error('Method not implemented.');
  }
  listByUser(
    userId: number,
    from?: Date,
    to?: Date,
    take?: number,
    cursor?: number,
  ): Promise<WorkSession[]> {
    throw new Error('Method not implemented.');
  }

  /* async create(workSession: WorkSession): Promise<WorkSession> {
    const record = await this.prisma.attendance.create({
      data: {
        userId: workSession.userId,
        checkIn: workSession.checkIn,
        checkOut: workSession.checkOut,
      },
    });
    return this.toEntity(record);
  } */

  async findOpenByUser(userId: string): Promise<WorkSession | null> {
    const record = await this.prisma.workSession.findFirst({
      where: { userId, endAt: undefined },
      orderBy: { startAt: 'desc' },
    });

    return record ? this.toEntity(record) : null;
  }

  async update(workSession: WorkSession): Promise<WorkSession> {
    const record = await this.prisma.workSession.update({
      where: { id: workSession.id! },
      data: {
        endAt: workSession.endAt ?? undefined,
      },
    });
    return this.toEntity(record);
  }

  private toEntity(record: PrismaWorkSession): WorkSession {
    return new WorkSession(
      record?.id,
      record?.userId,
      record.startAt,
      record.endAt,
      null,
    );
  }
}
