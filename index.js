const TelegramApi = require('node-telegram-bot-api');
const token = '7477116673:AAHyJQh94KEzWnaRGmWfJWXExASD5x5jf-s';
const bot = new TelegramApi(token, { polling: true });
const chats = {};

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                { text: '1', callback_data: '1' },
                { text: '2', callback_data: '2' },
                { text: '3', callback_data: '3' },
            ],
            [
                { text: '4', callback_data: '4' },
                { text: '5', callback_data: '5' },
                { text: '6', callback_data: '6' },
            ],
            [
                { text: '7', callback_data: '7' },
                { text: '8', callback_data: '8' },
                { text: '9', callback_data: '9' },
            ],
            [
                { text: '0', callback_data: '0' }
            ]
        ]
    })
};

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Начальное приветствие!' },
        { command: '/info', description: 'Что умеет бот' },
        { command: '/game', description: 'Сыграй в игру "Угадай число!"' },
    ]);

    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/11.webp');
            return await bot.sendMessage(chatId, `Приветствую тебя, ${msg.from.first_name} ${msg.from.last_name}! DiDD_bot готов к работе!`);
        }

        if (text === '/info') {
            return await bot.sendMessage(chatId, `На данном этапе я пока что умею только отправлять текстовые сообщения, но мой функционал постепенно увеличивается!`);
        }

        if (text === '/game') {
            await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен её угадать!`);
            const randomNumber = Math.floor(Math.random() * 10);
            chats[chatId] = randomNumber;
            return bot.sendMessage(chatId, `Отгадывай!`, gameOptions);
        }

        return await bot.sendMessage(chatId, `Неопознанная команда! Выберите одну из списка!`);
    });

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        // Проверяем угадал ли пользователь число
        if (data == chats[chatId]) {
            bot.sendMessage(chatId, `Поздравляю, ты угадал цифру ${data}! 🎉`);
        } else {
            bot.sendMessage(chatId, `Упс, ты выбрал цифру ${data}. Попробуй еще раз! 😅`);
        }
    });
};

start();
