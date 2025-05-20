import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  USER_REPOSITORY_INTERFACE,
} from 'src/domain/user/user.repository';
import { User } from 'src/domain/user/user.entity';
import * as bcrypt from 'bcrypt';
import { AUTH_INTERFACE, IAuth } from './auth.interface';

@Injectable()
export class AuthRegisterService {
  constructor(
    @Inject(USER_REPOSITORY_INTERFACE)
    private readonly userRepository: IUserRepository,
    @Inject(AUTH_INTERFACE)
    private readonly authService: IAuth,
  ) {}

  async execute(dto: { name: string; email: string; password: string }) {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) throw new Error('Email already in use');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = new User(
      crypto.randomUUID(),
      dto.name,
      dto.email,
      passwordHash,
      '1',
      new Date(),
    );

    const accessToken = this.authService.generateAccessToken({ sub: user.id });
    const refreshToken = this.authService.generateRefreshToken({
      sub: user.id,
    });
    await user.setRefreshToken(refreshToken);

    await this.userRepository.save(user);

    return { accessToken, refreshToken };
  }
}
