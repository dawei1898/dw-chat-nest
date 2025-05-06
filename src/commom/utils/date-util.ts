import { format, differenceInSeconds } from 'date-fns';

/**
 * 日期工具类
 */
export class DateUtil {
  public static readonly FORMAT_DATE_SECOND: string = 'yyyy-MM-dd HH:mm:ss';

  /**
   * 获取当前日期时间字符串
   * @returns 当前日期时间字符串，格式为 yyyy-MM-dd HH:mm:ss
   */
  public static getCurrentDateTime(): string {
    return format(new Date(), this.FORMAT_DATE_SECOND);
  }

  /**
   * 格式化日期
   * @param date 日期对象
   * @param formatStr 格式字符串
   * @returns 格式化后的字符串
   */
  public static formatDate(
    date: Date,
    formatStr: string = this.FORMAT_DATE_SECOND,
  ): string {
    return format(date, formatStr);
  }

  /**
   * 计算输入的时间与现在的时间差值（秒）
   * @param startTime 开始时间毫秒值
   * @returns 耗费时间（秒），保留三位小数
   */
  public static getUseTime(startTime: number): string {
    const elapsedSeconds = differenceInSeconds(Date.now(), startTime);
    return (elapsedSeconds / 1000).toFixed(3); // 保持三位小数
  }
}
