import * as NodeTelegramBotApi from 'node-telegram-bot-api';

export interface ITelegramBot {
  subscribe: (
    command: string,
    callback: TTelegramBotSubscribeCallback
  ) => void;

  sendMessage: (chatId: number, text: string, options?: TSendMessageOptions) => Promise<TMessage>;

  setCommands: (commands: TBotCommand[]) => Promise<boolean>;

  getChat(chatId: number | string): Promise<TChat>;

  once(
    event: NodeTelegramBotApi.MessageType | 'message' | 'callback_query',
    listener: (
      message: NodeTelegramBotApi.Message | NodeTelegramBotApi.CallbackQuery,
      metadata: NodeTelegramBotApi.Metadata
    ) => void
  ): this;
}

export type TSendMessageOptions = NodeTelegramBotApi.SendMessageOptions;

export type TTelegramBotSubscribeCallback = (user: TUser, chat: TChat, date: Date, match: string[]) => void;

export type TBotCommand = NodeTelegramBotApi.BotCommand;

export type TMessage = NodeTelegramBotApi.Message;

export type TChat = NodeTelegramBotApi.Chat;

export type TUser = NodeTelegramBotApi.User;

export type TTelegramBotConfig = NodeTelegramBotApi.ConstructorOptions;

export type TSubscribeCallback = (from: TUser, chat: TChat, date: Date) => void;

export interface ITelegramBot {
  subscribe: (command: string, cb: TSubscribeCallback) => void;
  sendMessage: (chatId: number, text: string) => Promise<void>;
}
