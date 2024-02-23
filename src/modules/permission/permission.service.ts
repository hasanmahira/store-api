import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/entities/permission.entity';
import { Repository } from 'typeorm';
import { PermissionItemDto } from './dto/permission.item.dto';
import { PermissionUpdateDto } from './dto/permission.update.dto';
import { PermissionCreateDto } from './dto/permission.create.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async findAll(): Promise<PermissionItemDto[]> {
    return this.permissionRepository.find();
  }

  async findById(id: number): Promise<PermissionItemDto | undefined> {
    return this.permissionRepository.findOneBy({ id: id });
  }

  async create(permission: PermissionCreateDto): Promise<PermissionItemDto> {
    return this.permissionRepository.save(permission);
  }

  async update(id: number, permission: PermissionUpdateDto): Promise<PermissionItemDto | undefined> {
    await this.permissionRepository.update(id, permission);
    return this.permissionRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.permissionRepository.delete(id);
  }
}
