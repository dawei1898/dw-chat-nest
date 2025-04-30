/**
 * 鉴权失败异常
 */
export class AuthException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthException';
  }
}
