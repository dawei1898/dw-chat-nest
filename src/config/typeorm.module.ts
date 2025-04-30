import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './database.config';

/**
 * 数据库连接
 */
const typeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const dbConfig = configService.get<DatabaseConfig>('database');
    return {
      type: 'mysql',
      host: dbConfig?.host,
      port: dbConfig?.port,
      username: dbConfig?.user,
      password: dbConfig?.password,
      database: dbConfig?.dbname,
      autoLoadEntities: true,
      //entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //synchronize: true,
    };
  },
});

export default typeOrmModule;
