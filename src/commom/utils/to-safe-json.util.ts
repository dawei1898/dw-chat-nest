export interface ToSafeJsonOptions {
  handleBigInt?: boolean; // 默认为 true
  handleCircular?: boolean; // 默认为 true
  circularPlaceholder?: string; // 默认为 "[Circular]"
}

/**
 * 将 bigint 转为 string ， 避免序列化报错
 */
export function toSafeJson(obj: any, options: ToSafeJsonOptions = {}): any {
  const {
    handleBigInt = true,
    handleCircular = true,
    circularPlaceholder = '[Circular]',
  } = options;

  const seen = new WeakSet();

  function serialize(value: any): any {
    if (typeof value === 'bigint') {
      return handleBigInt ? value.toString() : value;
    }

    if (value instanceof Date) return value.toISOString();
    if (value instanceof Set) return Array.from(value).map(serialize);
    if (value instanceof Map) {
      const result: Record<string, any> = {};
      for (const [key, val] of value.entries()) {
        result[String(key)] = serialize(val);
      }
      return result;
    }
    if (Array.isArray(value)) return value.map(serialize);

    if (value !== null && typeof value === 'object') {
      if (handleCircular && seen.has(value)) return circularPlaceholder;
      seen.add(value);

      const result: Record<string, any> = {};
      for (const [key, val] of Object.entries(value)) {
        if (typeof val !== 'function' && typeof val !== 'undefined') {
          result[key] = serialize(val);
        }
      }
      return result;
    }

    return value;
  }

  return serialize(obj);
}
