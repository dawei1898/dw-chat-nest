import { Transform } from 'class-transformer';

/**
 * 转为 null 装饰器
 */
export function TransformNull() {
  return Transform(({ value }) => {
    return null;
  });
}
