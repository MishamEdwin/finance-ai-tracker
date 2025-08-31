const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/parse-transaction", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text input is required" });
    }

    const prompt = `
    Extract transaction details from this text: "${text}".
    Return ONLY a valid JSON object with fields:
    amount (number), category (string), type ("income" or "expense"), description (string).
    No explanations, no markdown, just raw JSON.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    let output = result.response.text().trim();

    // Remove markdown formatting if present (```json ... ```)
    output = output.replace(/```json/g, "").replace(/```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(output);
    } catch (err) {
      console.error("Raw AI output:", output);
      return res.status(500).json({ error: "Failed to parse AI response" });
    }

    res.json(parsed);
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
