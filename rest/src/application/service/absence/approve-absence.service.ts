import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AbsenceType } from 'src/domain/model/absence/absence-type';
import {
  ABSENCE_REPOSITORY_INTERFACE,
  IAbsenceRepository,
} from 'src/domain/model/absence/absence.repository';
import { Agreement } from 'src/domain/model/agreement/agreement.entity';
import {
  AGREEMENT_REPOSITORY_INTERFACE,
  IAgreementRepository,
} from 'src/domain/model/agreement/agreement.repository';
import {
  IUserRepository,
  USER_REPOSITORY_INTERFACE,
} from 'src/domain/model/user/user.repository.interface';

@Injectable()
export class ApproveAbsenceService {
  constructor(
    @Inject(ABSENCE_REPOSITORY_INTERFACE)
    private readonly absenceRepository: IAbsenceRepository,
    @Inject(AGREEMENT_REPOSITORY_INTERFACE)
    private readonly agreementRepository: IAgreementRepository,
    @Inject(USER_REPOSITORY_INTERFACE)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(absenceId: string) {
    const absence = await this.absenceRepository.findById(absenceId);
    if (!absence) throw new NotFoundException('Absence not found');

    if (absence.approved) return absence;

    const user = await this.userRepository.findById(absence.userId);
    if (!user) throw new NotFoundException('User not found');

    const agreement = await this.agreementRepository.findByCompanyId(
      user.companyId,
    );
    if (!agreement) throw new BadRequestException('Agreement not configured');

    const used = await this.absenceRepository.countApprovedDaysByUserAndType(
      user.id!,
      absence.type,
    );
    const allowed = this.getAllowedDays(agreement, absence.type);

    if (used + absence.days > allowed) {
      throw new BadRequestException('Not enough days available');
    }

    return this.absenceRepository.approve(absenceId);
  }

  private getAllowedDays(agreement: Agreement, type: AbsenceType): number {
    switch (type) {
      case AbsenceType.VACATION:
        return agreement.vacationDays;
      case AbsenceType.MEDICAL:
        return agreement.medicalDays;
      case AbsenceType.DEATH:
        return agreement.deathDays;
      case AbsenceType.MOVING:
        return agreement.movingDays;
      default:
        throw new BadRequestException('Unrecognized abscence type');
    }
  }
}
