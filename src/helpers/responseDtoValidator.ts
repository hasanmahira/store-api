import { ClassConstructor, plainToInstance } from 'class-transformer';
import { HttpException, HttpStatus } from '@nestjs/common';
import { dtoValidator } from './dtoValidator';
import { ClassTransformOptions } from 'class-transformer/types/interfaces';

export const classTransformOptions: ClassTransformOptions = {
  excludeExtraneousValues: true,
  exposeDefaultValues: true,
  enableImplicitConversion: false,
  exposeUnsetFields: false,
};

export const responseDtoValidator = async <T>(dto: ClassConstructor<T>, obj: T): Promise<T> => {
  const returnError: string[] = await dtoValidator<T>(dto, obj);

  if (returnError.length > 0) {
    throw new HttpException(
      {
        error: 'Bad Response',
        message: returnError,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
  return plainToInstance<T, T>(dto, obj, classTransformOptions);
};
