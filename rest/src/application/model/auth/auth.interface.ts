import { RequestUser, TokenModel } from './auth.model';

export const AUTH_INTERFACE = Symbol('IAuth');

export interface IAuth {
  generateAccessToken(payload: RequestUser): string;
  generateRefreshToken(payload: RequestUser): string;
  verifyRefreshToken(token: string): TokenModel;
}
