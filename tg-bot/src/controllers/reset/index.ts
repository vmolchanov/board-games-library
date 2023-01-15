import type {ITelegramBot} from '@services/telegram-bot/telegram-bot.d';
import {controller} from './reset';

export const resetController = (bot: ITelegramBot) => controller.bind(null, bot);
