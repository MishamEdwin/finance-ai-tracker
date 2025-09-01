const express = require("express");

const Transaction = require("../models/Transaction");

const authMiddleware = require("../middleware/authMiddleware");



const router = express.Router();



// ✅ Create Transaction

router.post("/", authMiddleware, async (req, res) => {

  try {

    const { amount, category, type, description } = req.body;

    const transaction = new Transaction({

      userId: req.user.userId,

      amount,

      category,

      type,

      description,

    });

    await transaction.save();

    res.json(transaction);

  } catch (err) {

    res.status(500).json({ error: "Server error" });

  }

});



// ✅ Get All Transactions

router.get("/", authMiddleware, async (req, res) => {

  try {

    const transactions = await Transaction.find({ userId: req.user.userId }).sort({ date: -1 });

    res.json(transactions);

  } catch (err) {

    res.status(500).json({ error: "Server error" });

  }

});



// ✅ Update Transaction

router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const { id } = req.params;

    const { amount, category, type, description } = req.body;



    const transaction = await Transaction.findOneAndUpdate(

      { _id: id, userId: req.user.userId },

      { amount, category, type, description },

      { new: true }

    );



    if (!transaction) return res.status(404).json({ error: "Transaction not found" });



    res.json(transaction);

  } catch (err) {

    res.status(500).json({ error: "Server error" });

  }

});



// ✅ Delete Transaction

router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    const { id } = req.params;

    const transaction = await Transaction.findOneAndDelete({

      _id: id,

      userId: req.user.userId,

    });



    if (!transaction) return res.status(404).json({ error: "Transaction not found" });



    res.json({ message: "Transaction deleted successfully" });

  } catch (err) {

    res.status(500).json({ error: "Server error" });

  }

});



module.exports = router;