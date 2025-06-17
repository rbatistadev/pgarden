import { BaseEntity } from '../base.entity.abstract';

export class Agreement extends BaseEntity {
  constructor(
    public readonly id: string | null,
    public readonly companyId: string,
    public vacationDays: number,
    public medicalDays: number,
    public deathDays: number,
    public movingDays: number,
  ) {
    super(id);
  }
}
