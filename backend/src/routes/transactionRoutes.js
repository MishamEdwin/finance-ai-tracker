const express = require("express");
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Create Transaction
router.post("/", authMiddleware, async (req, res) => {
  try {
    // ADD THIS LOG STATEMENT
    console.log("Incoming request body:", req.body);

    const { amount, category, type, description } = req.body;
    
    // Optional: Add a check to see if key fields are missing
    if (!amount || !category || !type || !description) {
      console.error("Validation failed: A required field is missing or falsy.");
      return res.status(400).json({ error: "Missing required transaction data." });
    }

    const transaction = new Transaction({
      userId: req.user.userId,
      amount,
      category,
      type,
      description,
    });
    
    await transaction.save();
    console.log("Transaction saved successfully!");
    res.json(transaction);
  } catch (err) {
    // CHANGE THIS LOG STATEMENT
    console.error("Error creating transaction:", err.message);
    // You can also log the entire error object for more detail
    // console.error("Full error object:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ... rest of your routes ...