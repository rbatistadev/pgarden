export const AUTH_INTERFACE = Symbol('IAuth');

export interface IAuth {
  generateAccessToken(payload: { sub: string }): string;
  generateRefreshToken(payload: { sub: string }): string;
  verifyRefreshToken(payload: { sub: string }): { sub: string };
}
