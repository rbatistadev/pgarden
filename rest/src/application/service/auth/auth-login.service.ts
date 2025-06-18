import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  IUserRepository,
  USER_REPOSITORY_INTERFACE,
} from 'src/domain/model/user/user.repository.interface';
import { AUTH_INTERFACE, IAuth } from '../../model/auth/auth.interface';

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

    await this.userRepository.update(user);

    return { token: accessToken, refreshToken };
  }
}
