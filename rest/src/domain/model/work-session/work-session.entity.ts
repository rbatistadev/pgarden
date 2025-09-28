import { BaseEntity } from '../base.entity.abstract';
import { WorkSessionMetadataVo } from './work-session-metadata.vo';

export class WorkSession extends BaseEntity {
  constructor(
    public readonly id: string | null,
    public readonly userId: string,
    public startAt: Date,
    public endAt: Date | null,
    public metadata: WorkSessionMetadataVo | null,
  ) {
    super(id);
  }
}
