import type {ITelegramBot} from '@services/telegram-bot/telegram-bot.d';
import {controller} from './add-player';

export const addPlayerController = (bot: ITelegramBot) => controller.bind(null, bot);
