import { ValidateException } from '../exceptions/validate.exception';

/**
 * 参数校验工具类
 */
export class ValidateUtil {
  private static readonly DEFAULT_MSG: string = '参数不能为空！';

  public static fail(message: string): never {
    throw new ValidateException(message);
  }

  public static isFalse(flag: boolean, message: string): void {
    if (flag) {
      throw new ValidateException(message);
    }
  }

  public static isTrue(flag: boolean, message: string): void {
    if (flag) {
      throw new ValidateException(message);
    }
  }

  public static isNull(obj: any, message: string): void {
    if (obj === null || obj === undefined) {
      throw new ValidateException(message);
    }
  }

  public static isNotNull(obj: any, message: string): void {
    if (obj !== null && obj !== undefined) {
      throw new ValidateException(message);
    }
  }

  public static isEmpty(str: string, message: string): void {
    if (!str) {
      throw new ValidateException(message);
    }
  }

  public static isNotEmpty(str: string, message: string): void {
    if (str) {
      throw new ValidateException(message);
    }
  }

  public static isEmptyArray<T>(array: T[], message: string): void {
    if (!array || array.length === 0) {
      throw new ValidateException(message);
    }
  }
}
