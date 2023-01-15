import {TelegramBot} from './services/telegram-bot';
import {startController} from '@controllers/start';
import {addPlayerController} from '@controllers/add-player';
import {resetController} from '@controllers/reset';
import {authController} from '@controllers/auth';

const useCommands = (bot: TelegramBot) => {
    bot.subscribe('start', startController(bot));
    bot.subscribe('add_player', addPlayerController(bot));
    bot.subscribe('reset', resetController(bot));
    bot.subscribe('auth', authController(bot));
};

export {useCommands};
