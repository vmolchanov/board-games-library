import type {TChat, TUser, ITelegramBot} from '@services/telegram-bot';
import Chat from '../../models/chat';
import ChatUser from '../../models/chat-user';
// import fetch from 'node-fetch';
import axios from 'axios';
import User from '../../models/user';
import ChatGame from '../../models/chat-game';
import Game from '../../models/game';

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

  const chatUsers = (await ChatUser.findAll({
    where: {
      chatId: chatFromDb.id,
    },
  })).map(chatUser => chatUser.dataValues);
  const chatGame = (await ChatGame.findOne({
    where: {
      chatId: chatFromDb.id,
    },
    rejectOnEmpty: false,
  }))?.dataValues;

  if (chatUsers.length === 0 || !chatGame) {
    await bot.sendMessage(
      chat.id,
      'Сначала нужно выбрать игру. Для этого введите команду /start',
    );
    return;
  }

  const game = (await Game.findByPk(chatGame.gameId)).dataValues;

  if (chatUsers.length < game.minPlayers) {
    await bot.sendMessage(chat.id, 'Недостаточно игроков :(');
    return;
  }

  for (let i = 0; i < chatUsers.length; i++) {
    const chatUser = chatUsers[i];

    console.log('chatUser', chatUser)

    const user = (await User.findByPk(chatUser.userId)).dataValues;

    console.log('user', user)

    try {
      const response = await axios('http://localhost:7000/auth/generate-login-link', {
        method: 'POST',
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          telegramId: user.telegramId,
          userName: user.nickName,
        },
      });
      const data: unknown = await response.data;

      // @ts-ignore
      await bot.sendMessage(user.telegramId, data.link);
    } catch(e) {
      console.log('e', e.response.data)
    }
  }
};
