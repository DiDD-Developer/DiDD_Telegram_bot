const TelegramApi = require('node-telegram-bot-api');
const token = '7477116673:AAHyJQh94KEzWnaRGmWfJWXExASD5x5jf-s';
const bot = new TelegramApi(token, { polling: true });

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Начальное приветствие!' },
        { command: '/info', description: 'Что умеет бот' },
    ]);

    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;

        // Обработка команды /start
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/11.webp');
            return await bot.sendMessage(chatId, `Приветствую тебя, ${msg.from.first_name} ${msg.from.last_name}! DiDD_bot готов к работе!`);
        }

        // Обработка команды /info
        if (text === '/info') {
            return await bot.sendMessage(chatId, `На данном этапе я пока что умею только отправлять текстовые сообщения, но мой функционал постепенно увеличивается!`);
        }

        // Обработка нераспознанной команды
        return await bot.sendMessage(chatId, `Неопознанная команда! Выберите одну из списка!`);
    });
};

start();
