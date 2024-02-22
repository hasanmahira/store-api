import 'reflect-metadata';
import { Global, Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from '../../entities/permission.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  providers: [PermissionService],
  controllers: [PermissionController],
  exports: [TypeOrmModule, PermissionModule, PermissionService],
})
export class PermissionModule {}
