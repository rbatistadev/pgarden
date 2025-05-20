import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  IUserRepository,
  USER_REPOSITORY_INTERFACE,
} from 'src/domain/user/user.repository';
import { AUTH_INTERFACE, IAuth } from './auth.interface';

@Injectable()
export class AuthLoginService {
  constructor(
    @Inject(USER_REPOSITORY_INTERFACE)
    private readonly userRepository: IUserRepository,
    @Inject(AUTH_INTERFACE)
    private readonly authService: IAuth,
  ) {}

  async execute(dto: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user || !(await user.verifyPassword(dto.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.authService.generateAccessToken(user.id);
    const refreshToken = this.authService.generateRefreshToken(user.id);
    await user.setRefreshToken(refreshToken);

    await this.userRepository.save(user);

    return { accessToken, refreshToken };
  }
}
