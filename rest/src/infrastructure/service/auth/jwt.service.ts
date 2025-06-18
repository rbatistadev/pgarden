import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJsJwtService } from '@nestjs/jwt';
import {
  TokenModel,
  RequestUser,
} from '../../../application/model/auth/auth.model';
import { IAuth } from 'src/application/model/auth/auth.interface';
import { Role } from 'src/domain/model/role/role';

interface JwtPayload {
  sub: string;
  email: string;
  role: Role; // or use: string if dynamic
}

@Injectable()
export class JwtService implements IAuth {
  constructor(
    private readonly jwt: NestJsJwtService,
    private readonly config: ConfigService,
  ) {}

  generateAccessToken(payload: RequestUser): string {
    return this.jwt.sign(
      {
        sub: payload.userId,
        email: payload.email,
        role: payload.role,
        companyId: payload.companyId,
      },
      {
        secret: this.config.get('JWT_ACCESS_SECRET'),
        expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN'),
      },
    );
  }

  generateRefreshToken(payload: RequestUser): string {
    return this.jwt.sign(
      {
        sub: payload.userId,
        email: payload.email,
        role: payload.role,
        companyId: payload.companyId,
      },
      {
        secret: this.config.get('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN'),
      },
    );
  }

  verifyRefreshToken(token: string): TokenModel {
    const payload: JwtPayload = this.jwt.verify(token, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
    });

    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
