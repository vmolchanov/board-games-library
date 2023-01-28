import type {ITelegramBot, TChat, TUser} from '@services/telegram-bot';
import type {ICodenamesPlayer, ICodenamesSession} from '../../types/codenames';
import {HttpService} from '@services/http-service/http-service';
import {EHttpServiceEndpoint} from '@services/http-service/http-service.constant';
import {ChatDto, ChatGameDto, ChatUserDto} from '@models';

export const controller = async (bot: ITelegramBot, user: TUser, chat: TChat, date: Date) => {
  const sessionService = new HttpService<ICodenamesSession>(EHttpServiceEndpoint.CODENAMES_SESSION);
  const playerService = new HttpService<ICodenamesPlayer>(EHttpServiceEndpoint.CODENAMES_PLAYER);
  const chatService = new HttpService<ChatDto>(EHttpServiceEndpoint.CHAT);
  const chatGameService = new HttpService<ChatGameDto>(EHttpServiceEndpoint.CHAT_GAME);
  const chatUserService = new HttpService<ChatUserDto>(EHttpServiceEndpoint.CHAT_USER);

  const [chatFromDb]: ChatDto[] = await chatService.findByParams({chatId: chat.id});
  if (chatFromDb === undefined) {
    await bot.sendMessage(
      chat.id,
      'Все игровые сессии сброшены. Ддя начала игры введите команду /start',
    );
    return;
  }

  const [chatGame]: ChatGameDto[] = await chatGameService.findByParams({chatId: chatFromDb.id});
  const chatUsers: ChatUserDto[] = await chatUserService.findByParams({chatId: chatFromDb.id});
  const [session]: ICodenamesSession[] = await sessionService.findByParams({chatId: chatFromDb.id});

  if (chatGame !== undefined) {
    await chatGameService.delete(chatGame.id);
  }

  if (chatUsers.length !== 0) {
    await chatUserService.deleteList(chatUsers.map(chatUser => chatUser.id));
  }

  if (session !== undefined) {
    const players: ICodenamesPlayer[] = await playerService.findByParams({sessionId: session.id});

    if (players.length !== 0) {
      await playerService.deleteList(players.map(player => player.id));
    }

    await sessionService.delete(session.id);
  }
};
