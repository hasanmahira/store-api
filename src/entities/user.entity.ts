import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { RoleEntity } from './role.entity';
import { BaseEntity } from './base.entity';
import { USER_TABLE_NAME } from '../constants/tableNames';

@Entity({ name: USER_TABLE_NAME, orderBy: { id: 'ASC' } })
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  salt: string;

  // @Column()
  // failed_login_count: number;

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];
}
