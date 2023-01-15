import Chat from './chat';
import User from './user';
import Game from './game';
import ChatUser from './chat-user';
import ChatGame from './chat-game';

export const syncModels = async () => {
  await Chat.sync();
  await User.sync();
  await Game.sync();
  await ChatUser.sync();
  await ChatGame.sync();
};
