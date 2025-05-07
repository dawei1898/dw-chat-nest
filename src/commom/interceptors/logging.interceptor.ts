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
import { AddressUtil } from '../utils/address.util';

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
      // 打印调用方 IP
      const remoteIp = AddressUtil.getRemoteIP(request);
      this.logger.log(`Remote IP: ${remoteIp}, Request Url: ${method} ${url}`);
      if (query && Object.keys(query).length > 0) {
        this.logger.log(`Request Query: ${JSON.stringify(query)}`);
      }
      if (params && Object.keys(params).length > 0) {
        this.logger.log(`Request Params: ${JSON.stringify(params)}`);
      }
      if (body && Object.keys(body).length > 0) {
        this.logger.log(`Request Body: ${JSON.stringify(body)}`);
      }
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
            `Request Url: ${method} ${url}, Response Body: ${JSON.stringify(data)}, useTime: ${Date.now() - now} ms`,
          );
        } catch (e) {
          this.logger.error('Failed to print response.', e);
        }
      }),
    );
  }
}
