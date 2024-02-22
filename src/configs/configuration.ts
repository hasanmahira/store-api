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
  port: number;
  requestHandlerURL: string;
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
  port: parseInt(process.env.PORT) || 3030,
});
