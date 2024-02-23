import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import { RoleItemDto } from './dto/role.item.dto';
import { RoleUpdateDto } from './dto/role.update.dto';
import { RoleCreateDto } from './dto/role.create.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async findAll(): Promise<RoleItemDto[]> {
    return this.roleRepository.find();
  }

  async findById(id: number): Promise<RoleItemDto | undefined> {
    return this.roleRepository.findOneBy({ id: id });
  }

  async create(role: RoleCreateDto): Promise<RoleItemDto> {
    return this.roleRepository.save(role);
  }

  async update(id: number, role: RoleUpdateDto): Promise<RoleItemDto | undefined> {
    await this.roleRepository.update(id, role);
    return this.roleRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
