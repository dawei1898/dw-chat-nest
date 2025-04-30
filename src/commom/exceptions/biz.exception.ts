/**
 * 自定义业务异常
 */
export class BizException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BizException';
  }
}
