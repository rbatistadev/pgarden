import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJsJwtService } from '@nestjs/jwt';
import { TokenModel } from '../../../application/model/auth/auth.model';
import { IAuth } from 'src/application/model/auth/auth.interface';

@Injectable()
export class JwtService implements IAuth {
  constructor(
    private readonly jwt: NestJsJwtService,
    private readonly config: ConfigService,
  ) {}

  generateAccessToken(payload: TokenModel): string {
    return this.jwt.sign(payload, {
      secret: this.config.get('JWT_ACCESS_SECRET'),
      expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN'),
    });
  }

  generateRefreshToken(payload: TokenModel): string {
    return this.jwt.sign(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN'),
    });
  }

  verifyRefreshToken(token: string): TokenModel {
    return this.jwt.verify(token, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
    });
  }
}
