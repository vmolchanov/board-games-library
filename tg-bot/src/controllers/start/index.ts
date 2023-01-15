import type {ITelegramBot} from '@services/telegram-bot/telegram-bot.d';
import {controller} from './start';

export const startController = (bot: ITelegramBot) => controller.bind(null, bot);
