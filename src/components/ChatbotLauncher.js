import React, { useState } from 'react';
import Chatbot from './Chatbot';
import './ChatbotLauncher.css';

const ChatbotLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="chatbot-float-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Tutor Chat"
      >
        💬
      </button>
      <Chatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatbotLauncher;