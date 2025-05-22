 /*  
 * this code was created with assistance from chatgpt  
 * feature logic developed by kyuurzy
 */
 
const os = require("os");
const { formatSize } = require("../utils/fungsion");
const { performance } = require("perf_hooks");

const totalMem = os.totalmem();
const freeMem = os.freemem();
const usedMem = totalMem - freeMem;
const formattedUsedMem = formatSize(usedMem);
const formattedTotalMem = formatSize(totalMem);

function formatRuntime(ms) {
    let seconds = Math.floor(ms / 1000) % 60;
    let minutes = Math.floor(ms / (1000 * 60)) % 60;
    let hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
    let days = Math.floor(ms / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

let botStartTime = performance.now();

module.exports = {
    command: ["menu"],
    run: async ({ client, message, reply }) => {
        let user = await client.getEntity(message.senderId);
        let username = user.username ? `@${user.username}` : "";
        let fullName = user.firstName + (user.lastName ? ` ${user.lastName}` : "");
        let mention = username || fullName;
        let userId = user.id;
        let runtime = formatRuntime(performance.now() - botStartTime);

        let caption = `Hi ${mention}, I am an automated system (Telegram bot) that can help you search and get information only through Telegram.

Information:
 ▢ username: ${mention}
 ▢ Runtime: ${runtime}
 ▢ ID Telegram: ${userId}

commands:
 ▢ play
 ▢ broadcast
`;

        await client.sendFile(message.chatId, {
            file: "https://files.catbox.moe/p6w4jz.jpg",
            caption: caption,
            replyTo: message.id,
        });
    },
};
