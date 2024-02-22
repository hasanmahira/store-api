// role.entity.ts
import { Entity, Column, Unique } from 'typeorm';
import { PERMISSION_TABLE_NAME } from '../constants/tableNames';
import { BaseEntity } from './base.entity';

@Entity({ name: PERMISSION_TABLE_NAME, orderBy: { id: 'ASC' } })
@Unique(['id'])
export class PermissionEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  // Add any other properties as needed
}
