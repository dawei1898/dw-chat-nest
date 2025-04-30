import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  host: string;
  port: number;
  dbname?: string;
  user: string;
  password: string;
}

/**
 * 数据库配置
 */
const dbConfig = registerAs(
  'database',
  (): DatabaseConfig => ({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '', 10) || 3306,
    dbname: process.env.DATABASE_DBNAME,
    user: process.env.DATABASE_USER || '',
    password: process.env.DATABASE_PASSWORD || '',
  }),
);

export default dbConfig;
