import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';

/**
 * 自动处理 class-transformer 的 @Transform 装饰器
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        //console.log('自动处理 class-transformer 的 @Transform 装饰器逻辑');
        return instanceToPlain(data);
      }),
    );
  }
}
