import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class UnhandledExceptions implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.error(exception);
    const response = host.switchToHttp().getResponse();
    const message: string = (exception as any).message;
    const code: number = (exception as any).code;
    const status: number = (exception as any).status;
    const customResponse: any = {
      status: status || 500,
      message: message,
      errorCode: code,
      timestamp: new Date().toISOString(),
    };
    response.status(customResponse.status).json(customResponse);
  }
}
