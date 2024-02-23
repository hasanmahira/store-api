import { Entity, Column, Unique, ManyToMany, JoinTable } from 'typeorm';
import { ROLE_TABLE_NAME } from '../constants/tableNames';
import { BaseEntity } from './base.entity';
import { PermissionEntity } from './permission.entity';

@Entity({ name: ROLE_TABLE_NAME, orderBy: { id: 'ASC' } })
@Unique(['id'])
export class RoleEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @ManyToMany(() => PermissionEntity)
  @JoinTable()
  permissions: PermissionEntity[];
}
