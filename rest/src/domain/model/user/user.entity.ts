import { compare, hash } from 'bcrypt';
import { Role } from '../role/role';
export class User {
  private _refreshTokenHash: string | null;
  private _id: string | null;

  get refreshTokenHash() {
    return this._refreshTokenHash;
  }

  set refreshTokenHash(val: string | null) {
    this._refreshTokenHash = val;
  }

  get id() {
    return this._id;
  }

  set id(val: string | null) {
    this._id = val;
  }

  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly companyId: string,
    public readonly createdAt: Date,
    refreshTokenHash: string | null,
    public readonly role: Role = 'USER',
  ) {
    this._refreshTokenHash = refreshTokenHash;
  }

  async verifyPassword(plainPassword: string): Promise<boolean> {
    return compare(plainPassword, this.passwordHash);
  }

  async setRefreshToken(token: string): Promise<void> {
    this._refreshTokenHash = await hash(token, 10);
  }

  async verifyRefreshToken(token: string): Promise<boolean> {
    if (!this._refreshTokenHash) {
      return false;
    }
    return compare(token, this._refreshTokenHash);
  }

  getRefreshTokenHash(): string | undefined | null {
    return this._refreshTokenHash;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }
}
