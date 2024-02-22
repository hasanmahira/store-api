import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async findAll(): Promise<PermissionEntity[]> {
    return this.permissionRepository.find();
  }

  async findById(id: number): Promise<PermissionEntity | undefined> {
    return this.permissionRepository.findOneBy({ id: id });
  }

  async create(permission: PermissionEntity): Promise<PermissionEntity> {
    return this.permissionRepository.save(permission);
  }

  async update(id: number, permission: PermissionEntity): Promise<PermissionEntity | undefined> {
    await this.permissionRepository.update(id, permission);
    return this.permissionRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.permissionRepository.delete(id);
  }
}
