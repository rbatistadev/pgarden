import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  WORK_SESSION_REPOSITORY_INTERFACE,
  IWorkSessionRepository,
} from 'src/domain/model/work-session/work-session.repository';
import { WorkSession } from 'src/domain/model/work-session/work-session.entity';
import { RequestUser } from 'src/application/model/auth/auth.model';

@Injectable()
export class CheckInService {
  constructor(
    @Inject(WORK_SESSION_REPOSITORY_INTERFACE)
    private readonly attendanceRepository: IWorkSessionRepository,
  ) {}

  async execute(currentUser: RequestUser): Promise<WorkSession> {
    const open = await this.attendanceRepository.findOpenByUser(
      currentUser.userId!,
    );
    if (open) {
      throw new ConflictException('User already checked in');
    }
    const attendance = new WorkSession(
      null,
      currentUser.userId!,
      new Date(),
      null,
      null,
    );
    return this.attendanceRepository.create(attendance);
  }
}
