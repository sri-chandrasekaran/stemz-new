import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Collect visible text snippets from the current page to use as "pageQuestions"
  const collectPageTexts = () => {
    try {
      const selectors = [
        'p','li','label',
        'h1','h2','h3','h4',
        '.question','.question-text','.prompt','.worksheet','.quiz','.item'
      ];
      const nodes = Array.from(document.querySelectorAll(selectors.join(',')));
      const texts = nodes
        .map(n => (n.innerText || n.textContent || '').replace(/\s+/g, ' ').trim())
        .filter(t => t.length > 10); // ignore very short noise

      // dedupe while preserving order
      const seen = new Set();
      const deduped = [];
      for (const t of texts) {
        if (!seen.has(t)) {
          seen.add(t);
          deduped.push(t);
        }
      }

      const MAX_ITEMS = 30;
      const MAX_CHARS = 1000;
      return deduped.slice(0, MAX_ITEMS).map(t => (t.length > MAX_CHARS ? t.slice(0, MAX_CHARS) : t));
    } catch (err) {
      console.error('collectPageTexts error:', err);
      return [];
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "Hello! I'm your learning assistant. How can I help you today?",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found in localStorage');
        setIsLoading(false);
        return;
      }

      // collect page texts (limited / truncated)
      const pageQuestions = collectPageTexts();

      // debug: inspect what will be sent
      console.debug('Chatbot sending payload', { message: inputMessage, pageQuestionsCount: pageQuestions.length });

      // safe Authorization header (avoid "Bearer Bearer ...")
      const authHeader = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

    const response = await fetch('http://localhost:5001/api/chatbot/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify({
          message: inputMessage,
          pageQuestions,
        }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => null);
        console.error('Chatbot API error', response.status, text);
        throw new Error(text || `HTTP ${response.status}`);
      }

      const data = await response.json().catch((err) => {
        console.error('Failed to parse JSON from chatbot response', err);
        return null;
      });

      console.log('Response from server:', data);

      // prefer fields the backend may return; include `answer` first
      const botText = (data && (data.answer || data.reply || data.message || data.error)) || "I'm sorry, I couldn't process your request right now.";
      const botMessage = {
        id: Date.now() + 1,
        text: botText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: error.message || "I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-popup">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h3>AI Tutor</h3>
          <button className="chatbot-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                {message.text}
              </div>
              <div className="message-timestamp">
                {message.timestamp}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message bot">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chatbot-input">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about the courses..."
            disabled={isLoading}
          />
          <button 
            onClick={sendMessage} 
            disabled={isLoading || !inputMessage.trim()}
            className="send-btn"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;