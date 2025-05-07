import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BizException } from '../exceptions/biz.exception';
import { ApiResponse } from '../interfaces/api-response.interface';

/**
 * 业务异常捕捉器
 */
@Catch(BizException)
export class BizExceptionFilter implements ExceptionFilter {
  catch(exception: BizException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>(); // 明确指定类型为 express.Response

    const resp = ApiResponse.fail(exception.message);
    response.status(HttpStatus.OK).json(resp);
  }
}
