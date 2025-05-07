import { Transform } from 'class-transformer';

/**
 * bigint 转为 string 装饰器
 */
export function TransformBigint() {
  return Transform(({ value }) => {
    if (typeof value === 'bigint') {
      return value.toString();
    } else if (value === null || value === undefined) {
      return null;
    } else {
      // 可选：根据业务需求决定是否抛出错误或记录警告
      // throw new TypeError('Expected a bigint value');
      return value.toString();
    }
  });
}
