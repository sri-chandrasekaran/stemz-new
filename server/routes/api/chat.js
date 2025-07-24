const express = require("express");
const router = express.Router();
require('dotenv').config();

// @route POST api/chat
// @desc Send message to ChatGPT and get response
// @access Public
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Get API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error("OpenAI API key not found in environment variables");
      return res.status(500).json({ 
        error: "Chat service is not properly configured" 
      });
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI tutor for STEM education. Help students with questions about science, technology, engineering, and mathematics courses. Be encouraging and educational."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      return res.status(500).json({ 
        error: "Failed to get response from AI service" 
      });
    }

    const aiResponse = data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
    
    res.json({ response: aiResponse });
    
  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
});

module.exports = router; 