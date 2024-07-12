const fs = require('fs');
const path = require('path');
const OpenAI = require("openai");
const geminiController = require('../controllers/geminiController');
const env = require('dotenv').config();
const openAIKEY = require('../config/const')

async function transcribeAudio(filename, res) {
    const audioFile = filename.file;
    // console.log("req.audioFile.path------", audioFile.path);
    // console.log("openAIKEY", openAIKEY);

    try {
        const openai = new OpenAI({
            apiKey: openAIKEY.openAIKEY
        })
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(audioFile.path),
            model: "whisper-1"
        })
        console.log("transcription", transcription);
        const body = {
            body: {
                prompt: transcription.text
            }
        }
        let sttData = await geminiController.geminiController(req = body, res);
        console.log("sttData", sttData);
        return transcription;
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    transcribeAudio,
};
