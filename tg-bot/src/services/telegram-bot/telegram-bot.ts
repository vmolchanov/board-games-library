import * as NodeTelegramBotApi from 'node-telegram-bot-api';
import type {
  ITelegramBot,
  TBotCommand,
  TTelegramBotConfig,
  TMessage,
  TTelegramBotSubscribeCallback
} from './telegram-bot.d';
import {TChat, TSendMessageOptions} from './telegram-bot.d';

let instance: TelegramBot = null;

class TelegramBot implements ITelegramBot {
  private _bot;

  constructor(token: string, config: TTelegramBotConfig) {
    if (instance !== null) {
      return instance;
    }

    this._bot = new NodeTelegramBotApi(token, config);
  }

  public subscribe(command: string, callback: TTelegramBotSubscribeCallback) {
    this._bot.onText(new RegExp(`/${command}\s*(.*)`), (message, match) => {
      callback(message.from, message.chat, new Date(message.date), [...match]);
    });
  }

  public sendMessage(chatId: number, text: string, options?: TSendMessageOptions): Promise<TMessage> {
    return this._bot.sendMessage(chatId, text, options);
  }

  public setCommands(commands: TBotCommand[]): Promise<boolean> {
    return this._bot.setMyCommands(commands);
  }

  public getChat(chatId: number | string): Promise<TChat> {
    return this._bot.getChat(chatId);
  }

  public once(
    event: NodeTelegramBotApi.MessageType | 'message' | 'callback_query',
    listener: (message: NodeTelegramBotApi.Message, metadata: NodeTelegramBotApi.Metadata) => void
  ): this {
    this._bot.once(event, listener);
    return this;
  }
}

export default TelegramBot;
