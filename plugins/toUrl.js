const { inrl, sendUrl, tinyUrl, webSs, pdfGen, urlBufferToImgFile, AudioMetaData  } = require('../lib')
const Config = require('../config');
const fs = require('fs');
const { readFile, writeFile } = require('fs/promises')
inrl(
	{
		pattern: ['url'],
       desc: 'to convert image/sticker to url',
       sucReact: "⛰️",
       category: ["all"]
    },
	   async (message, client) => {
await sendUrl(message, client);
    }
);
 inrl({pattern: ['tinyurl'], desc: "to convert url as small", sucReact: "😛", category: ['all'],},   async (message, client) => {

           await tinyUrl(message, client);
});
inrl({ pattern: ['webss'], desc: "to get web screenshot",sucReact: "⚒️",  category: ["all"]}, async (message, client) => {

        await webSs(message, client);
});

inrl({ pattern: ['pdf'], desc: "to get web screenshot",sucReact: "⚒️",  category: ["all"],}, (async (message, client) => {
     await pdfGen(message, client);
}))

inrl({ pattern: ['copy'], desc: "to get web screenshot",sucReact: "⚒️",  category: ["all"]}, async (message, client) => {
let _message = message.quoted.audioMessage
let media = await client.downloadAndSaveMediaMessage(_message)
let text = message.client.text;
if(text.includes(' ')){ text = text.trim() }
let imagee = Config.AUDIO_DATA;
if(imagee.includes(' ')){ imagee = imagee.trim() }
if(text.includes(',') /*&& text.split(',')[2] !== undefined */){ let img = /*text.split(',')[2] } else { img = */imagee.split(',')[2] }
console.log("error="+img);
let imgForUdio = await urlBufferToImgFile(img,'./media/imagForAudio.jpg');
    await AudioMetaData(imgForUdio, media, message, client);
})
