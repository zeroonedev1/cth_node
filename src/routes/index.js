const express = require('express');
const geminiController = require('../controllers/geminiController');

const router = express.Router();

// router.post('/gemini', geminiController);

router.post('/gemini', async (req, res) => {
  console.log("--res--", req.body)
  await geminiController.geminiController(req, res);
});

module.exports = router;
