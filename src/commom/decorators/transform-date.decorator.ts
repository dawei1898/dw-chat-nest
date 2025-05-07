import { Transform } from 'class-transformer';
import { DateUtil } from '../utils/date.util';

/**
 * 日期 Date 转为 string， 装饰器
 */
export function TransformDate() {
  return Transform(({ value }) => (value ? DateUtil.formatDate(value) : null));
}
