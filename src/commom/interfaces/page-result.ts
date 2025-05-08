/**
 * 分页结果封装对象
 *
 * @author dawei
 */
export class PageResult<T = any> {
  /**
   * 页码，从1开始
   */
  pageNum?: number = 1;

  /**
   * 每页数据条数
   */
  pageSize?: number = 10;

  /**
   * 总页数
   */
  pages?: number = 0;

  /**
   * 总记录数
   */
  total: number = 0;

  /**
   * 当前页结果
   */
  list: T[] = [];

  constructor() {}

  static buildEmpty<T>(): PageResult<T> {
    const pageResult = new PageResult<T>();
    pageResult.list = [];
    return pageResult;
  }

  static build<T>(
    pageNum: number,
    pageSize: number,
    total: number,
    rows: T[],
  ): PageResult<T> {
    const pageResult = new PageResult<T>();
    pageResult.list = rows;
    pageResult.pageNum = pageNum;
    pageResult.total = total;
    if (pageNum === 0) {
      pageResult.pageSize = total;
      pageResult.pages = 1;
    } else {
      pageResult.pageSize = pageSize;
      pageResult.pages = Math.ceil(total / pageSize);
    }
    return pageResult;
  }
}
