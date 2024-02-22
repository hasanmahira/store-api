import { Entity, Column, Unique, Index, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BOOK_TABLE_NAME } from '../constants/tableNames';
import { BookStoreEntity } from './bookStore.entity';

@Entity({ name: BOOK_TABLE_NAME, orderBy: { id: 'ASC' } })
@Unique(['id'])
export class BookEntity extends BaseEntity {
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

  @ManyToMany(() => BookStoreEntity)
  @JoinTable()
  stores: BookStoreEntity[];
}
