import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IUserRepository } from 'src/domain/user/user.repository';
import { User } from 'src/domain/user/user.entity';
import { User as PrismaUser } from '@prisma/client';
@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? this.toEntity(user) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.toEntity(user) : null;
  }

  async save(user: User): Promise<User> {
    const createdUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        refreshTokenHash: user.getRefreshTokenHash(),
      },
    });

    return this.toEntity(createdUser);
  }

  private toEntity(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.name,
      prismaUser.email,
      prismaUser.passwordHash,
      prismaUser.companyId,
      prismaUser.createdAt,
      prismaUser.refreshTokenHash,
    );
  }
}
