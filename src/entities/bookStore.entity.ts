import { Entity, Column, Unique, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BOOK_STORE_TABLE_NAME } from '../constants/tableNames';

@Entity({ name: BOOK_STORE_TABLE_NAME, orderBy: { id: 'ASC' } })
@Unique(['id'])
export class BookStoreEntity extends BaseEntity {
  @Column({ nullable: false })
  @Index()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  website_url: string;

  @Column({ nullable: true })
  logo_url: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;
}
