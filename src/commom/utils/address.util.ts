import { Request } from 'express';
import { Logger } from '@nestjs/common';
import * as os from 'os';

export class AddressUtil {
  private static readonly logger = new Logger(AddressUtil.name);
  private static readonly UNKNOWN_STR = 'unknown';

  /**
   * 获取客户端 IP 地址
   */
  public static getRemoteIP(request: Request | undefined): string {
    let ip = '';

    try {
      if (!request) return ip;

      ip = request.headers['x-forwarded-for'] as string;

      if (this.isEmptyIP(ip)) {
        ip = request.headers['proxy-client-ip'] as string;
      }
      if (this.isEmptyIP(ip)) {
        ip = request.headers['wl-proxy-client-ip'] as string;
      }
      if (this.isEmptyIP(ip)) {
        ip = request.headers['http_client_ip'] as string;
      }
      if (this.isEmptyIP(ip)) {
        ip = request.headers['http_x_forwarded_for'] as string;
      }
      if (this.isEmptyIP(ip)) {
        ip = request.socket.remoteAddress || '';
        if (ip === '127.0.0.1' || ip === '::1') {
          ip = this.getLocalIP();
        }
      }

      if (ip.length > 15 && ip.includes(',')) {
        const ips = ip.split(',');
        for (const strIp of ips) {
          if (!this.isEmptyIP(strIp)) {
            ip = strIp.trim();
            break;
          }
        }
      }
    } catch (error) {
      this.logger.error('Failed to getRemoteIP.', error);
    }

    return ip;
  }

  /**
   * 判断IP是否为空或unknown
   */
  private static isEmptyIP(ip?: string): boolean {
    return (
      !ip || ip.trim().length === 0 || ip.toLowerCase() === this.UNKNOWN_STR
    );
  }

  /**
   * 获取本机IP地址
   */
  public static getLocalIP(): string {
    try {
      const interfaces = os.networkInterfaces();
      for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name] || []) {
          if (iface.family === 'IPv4' && !iface.internal) {
            return iface.address;
          }
        }
      }
    } catch (error) {
      this.logger.error('Failed to getLocalIP.', error);
    }
    return '';
  }
}
