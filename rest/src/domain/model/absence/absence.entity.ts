import { BaseEntity } from '../base.entity.abstract';
import { AbsenceType } from './absence-type';

export class Absence extends BaseEntity {
  constructor(
    public readonly id: string | null,
    public readonly userId: string,
    public readonly type: AbsenceType,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly days: number,
    public approved: boolean,
  ) {
    super(id);
  }
}
