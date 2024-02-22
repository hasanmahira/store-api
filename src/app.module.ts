import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookEntity } from './entities/book.entity';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configs/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES.HOST'),
        port: configService.get<number>('POSTGRES.PORT'),
        username: configService.get<string>('POSTGRES.USERNAME'),
        password: configService.get<string>('POSTGRES.PASSWORD'),
        database: configService.get<string>('POSTGRES.DB'),
        entities: [BookEntity],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
