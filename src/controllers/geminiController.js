const { geminiService } = require('../services/geminiService');

async function geminiController(req, res) {
    try {
        const prompt = req.body.prompt; // Get prompt from request body
        console.log("--prompt--:", prompt); // Debugging log
        const result = await geminiService(prompt); // Pass the prompt to the service
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    geminiController,
};
