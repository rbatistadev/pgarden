import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';
import { IUserRepository } from 'src/domain/model/user/user.repository.interface';
import { User } from 'src/domain/model/user/user.entity';
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

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        passwordHash: user.getPasswordHash(),
        companyId: user.companyId,
        refreshTokenHash: user.getRefreshTokenHash(),
        role: user.role,
      },
    });

    return this.toEntity(createdUser);
  }

  private toEntity(prismaUser: PrismaUser): User {
    const user = new User(
      prismaUser.name,
      prismaUser.email,
      prismaUser.passwordHash,
      prismaUser.companyId,
      prismaUser.createdAt,
      prismaUser.refreshTokenHash,
      prismaUser.role,
    );

    user.id = prismaUser.id;

    return user;
  }
}
