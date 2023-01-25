import type {ITelegramBot, TChat, TUser} from '@services/telegram-bot';

import {HttpService} from '@services/http-service/http-service';
import {EHttpServiceEndpoint} from '@services/http-service/http-service.constant';
import {ChatDto, ChatGameDto, ChatUserDto, GameDto, UserDto} from '@models';

export const controller = async (bot: ITelegramBot, user: TUser, chat: TChat, date: Date) => {
  const chatService = new HttpService<ChatDto>(EHttpServiceEndpoint.CHAT);
  const chatUserService = new HttpService<ChatUserDto>(EHttpServiceEndpoint.CHAT_USER);
  const chatGameService = new HttpService<ChatGameDto>(EHttpServiceEndpoint.CHAT_GAME);
  const gameService = new HttpService<GameDto>(EHttpServiceEndpoint.GAME);
  const userService = new HttpService<UserDto>(EHttpServiceEndpoint.USER);
  const authService = new HttpService(EHttpServiceEndpoint.GENERATE_AUTH_LINK);

  const [chatFromDb]: ChatDto[] = await chatService.findByParams({chatId: chat.id});

  if (!chatFromDb) {
    await bot.sendMessage(
      chat.id,
      'Сначала нужно выбрать игру. Для этого введите команду /start',
    );
    return;
  }

  const chatUsers: ChatUserDto[] = await chatUserService.findByParams({
    chatId: chatFromDb.id,
  });

  const [chatGame]: ChatGameDto[] = await chatGameService.findByParams({
    chatId: chatFromDb.id,
  });

  if (chatUsers.length === 0 || !chatGame) {
    await bot.sendMessage(
      chat.id,
      'Сначала нужно выбрать игру. Для этого введите команду /start',
    );
    return;
  }

  const game = await gameService.findById(chatGame.gameId);

  if (chatUsers.length < game.minPlayers) {
    await bot.sendMessage(chat.id, 'Недостаточно игроков :(');
    return;
  }

  for (let i = 0; i < chatUsers.length; i++) {
    const chatUser = chatUsers[i];

    const user = await userService.findById(chatUser.userId);

    try {
      const {link}: {link: string} = await authService.create({
        firstName: user.firstName,
        lastName: user.lastName,
        telegramId: user.telegramId,
        userName: user.userName,
      }) as {link: string};

      // @ts-ignore
      await bot.sendMessage(user.telegramId, link);
    } catch(e) {
      console.log('e', e.response.data)
    }
  }

  await Promise.all([
    chatUserService.deleteList(chatUsers.map((chatUser) => chatUser!.id)),
    chatGameService.delete(chatGame.id)
  ]);
};
