import { BaseEntity } from '../base.entity.abstract';

export class Attendance extends BaseEntity {
  constructor(
    public readonly id: string | null,
    public readonly userId: string,
    public checkIn: Date,
    public checkOut: Date | null,
  ) {
    super(id);
  }
}
