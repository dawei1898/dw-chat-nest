import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthException } from '../exceptions/auth.exception';
import { ApiResponse, AUTH_FAIL } from '../interfaces/api-response.interface';

/**
 * 鉴权失败异常捕捉器
 */
@Catch(AuthException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: AuthException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>(); // 明确指定类型为 express.Response

    const resp = ApiResponse.failWithCode(AUTH_FAIL, exception.message);
    response.status(HttpStatus.OK).json(resp);
  }
}
