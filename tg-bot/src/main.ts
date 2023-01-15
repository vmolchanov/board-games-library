import {syncModels} from './models/sync';

require('module-alias/register');

const TOKEN = '5608198763:AAFm7__VvQ5bALphyPN3PL4rPHCtLUmd8zc';

import {TelegramBot} from './services/telegram-bot';
import {useCommands} from './commands';
import db from './db';

const main = async () => {
    const bot = new TelegramBot(TOKEN, {polling: true});
    try {
        await db.authenticate();
        await db.sync();
        console.log('db connected')
        await syncModels();
    } catch {
        console.log('db connection error')
    }

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
