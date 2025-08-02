import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  USER_REPOSITORY_INTERFACE,
} from 'src/domain/model/user/user.repository.interface';
import { User } from 'src/domain/model/user/user.entity';
import * as bcrypt from 'bcrypt';
import { AUTH_INTERFACE, IAuth } from '../../model/auth/auth.interface';
import { RegisterDto } from '../../model/auth/register.dto';
import { RegisterResponseDto } from 'src/application/model/auth/register-response.dto';

@Injectable()
export class AuthRegisterService {
  constructor(
    @Inject(USER_REPOSITORY_INTERFACE)
    private readonly userRepository: IUserRepository,
    @Inject(AUTH_INTERFACE)
    private readonly authService: IAuth,
  ) {}

  async execute(dto: RegisterDto): Promise<RegisterResponseDto> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new Error('Email already in use');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = new User(
      dto.name,
      dto.email,
      passwordHash,
      null,
      new Date(),
      null,
      'ADMIN',
    );

    const createdUser = await this.userRepository.create(user);

    const accessToken = this.authService.generateAccessToken({
      userId: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
      companyId: createdUser.companyId,
    });
    const refreshToken = this.authService.generateRefreshToken({
      userId: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
      companyId: createdUser.companyId,
    });
    await createdUser.setRefreshToken(refreshToken);

    await this.userRepository.update(createdUser);

    return { token: accessToken, refreshToken };
  }
}
