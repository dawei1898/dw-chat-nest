import * as process from 'node:process';

export interface AppConfig {
  port: number;
  appName: string;
  jwtSecret: string;
  jwtExpiresIn: number;
}

/**
 * 读取配置文件属性转为变量
 */
const appConfig = (): AppConfig => ({
  port: parseInt(process.env.PORT || '', 10) || 3000,
  appName: process.env.APP_NAME || '',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN || '0'),
});

export default appConfig;
