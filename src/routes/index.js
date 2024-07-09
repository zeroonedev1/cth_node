const express = require('express');
const geminiController = require('../controllers/geminiController');
const { transcribeAudio } = require('../controllers/openaiSpeechToTextController');
// const transcribeAudio2 = require('../controllers/deepspeechController');
const upload = require('../config/multerConfig'); // Import multer configuration

const router = express.Router();

// router.post('/gemini', geminiController);
router.post('/gemini', async (req, res) => {
  await geminiController.geminiController(req, res);
});

router.post('/openai', upload.single('audio'), async (req, res) => {
  try {
    await transcribeAudio(req, res);
  } catch (error) {
    console.error('Error in route /openai:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
