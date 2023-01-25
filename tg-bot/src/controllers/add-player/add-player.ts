import * as NodeTelegramBotApi from 'node-telegram-bot-api';

import type {ITelegramBot, TChat, TUser} from '@services/telegram-bot';

import {HttpService} from '@services/http-service/http-service';
import {EHttpServiceEndpoint} from '@services/http-service/http-service.constant';
import {ChatDto, ChatGameDto, ChatUserDto, UserDto} from '@models';

export const controller = async (bot: ITelegramBot, user: TUser, chat: TChat, date: Date) => {
  const chatService = new HttpService<ChatDto>(EHttpServiceEndpoint.CHAT);
  const chatGameService = new HttpService<ChatGameDto>(EHttpServiceEndpoint.CHAT_GAME);
  const chatUserService = new HttpService<ChatUserDto>(EHttpServiceEndpoint.CHAT_USER);
  const userService = new HttpService<UserDto>(EHttpServiceEndpoint.USER);

  const [chatFromDb]: ChatDto[] = await chatService.findByParams({
    chatId: chat.id,
  });

  if (!chatFromDb) {
    await bot.sendMessage(
      chat.id,
      'Сначала нужно выбрать игру. Для этого введите команду /start',
    );
    return;
  }

  const [chatGame]: ChatGameDto[] = await chatGameService.findByParams({
    chatId: chatFromDb.id,
  });

  if (!chatGame) {
    await bot.sendMessage(
      chat.id,
      'Сначала нужно выбрать игру. Для этого введите команду /start',
    );
    return;
  }

  const keyboard = {
    reply_markup: JSON.stringify({
      inline_keyboard: [[{text: 'Я в игре!', callback_data: 1}]]
    })
  };

  // @ts-ignore
  await bot.sendMessage(chat.id, 'Присоединяйся!', keyboard);

  bot.once('callback_query', async (message: NodeTelegramBotApi.CallbackQuery) => {
    const {
      first_name: firstName,
      last_name: lastName,
      id: userId,
      username: userName,
    } = message.from;
    const chatId = message.message.chat.id;

    const [chatUser]: ChatUserDto[] = await chatUserService.findByParams({
      userId,
    });

    let [user]: UserDto[] = await userService.findByParams({
      telegramId: userId.toString(),
    });

    if (!user) {
      user = await userService.create({
        firstName,
        lastName,
        userName,
        telegramId: userId.toString(),
      });
    }

    if (chatUser === undefined) {
      const [chat]: ChatDto[] = await chatService.findByParams({chatId});

      await chatUserService.create({chatId: chat.id, userId: user.id});
    }

    await bot.sendMessage(chatId, `Ура! ${firstName} ${lastName} в игре!`);
  });
};
