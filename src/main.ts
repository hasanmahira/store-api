import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import configuration from './configs/configuration';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UnhandledExceptions } from './unhandledExceptions';
import { QueryErrorFilter } from './queryErrorFilter';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { BookModule } from './modules/book/book.module';
import { BookStoreModule } from './modules/bookStore/bookStore.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ extended: true, limit: '100mb' }));
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      transform: true,
    }),
  );
  app.useGlobalFilters(new QueryErrorFilter(), new UnhandledExceptions());

  const options = new DocumentBuilder()
    .setTitle('Book Store API')
    .setDescription('Book Store API')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();

  const include = {
    include: [UserModule, RoleModule, PermissionModule, BookModule, BookStoreModule],
  };

  const document = SwaggerModule.createDocument(app, options, include);
  SwaggerModule.setup('api', app, document);

  await app.listen(configuration().port);
}
bootstrap();
