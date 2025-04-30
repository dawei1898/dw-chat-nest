/**
 * 分页查询返参
 */
export interface PageResult<T = any> {
  pageNum?: number;
  pageSize?: number;
  pages?: number;
  total: number;
  list: T[];
}
