import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InsertResult, Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import { UserItemDto } from './dto/user.item.dto';
import { responseDtoValidator } from 'src/helpers/responseDtoValidator';
import { wait } from 'src/helpers/wait';
import { UserUpdateDto } from './dto/user.update.dto';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from 'src/entities/role.entity';
import { PermissionEntity } from 'src/entities/permission.entity';

const saltRounds = 10; // Adjust according to your security requirements

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async findAll(): Promise<UserItemDto[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ id: id });
  }

  async create(user: UserCreateDto): Promise<UserItemDto> {
    // Check for unique username
    await uniqueCheck(user);

    user.salt = await bcrypt.genSalt(saltRounds);
    user.password = await this.hashPassword(user.password, user.salt);

    // Check roles and permissions
    this.validateRolesAndPermissions(user)
      .then(() => {})
      .catch((error) => {
        // Handle the error and send a response
        if (error instanceof BadRequestException) {
          // Return a 404 Not Found response with a custom error message
          throw new BadRequestException('Resource not found');
        }
      });

    // Proceed with insertion if both username and email are unique
    const insertResult: InsertResult = await this.userRepository.insert(user);
    const { id } = insertResult?.identifiers?.[0];
    if (!id) {
      throw new InternalServerErrorException(`Failed to insert data in db. ${JSON.stringify(user)}`);
    }

    return this.findOneAnyway(id);
  }

  async validateRolesAndPermissions(user) {
    for (const element of user.roles) {
      const role = await this.roleRepository.findOneBy({ name: element.name });
      console.log({ role });

      if (!role || !role.name) {
        throw new BadRequestException('Role is not valid');
        // throw new NotImplementedException('Role is not valid');
      }

      for (const item of element.permissions) {
        const permission = await this.permissionRepository.findOneBy({ name: item.name });
        console.log({ permission });

        if (!permission || !permission.name) {
          throw new BadRequestException('Permission is not valid');
          // throw new NotImplementedException('Permission is not valid');
        }
      }
    }
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
async function uniqueCheck(user: UserCreateDto) {
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
}
