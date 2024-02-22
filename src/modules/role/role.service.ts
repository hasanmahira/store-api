import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async findAll(): Promise<RoleEntity[]> {
    return this.roleRepository.find();
  }

  async findById(id: number): Promise<RoleEntity | undefined> {
    return this.roleRepository.findOneBy({ id: id });
  }

  async create(role: RoleEntity): Promise<RoleEntity> {
    return this.roleRepository.save(role);
  }

  async update(id: number, role: RoleEntity): Promise<RoleEntity | undefined> {
    await this.roleRepository.update(id, role);
    return this.roleRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
