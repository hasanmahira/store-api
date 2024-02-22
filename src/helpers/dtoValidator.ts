import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
/**
Obj should not be empty, if there are no field then pass {}
 */
const dtoValidator = async <T>(dto: ClassConstructor<T>, obj: T): Promise<string[]> => {
  let returnError: string[] = [];
  if (typeof obj !== 'object') {
    returnError.push('Received empty object');
  }
  const objInstance = plainToInstance<T, T>(dto, obj, {
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
    enableImplicitConversion: true,
  });
  // @ts-ignore
  const errors = await validate(objInstance, {
    enableDebugMessages: true,
    whitelist: false,
    forbidNonWhitelisted: true,
    skipMissingProperties: false,
    transform: true,
  });
  if (errors.length > 0) {
    (function deepDive(e) {
      e?.map(({ constraints, children }) => {
        if (constraints && Object.keys(constraints)?.length) {
          Object.values(constraints as Object)?.map((i) => {
            returnError.push(i);
          });
        }
        if (children?.length) {
          deepDive(children);
        }
      });
    })(errors);
  }
  return returnError;
};

export { dtoValidator };
