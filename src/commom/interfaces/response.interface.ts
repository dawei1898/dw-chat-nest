export const SUCCESS = 200;
export const VALIDATE_FAIL = 400;
export const AUTH_FAIL = 401;
const FAIL = 500;

const MSG_SUCCESS = '成功';
const MSG_FAIL = '失败';
const MSG_VALIDATE_FAIL = '参数校验不通过';

/**
 * 接口返参结构
 */
export interface Response<T = any> {
  code: number;
  message: string;
  data?: T;
}

export class ApiResponse<T> implements Response<T> {
  code: number;
  message: string;
  data?: T;

  static build<T>(code: number, msg: string, obj?: T): Response<T> {
    const response: Response<T> = { code, message: msg };
    if (obj !== undefined) {
      response.data = obj;
    }
    return response;
  }

  static success<T>(msgOrObj: string | T = MSG_SUCCESS, obj?: T): Response<T> {
    if (typeof msgOrObj === 'string') {
      return this.build(SUCCESS, msgOrObj, obj);
    } else {
      return this.build(SUCCESS, MSG_SUCCESS, msgOrObj);
    }
  }

  static fail<T>(msg: string = MSG_FAIL): Response<T> {
    return this.build(FAIL, msg);
  }

  static failWithCode<T>(code: number, msg: string): Response<T> {
    return this.build(code, msg);
  }

  static validateFail<T>(msg: string = MSG_VALIDATE_FAIL): Response<T> {
    return this.build(VALIDATE_FAIL, msg);
  }
}
