/**
 * DeepSeek 模型枚举
 */
export enum ModelEnum {
  DEEPSEEK_CHAT = 'deepseek-chat',
  DEEPSEEK_REASONER = 'deepseek-reasoner',
}

/**
 * 模型角色枚举
 */
export enum RoleEnum {
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant',
  FUNCTION = 'function',
  TOOL = 'tool',
}

export enum MsgTypeEnum {
  USER = 'user',
  AI = 'ai',
}

export enum ContentTypeEnum {
  TEXT = 'text',
  IMAGE = 'image',
}
