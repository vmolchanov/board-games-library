import type {TChat, TUser} from '@services/telegram-bot';

export const controller = async (bot, user: TUser, chat: TChat, date: Date) => {
  bot.sendMessage(user.id, 'hello, world!');
};
