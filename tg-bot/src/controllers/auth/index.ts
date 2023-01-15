import type {ITelegramBot} from '@services/telegram-bot/telegram-bot.d';
import {controller} from './auth';

export const authController = (bot: ITelegramBot) => controller.bind(null, bot);
