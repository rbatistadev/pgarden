import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  USER_REPOSITORY_INTERFACE,
} from 'src/domain/model/user/user.repository.interface';
import { User } from 'src/domain/model/user/user.entity';
import * as bcrypt from 'bcrypt';
import { AUTH_INTERFACE, IAuth } from '../../model/auth/auth.interface';
import { RegisterDto } from '../../model/auth/register.dto';
import {
  COMPANY_REPOSITORY_INTERFACE,
  ICompanyRepository,
} from 'src/domain/model/company/company.repository';
import { Company } from 'src/domain/model/company/company.entity';

@Injectable()
export class AuthRegisterService {
  constructor(
    @Inject(USER_REPOSITORY_INTERFACE)
    private readonly userRepository: IUserRepository,
    @Inject(COMPANY_REPOSITORY_INTERFACE)
    private readonly companyRepository: ICompanyRepository,
    @Inject(AUTH_INTERFACE)
    private readonly authService: IAuth,
  ) {}

  async execute(dto: RegisterDto) {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) throw new Error('Email already in use');

    const company = await this.companyRepository.create(
      new Company(null, dto.companyName),
    );

    if (!company.id) {
      throw new Error('Company not found');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = new User(
      dto.name,
      dto.email,
      passwordHash,
      company.id,
      new Date(),
      null,
      'ADMIN',
    );

    const accessToken = this.authService.generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
    });
    const refreshToken = this.authService.generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
    });
    await user.setRefreshToken(refreshToken);

    await this.userRepository.create(user);

    return { token: accessToken, refreshToken };
  }
}
