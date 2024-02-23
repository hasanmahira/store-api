import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InsertResult, Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import { UserItemDto } from './dto/user.item.dto';
import { responseDtoValidator } from 'src/helpers/responseDtoValidator';
import { wait } from 'src/helpers/wait';

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

  async create(createUserDto: UserCreateDto): Promise<UserItemDto> {
    // Check for unique username
    const existingUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (existingUsername) {
      throw new ConflictException('Username is already taken');
    }

    // Check for unique email
    const existingEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingEmail) {
      throw new ConflictException('Email is already taken');
    }

    // Proceed with insertion if both username and email are unique
    const insertResult: InsertResult = await this.userRepository.insert(createUserDto);
    const { id } = insertResult?.identifiers?.[0];
    if (!id) {
      throw new InternalServerErrorException(`Failed to insert data in db. ${JSON.stringify(createUserDto)}`);
    }

    return this.findOneAnyway(id);
  }

  async findOneAnyway(id: number): Promise<UserItemDto> {
    try {
      return await this.findOne(id);
    } catch (e) {
      await wait(1000);
      return await this.findOneAnyway(id);
    }
  }

  async findOne(id: number): Promise<UserItemDto> {
    const user: UserEntity = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`No movie was found with the given id ${id}.`);
    }
    return responseDtoValidator<UserItemDto>(UserItemDto, user as any);
  }

  async findByUsername(username: string): Promise<UserItemDto> {
    const user: UserEntity = await this.userRepository.findOneBy({ username: username });
    if (!user) {
      throw new NotFoundException(`No movie was found with the given id ${username}.`);
    }
    return responseDtoValidator<UserItemDto>(UserItemDto, user as any);
  }

  async update(id: number, user: UserEntity): Promise<UserEntity | undefined> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
