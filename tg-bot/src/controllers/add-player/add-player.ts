import type {TChat, TUser, ITelegramBot} from '@services/telegram-bot';
import ChatGame from '../../models/chat-game';
import * as NodeTelegramBotApi from 'node-telegram-bot-api';
import ChatUser from '../../models/chat-user';
import Chat from '../../models/chat';
import User from '../../models/user';
import axios from 'axios';

export const controller = async (bot: ITelegramBot, user: TUser, chat: TChat, date: Date) => {
  const chatFromDb = (await Chat.findOne({
    where: {
      chatId: chat.id,
    },
    rejectOnEmpty: false,
  }))?.dataValues;

  if (!chatFromDb) {
    await bot.sendMessage(
      chat.id,
      'Сначала нужно выбрать игру. Для этого введите команду /start',
    );
    return;
  }
  const chatGame = await ChatGame.findOne({
    where: {
      chatId: chatFromDb.id,
    },
    rejectOnEmpty: false,
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
      username: nickName,
    } = message.from;
    const chatId = message.message.chat.id;
    const chatUser = await ChatUser.findOne({
      where: {userId},
      rejectOnEmpty: false,
    });

    let user = (await User.findOne({
      where: {
        telegramId: userId.toString(),
      },
      rejectOnEmpty: false,
    }))?.dataValues;

    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        nickName,
        telegramId: userId.toString(),
      });
      try {
        await axios('http://localhost:7000/user', {
          method: 'POST',
          data: {
            firstName,
            lastName,
            userName: nickName,
            telegramId: userId.toString(),
          },
        })
      } catch {}
    }

    if (chatUser === null) {
      const chat = (await Chat.findOne({
        where: {chatId},
        rejectOnEmpty: false,
      })).dataValues;

      await ChatUser.create({chatId: chat.id, userId: user.id});
    }

    await bot.sendMessage(chatId, `Ура! ${firstName} ${lastName} в игре!`);
  });
};
