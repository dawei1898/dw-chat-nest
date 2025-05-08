import { Snowflake } from 'snowflake-uid';
import { randomUUID } from 'crypto';

// 定义配置类型以增强类型安全性
interface SnowflakeConfig {
  epoch: number;
  workerId: number;
  processId: number;
  toString?: boolean;
}

/**
 * ID 工具类
 *
 * @author dawei
 */
export default class IdUtil {
  private static instance: Snowflake;

  static {
    this.instance = new Snowflake({
      epoch: 1735689600000, // 自定义纪元开始时间 (2025-01-01)
      workerId: 1, // 工作进程 ID
      processId: 1, // 数据中心 ID
      toString: false,
    } as SnowflakeConfig);
  }

  /**
   * 生成雪花ID（字符串形式）
   * @returns 返回字符串形式的ID
   */
  public static nextIdString(): string {
    return this.instance.generate().toString();
  }

  /**
   * 生成 BigInt 类型的雪花ID
   * @returns 返回 BigInt 形式的ID
   */
  public static nextId(): bigint {
    return BigInt(this.instance.generate());
  }

  /**
   * 生成UUID
   * @returns 返回UUID
   */
  public static UUID(): string {
    return randomUUID();
  }

  /**
   * 生成UUID（去掉中划线）
   * @returns 返回UUID
   */
  public static simpleUUID(): string {
    return randomUUID().replaceAll('-', '');
  }
}
