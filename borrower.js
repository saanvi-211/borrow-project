const express = require("express");
const router = express.Router();
const Borrower = require("../models/borrower");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const borrower = new Borrower(req.body);
    await borrower.save();
    res.status(201).json({ message: "Borrower created", borrower });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
