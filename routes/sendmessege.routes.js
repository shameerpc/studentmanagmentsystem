const express = require("express");
const axios = require("axios");
const router = express.Router();

// Endpoint to send messages to a Slack channel
router.post("/send-message", async (req, res) => {
  try {
    const { message, channel } = req.body;

    // Replace with your incoming webhook URL
    const webhookUrl = "https://hooks.slack.com/services/xxxxxxxxx";

    // Set the message payload
    const payload = {
      channel,
      text: message,
    };

    // Send the message using Axios
    const response = await axios.post(webhookUrl, payload);

    res.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error(error);

    res.json({
      success: false,
      message: "Failed to send message!",
    });
  }
});

module.exports = router;
