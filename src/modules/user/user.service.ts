import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InsertResult, Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import { UserItemDto } from './dto/user.item.dto';
import { responseDtoValidator } from 'src/helpers/responseDtoValidator';
import { wait } from 'src/helpers/wait';
import { UserUpdateDto } from './dto/user.update.dto';
import * as bcrypt from 'bcrypt';

const saltRounds = 10; // Adjust according to your security requirements

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserItemDto[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ id: id });
  }

  async create(user: UserCreateDto): Promise<UserItemDto> {
    // Check for unique username
    const existingUsername = await this.userRepository.findOne({
      where: { username: user.username },
    });

    if (existingUsername) {
      throw new ConflictException('Username is already taken');
    }

    // Check for unique email
    const existingEmail = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (existingEmail) {
      throw new ConflictException('Email is already taken');
    }

    user.salt = await bcrypt.genSalt(saltRounds);
    user.password = await this.hashPassword(user.password, user.salt);

    // Proceed with insertion if both username and email are unique
    const insertResult: InsertResult = await this.userRepository.insert(user);
    const { id } = insertResult?.identifiers?.[0];
    if (!id) {
      throw new InternalServerErrorException(`Failed to insert data in db. ${JSON.stringify(user)}`);
    }

    return this.findOneAnyway(id);
  }

  // Function to hash a password with a unique salt
  async hashPassword(password: string, salt: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  // Function to verify a password during login
  async verifyPassword(enteredPassword: string, storedHashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, storedHashedPassword);
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
      throw new NotFoundException(`No user was found with the given id ${id}.`);
    }
    return responseDtoValidator<UserItemDto>(UserItemDto, user as any);
  }

  async findByUsername(username: string): Promise<UserItemDto> {
    const user: UserEntity = await this.userRepository.findOneBy({ username: username });
    if (!user) {
      throw new NotFoundException(`No user was found with the given username ${username}.`);
    }
    return responseDtoValidator<UserItemDto>(UserItemDto, user as any);
  }

  async update(id: number, user: UserUpdateDto): Promise<UserItemDto | undefined> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
