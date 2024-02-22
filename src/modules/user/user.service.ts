import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ id: id });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async update(id: number, user: UserEntity): Promise<UserEntity | undefined> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
