/**
 * 参数校验不通过异常
 */
export class ValidateException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidateException';
  }
}
