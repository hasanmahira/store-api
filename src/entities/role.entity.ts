// role.entity.ts
import { Entity, Column, Unique } from 'typeorm';
import { ROLE_TABLE_NAME } from '../constants/tableNames';
import { BaseEntity } from './base.entity';

@Entity({ name: ROLE_TABLE_NAME, orderBy: { id: 'ASC' } })
@Unique(['id'])
export class RoleEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  // Add any other properties as needed
}
