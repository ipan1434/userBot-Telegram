 /*  
 * this code was created with assistance from chatgpt  
 * feature logic developed by kyuurzy
 */
 
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

module.exports = {
    command: ["play"],
    run: async ({ client, text, reply, message }) => {
        if (!text) return reply("example: play impossible");
        reply("🔍 Mencari lagu...");
        let response = await fetch(`https://www.laurine.site/api/downloader/ytdl?query=${encodeURIComponent(text)}`);
        let data = await response.json();
        let audioUrl = data.data;

        const audioPath = "./temp_audio.mp3";
        const responseAudio = await fetch(audioUrl);
        const audioBuffer = await responseAudio.buffer();

        fs.writeFileSync(audioPath, audioBuffer);

        await client.sendMessage(message.peerId, {
            message: `🎶 Memutar: *${text}*`,
            file: audioPath,
            caption: `Lagu: *${text}* 🎵`,
            replyTo: message.id
        });

        fs.unlinkSync(audioPath);
    },
};