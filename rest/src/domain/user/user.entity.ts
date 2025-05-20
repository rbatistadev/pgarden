import { compare, hash } from 'bcrypt';
export class User {
  private refreshTokenHash?: string | null;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly companyId: string,
    public readonly createdAt: Date,
    refreshTokenHash?: string | null,
  ) {
    if (refreshTokenHash) {
      this.refreshTokenHash = refreshTokenHash;
    }
  }

  async verifyPassword(plainPassword: string): Promise<boolean> {
    return compare(plainPassword, this.passwordHash);
  }

  async setRefreshToken(token: string): Promise<void> {
    this.refreshTokenHash = await hash(token, 10);
  }

  async verifyRefreshToken(token: string): Promise<boolean> {
    if (!this.refreshTokenHash) {
      return false;
    }
    return compare(token, this.refreshTokenHash);
  }

  getRefreshTokenHash(): string | undefined | null {
    return this.refreshTokenHash;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }
}
