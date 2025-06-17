import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';
import { IAttendanceRepository } from 'src/domain/model/attendance/attendance.repository';
import { Attendance } from 'src/domain/model/attendance/attendance.entity';
import { Attendance as PrismaAttendance } from '@prisma/client';

@Injectable()
export class AttendancePrismaRepository implements IAttendanceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(attendance: Attendance): Promise<Attendance> {
    const record = await this.prisma.attendance.create({
      data: {
        userId: attendance.userId,
        checkIn: attendance.checkIn,
        checkOut: attendance.checkOut,
      },
    });
    return this.toEntity(record);
  }

  async findOpenByUserId(userId: string): Promise<Attendance | null> {
    const record = await this.prisma.attendance.findFirst({
      where: { userId, checkOut: null },
    });
    return record ? this.toEntity(record) : null;
  }

  async update(attendance: Attendance): Promise<Attendance> {
    const record = await this.prisma.attendance.update({
      where: { id: attendance.id! },
      data: {
        checkOut: attendance.checkOut,
      },
    });
    return this.toEntity(record);
  }

  private toEntity(record: PrismaAttendance): Attendance {
    return new Attendance(
      record.id,
      record.userId,
      record.checkIn,
      record.checkOut,
    );
  }
}
