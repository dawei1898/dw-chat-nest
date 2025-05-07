import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../interfaces/api-response.interface';
import { ValidateException } from '../exceptions/validate.exception';

/**
 * 参数校验异常捕捉器
 */
@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(BadRequestExceptionFilter.name);

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>(); // 明确指定类型为 express.Response
    const request = ctx.getRequest<Request>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { method, url } = request as any;

    const excResponse = exception.getResponse() as {
      message: string | string[];
    };

    const errorMessage = Array.isArray(excResponse?.message)
      ? excResponse?.message.join('; ')
      : (excResponse?.message ?? '');

    const resp = ApiResponse.validateFail(errorMessage);
    this.logger.error(
      `请求路径: ${method} ${url}，参数校验不通过：${JSON.stringify(resp)}`,
    );
    response.status(HttpStatus.OK).json(resp);
  }
}

/**
 * 参数校验异常捕捉器
 */
@Catch(ValidateException)
export class ValidateExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidateExceptionFilter.name);

  catch(exception: ValidateException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>(); // 明确指定类型为 express.Response
    const request = ctx.getRequest<Request>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { method, url } = request as any;
    const resp = ApiResponse.validateFail(exception.message);
    this.logger.error(
      `请求路径: ${method} ${url}，参数校验不通过：${JSON.stringify(resp)}`,
    );
    response.status(HttpStatus.OK).json(resp);
  }
}
