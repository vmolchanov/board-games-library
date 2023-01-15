import type {ITelegramBot, TChat, TUser} from '@services/telegram-bot';
import Game from '../../models/game';
import {Model} from 'sequelize';
import * as NodeTelegramBotApi from 'node-telegram-bot-api';
import Chat from '../../models/chat';
import ChatGame from '../../models/chat-game';

export const controller = async (bot: ITelegramBot, user: TUser, chat: TChat, date: Date) => {
  const chatFromDb = await Chat.findOne({
    where: {
      chatId: chat.id,
    },
    rejectOnEmpty: false,
  });
  if (chatFromDb === null) {
    await Chat.create({chatId: chat.id});
  }

  const chatGame = await ChatGame.findOne({
    where: {
      chatId: chat.id,
    },
    rejectOnEmpty: false,
  });
  if (chatGame !== null) {
    const game: any = await Game.findOne({
      where: {
        id: (chatGame as Model).dataValues.gameId,
      },
      rejectOnEmpty: false,
    });
    await bot.sendMessage(chat.id, `Вы уже хотите поиграть в ${game.title}`);
    return;
  }

  const games = (await Game.findAll()).map((game: Model) => game.dataValues);

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
    const game: any = (await Game.findByPk(data.payload) as Model).dataValues;

    const chat = (await Chat.findOne({
      where: {chatId},
      rejectOnEmpty: false,
    })).dataValues;

    await ChatGame.create({
      chatId: chat.id,
      gameId: data.payload,
    });

    await bot.sendMessage(chatId, `Решено! Играем в ${game.title}`)
  });
};
