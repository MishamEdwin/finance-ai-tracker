const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /auth/google
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    // Verify with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Create your own JWT
    const appToken = jwt.sign(
      { userId: payload.sub, email: payload.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      appToken,
      user: {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid Google token" });
  }
});

module.exports = router;
