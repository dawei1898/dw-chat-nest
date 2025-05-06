import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

/**
 * 日志拦截器
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const { method, url, body, query, params } = request as any;

    try {
      // 打印入参
      //this.logger.debug('日志拦截器');
      //this.logger.log(`\n--- 接口请求开始 ---`);
      this.logger.log(`请求路径: ${method} ${url}`);
      this.logger.log('Request Query:', JSON.stringify(query));
      this.logger.log('Request Params:', JSON.stringify(params));
      this.logger.log('Request Body:', JSON.stringify(body));
      // 打印调用方 IP
      const clientIp = request.ip || request.connection.remoteAddress;
      this.logger.log('Client IP:', clientIp);
    } catch (e) {
      this.logger.error('Failed to print request.', e);
    }

    const now = Date.now();
    return next.handle().pipe(
      tap((data) => {
        try {
          //this.logger.debug('日志拦截器');
          // 打印返参
          this.logger.log(
            `请求路径: ${method} ${url}, Response Body: ${JSON.stringify(data)}`,
          );
          // 打印接口耗时
          this.logger.log(`接口耗时: ${Date.now() - now} ms`);
          //this.logger.log(`--- 接口请求结束 ---\n`);
        } catch (e) {
          this.logger.error('Failed to print response.', e);
        }
      }),
    );
  }
}
