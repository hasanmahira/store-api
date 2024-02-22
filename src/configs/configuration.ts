import * as dotenv from 'dotenv';

dotenv.config();

export interface IAppConfig {
  POSTGRES: {
    HOST: string;
    PORT: number;
    USERNAME: string;
    PASSWORD: string;
    DB: string;
    SSL: boolean;
    SYNCHRONIZE: boolean;
  };
  REDIS: {
    HOST: string;
    PORT: number;
    PASSWORD: string;
  };
  port: number;
  requestHandlerURL: string;
  READ_AUTH: {
    USERNAME: string;
    PASSWORD: string;
  };
  WRITE_AUTH: {
    USERNAME: string;
    PASSWORD: string;
  };
}

export default (): IAppConfig => ({
  requestHandlerURL: process.env.REQUEST_HANDLER_URL,
  POSTGRES: {
    HOST: process.env.POSTGRES_HOST,
    PORT: parseInt(process.env.POSTGRES_PORT),
    USERNAME: process.env.POSTGRES_USERNAME,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    DB: process.env.POSTGRES_DB,
    SSL: process.env.POSTGRES_SSL === 'true',
    SYNCHRONIZE: process.env.POSTGRES_SYNCHRONIZE === 'true',
  },
  REDIS: {
    HOST: process.env.REDIS_HOST,
    PORT: parseInt(process.env.REDIS_PORT),
    PASSWORD: process.env.REDIS_PASSWORD,
  },
  port: parseInt(process.env.PORT) || 3030,
  READ_AUTH: {
    USERNAME: process.env.READ_AUTH_USERNAME,
    PASSWORD: process.env.READ_AUTH_PASSWORD,
  },
  WRITE_AUTH: {
    USERNAME: process.env.WRITE_AUTH_USERNAME,
    PASSWORD: process.env.WRITE_AUTH_PASSWORD,
  },
});
