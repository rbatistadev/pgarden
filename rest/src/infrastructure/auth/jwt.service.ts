import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJsJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService implements JwtService {
  constructor(
    private readonly jwt: NestJsJwtService,
    private readonly config: ConfigService,
  ) {}

  generateAccessToken(payload: { sub: string }): string {
    return this.jwt.sign(payload, {
      secret: this.config.get('JWT_ACCESS_SECRET'),
      expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN'),
    });
  }

  generateRefreshToken(payload: { sub: string }): string {
    return this.jwt.sign(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN'),
    });
  }

  verifyRefreshToken(token: string): any {
    return this.jwt.verify(token, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
    });
  }
}
