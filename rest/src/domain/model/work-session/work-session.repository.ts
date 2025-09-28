import { WorkSessionMetadataVo } from './work-session-metadata.vo';
import { WorkSession } from './work-session.entity';

export const WORK_SESSION_REPOSITORY_INTERFACE = Symbol(
  'IWorkSessionRepository',
);

export interface IWorkSessionRepository {
  createOpen(
    userId: string,
    startAtUtc: Date,
    metadata?: WorkSessionMetadataVo,
  ): Promise<WorkSession>;
  closeOpenByUser(userId: string, endAtUtc: Date): Promise<WorkSession>;
  findOpenByUser(userId: string): Promise<WorkSession | null>;
  update(workSession: WorkSession): Promise<WorkSession>;
  listByUser(
    userId: number,
    from?: Date,
    to?: Date,
    take?: number,
    cursor?: number,
  ): Promise<WorkSession[]>;
}
