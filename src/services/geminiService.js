const { privateKey } = require('../config/const');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(privateKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

async function geminiService(prompt) {
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        return text;
    } catch (error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
}

module.exports = {
    geminiService,
};
