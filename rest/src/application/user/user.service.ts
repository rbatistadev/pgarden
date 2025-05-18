import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserRepository } from 'src/domain/user/user.repository';
import { hash } from 'bcrypt';
import { User } from 'src/domain/user/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async register(dto: CreateUserDto): Promise<User> {
    const { name, email, password, companyId } = dto;

    const existing = await this.userRepository.findByEmail(email, companyId);
    if (existing) {
      throw new ConflictException('User already exists in this company');
    }

    const hashedPassword = await hash(password, 10);

    const newUser = new User(
      '',
      name,
      email,
      hashedPassword,
      companyId,
      new Date(),
    );

    return await this.userRepository.save(newUser);
  }
}
