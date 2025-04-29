## DW Chat Nest

一个接入 DeepSeek 大模型的极简 AI 对话页面.
由 NestJS 构建的后端工程.


演示地址：https://dw-chat.dw1898.top

效果图：




#### 主要技术：

1.DeepSeek-V3、DeepSeek-R1 LLM

2.NextJS

3.Mysql

4.TypeORM




### 项目结构

dw-chat-web-lite：纯前端版工程     Github：https://github.com/dawei1898/dw-chat-web-lite

dw-chat-next：next 全栈版工程      Github：https://github.com/dawei1898/dw-chat-next

dw-chat-web：前端工程        Github：https://github.com/dawei1898/dw-chat-web

dw-chat：java 后端工程        Github：https://github.com/dawei1898/dw-chat

dw-chat-nest： NestJs 后端工程        Github：https://github.com/dawei1898/dw-chat-nest




### 初始化建表 SQL
/db/init-sql/init-ddl-postgres.sql

### 本地启动项目

安装依赖
```shell
npm install
```

启动项目

```bash
nest start --watch
```

打开项目 http://localhost:3000




### 本项目用到的库

创建项目
```shell
npm install -g @nestjs/cli
nest new project-name
```

生成模块
```shell
nest g module user
nest g controller user
nest g service user
```

配置
```shell
npm install --save @nestjs/config
```

指定环境配置文件启动
```shell
nest start --env-file .env.development
```
 

TypeORM 集成
```shell
npm install --save @nestjs/typeorm typeorm mysql2
```

参数校验
```shell
npm install --save class-validator class-transformer
```


Task Scheduling 任务调度
```shell
npm install --save @nestjs/schedule
```


Events 事件
```shell
npm install --save @nestjs/event-emitter
```

jwt
```shell
npm install --save @nestjs/jwt
```

Caching 缓存
```shell
npm install @nestjs/cache-manager cache-manager
```

openai
```shell
npm install openai
```