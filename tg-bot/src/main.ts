require('module-alias/register');

import {TelegramBot} from './services/telegram-bot';
import {useCommands, useConfig} from './global';

useConfig();

const main = async () => {
    const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

    await bot.setCommands([
        {command: '/start', description: 'Начать играть'},
        {command: '/add_player', description: 'Добавить игрока'},
        {command: '/reset', description: 'Сбросить игру'},
        {command: '/auth', description: 'Авторизоваться'},
    ]);

    useCommands(bot);

    console.log('Bot started');
};

main();
