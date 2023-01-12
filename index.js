const TelegramBot = require("node-telegram-bot-api");
// import dotenv from "dotenv";
const dotenv = require("dotenv");

dotenv.config();

const token = process.env.API_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
    bot.sendMessage(msg.chat.id, msg.text);
});
