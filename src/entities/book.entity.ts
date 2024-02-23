import { Entity, Column, Unique, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BOOK_TABLE_NAME } from '../constants/tableNames';
import { BookStoreEntity } from './bookStore.entity';

@Entity({ name: BOOK_TABLE_NAME, orderBy: { id: 'ASC' } })
@Unique(['id'])
export class BookEntity extends BaseEntity {
  @Column({ length: 100 })
  title: string;

  @Column({ length: 50 })
  author: string;

  @Column('text')
  description: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @ManyToMany(() => BookStoreEntity)
  @JoinTable()
  roles: BookStoreEntity[];
}
