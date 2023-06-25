const TelegramBot = require("node-telegram-bot-api");
// import dotenv from "dotenv";
const dotenv = require("dotenv");
const { exec } = require("child_process");

dotenv.config();

const token = process.env.API_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
    // console.log(msg);
    if (msg.from.username === "axshaykp") {
        bot.onText(/\/start/, (msg) => {
            const chatId = msg.chat.id;
            const message = `Welcome ${msg.from.first_name} \n 
            /start => To Start \n 
            /e $command => To execute $command \n
            /sendPhoto => To send a photo \n
            /publicIp => To get public IP \n
            /ytAudio => download youtube audio as mp3`;

            bot.sendMessage(chatId, message);
        });
        bot.onText(/\/sendPhoto/, (msg) => {
            const chatId = msg.chat.id;
            const imagePathCommand = "ls ~/Downloads/walls/wallhaven-6dqemx.jpg";

            exec(imagePathCommand, (error, stdout, stderr) => {
                if (error) {
                    bot.sendMessage(chatId, `Error executing command: ${error}`);
                    return;
                }

                const photoPath = stdout.trim();

                // Send the photo as a reply
                bot.sendPhoto(chatId, photoPath).catch((error) => {
                    console.error(`Error sending photo: ${error}`);
                });
            });
        });
        bot.onText(/\/e/, (msg) => {
            const chatId = msg.chat.id;
            console.log(msg.text.substring(3));
            command = msg.text.substring(3);
            bot.sendMessage(chatId, "executing");
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    bot.sendMessage(chatId, `Error executing command: ${error}`);
                    return;
                }

                // Command output
                bot.sendMessage(chatId, `Command output:\n${stdout}`);

                // Error messages, if any
                if (stderr) {
                    bot.sendMessage(chatId, `Command errors:\n${stderr}`);
                }
            });
        });
        bot.onText(/\/publicIp/, (msg) => {
            const chatId = msg.chat.id;
            command = `curl -s https://icanhazip.com`;
            bot.sendMessage(chatId, "executing");
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    bot.sendMessage(chatId, `Error executing command: ${error}`);
                    return;
                }

                // Command output
                bot.sendMessage(chatId, `Command output:\n${stdout}`);

                // Error messages, if any
                if (stderr) {
                    bot.sendMessage(chatId, `Command errors:\n${stderr}`);
                }
            });
        });
        bot.onText(/\/ytAudio/, (msg) => {
            const chatId = msg.chat.id;
            console.log(msg.text.substring(8));
            command = `yt-dlp --extract-audio --audio-format mp3 --output "yt.mp3" "${msg.text.substring(8)}"`;
            bot.sendMessage(chatId, "executing");
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    bot.sendMessage(chatId, `Error executing command: ${error}`);
                    return;
                }

                // Command output
                bot.sendAudio(chatId, `./yt.mp3`);

                // Error messages, if any
                if (stderr) {
                    bot.sendMessage(chatId, `Command errors:\n${stderr}`);
                }
            });
        });
    } else {
        bot.sendMessage(msg.chat.id, "Unauthorized");
    }
});
