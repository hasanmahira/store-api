import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BookEntity } from './entities/book.entity';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configs/configuration';
import { PermissionEntity } from './entities/permission.entity';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { BookStoreEntity } from './entities/bookStore.entity';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { BookModule } from './modules/book/book.module';
import { BookStoreModule } from './modules/bookStore/bookStore.module';
import { ConnectionMiddleware } from './middlewares/connection.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES.HOST'),
        port: configService.get<number>('POSTGRES.PORT'),
        username: configService.get<string>('POSTGRES.USERNAME'),
        password: configService.get<string>('POSTGRES.PASSWORD'),
        database: configService.get<string>('POSTGRES.DB'),
        entities: [UserEntity, RoleEntity, PermissionEntity, BookEntity, BookStoreEntity],
        synchronize: configService.get<boolean>('POSTGRES.SYNCHRONIZE'),
        ssl: configService.get<boolean>('POSTGRES.SSL'),
        ...(configService.get<boolean>('POSTGRES.SSL')
          ? {
              extra: {
                ssl: {
                  rejectUnauthorized: false,
                },
              },
            }
          : {}),
        logging: true,
        connectTimeoutMS: 60000,
        maxQueryExecutionTime: 1000 * 60 * 60,
        extra: {
          statement_timeout: 1000 * 60 * 60,
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    BookModule,
    BookStoreModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ConnectionMiddleware).forRoutes('*');
  }
}
