import * as NodeTelegramBotApi from 'node-telegram-bot-api';

import type {ITelegramBot, TChat, TUser} from '@services/telegram-bot';

import {HttpService} from '@services/http-service/http-service';
import {EHttpServiceEndpoint} from '@services/http-service/http-service.constant';
import {ChatDto, ChatGameDto, GameDto} from '@models';

export const controller = async (bot: ITelegramBot, user: TUser, chat: TChat, date: Date) => {
  const chatService = new HttpService<ChatDto>(EHttpServiceEndpoint.CHAT);
  const chatGameService = new HttpService<ChatGameDto>(EHttpServiceEndpoint.CHAT_GAME);
  const gameService = new HttpService<GameDto>(EHttpServiceEndpoint.GAME);

  const [chatFromDb]: ChatDto[] = await chatService.findByParams({chatId: chat.id});
  if (chatFromDb === undefined) {
    await chatService.create({chatId: chat.id});
  }

  const [chatGame]: ChatGameDto[] = await chatGameService.findByParams({chatId: chatFromDb.id});
  if (chatGame !== undefined) {
    const [game]: GameDto[] = await gameService.findByParams({
      id: chatGame.gameId,
    });
    await bot.sendMessage(chat.id, `Вы уже хотите поиграть в ${game.title}`);
    return;
  }

  const games: GameDto[] = await gameService.findAll();

  const keyboard = {
    reply_markup: JSON.stringify({
      inline_keyboard: games.map((game) => ([{
        text: game.title,
        callback_data: JSON.stringify({command: 'start', payload: game.id}),
      }]))
    })
  };

  // @ts-ignore
  await bot.sendMessage(chat.id, 'Во что будем играть?', keyboard);

  bot.once('callback_query', async (message: NodeTelegramBotApi.CallbackQuery) => {
    const data: any = JSON.parse(message.data);
    const chatId = message.message.chat.id;
    const game: GameDto = await gameService.findById(data.payload);

    const [chat]: ChatDto[] = await chatService.findByParams({chatId});

    await chatGameService.create({
      chatId: chat.id,
      gameId: data.payload,
    });

    await bot.sendMessage(chatId, `Решено! Играем в ${game.title}`)
  });
};
