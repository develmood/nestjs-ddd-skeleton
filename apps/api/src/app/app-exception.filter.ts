import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import { Response } from 'express';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  private response: Response;
  private status: number;

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    this.response = ctx.getResponse<Response>();
    this.status = exception.getStatus();

    const exceptionResponse = exception.getResponse();

    if (!exceptionResponse) {
      return this.createResponse( 'unspecified');
    }

    if (!exceptionResponse['message']) {
      return this.createResponse(exceptionResponse);
    }

    if (!Array.isArray(exceptionResponse['message'])) {
      return this.createResponse(exceptionResponse['message']);
    }

    this.createResponse(exceptionResponse['message'].pop());
  }

  private createResponse(value: unknown) {
    this.response
      .status(this.status)
      .json({
        status: this.status < 500 ? 'fail' : 'error',
        message: this.status < 500 ? undefined : value,
        data: this.status < 500 ? value : undefined,
      })
  }
}
