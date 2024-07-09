const fs = require('fs');
const path = require('path');
const openai = require('openai');
require('dotenv').config();

async function transcribeAudio(filename, res) {
    console.log("req.file------", filename.file);
    const audioFile = filename.file;
    console.log("req.audioFile.path------", audioFile.path);

    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error("API key is missing. Please check your .env file.");
        }

        // Initialize the OpenAI client with the given API key.
        console.log("Using OpenAI API Key:", apiKey);
        const openAiClient = new openai.OpenAI({ apiKey });

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
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    transcribeAudio,
};
