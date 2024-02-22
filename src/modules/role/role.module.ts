import 'reflect-metadata';
import { Global, Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../../entities/role.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [TypeOrmModule, RoleModule, RoleService],
})
export class RoleModule {}
