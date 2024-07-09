// const fs = require('fs');
// const path = require('path');
// const dotenv = require('dotenv').config();
// const OpenAI = require('openai');

// Import the required modules.
const openai = require('openai');
const fs = require('fs');
// Load environment variables from a .env file.
const dotenv = require('dotenv').config();
// const { openAIKEY } = require('../config/const');

async function transcribeAudio(filename, res) {
    console.log("req.file------", filename.file);
    const audioFile = filename.file;
    console.log("req.audioFile.path------", audioFile.path);

    try {
        const apiKey = dotenv.OpenAI;
        // Initialize the OpenAI client with the given API key.b
        console.log("openAIKEY------", apiKey);
        const openAiClient = new openai.OpenAI({ apiKey: apiKey });

        // Send the audio file for transcription using the specified model.
        const transcription = await openAiClient.audio.transcriptions.create({
            file: fs.createReadStream(audioFile.path),
            model: 'whisper-1'
        });

        // Return the transcription result.
        return transcription;
    } catch (error) {
        // Log any errors that occur during transcription.
        console.error('Error', error);
    }
}

module.exports = {
    transcribeAudio,
};