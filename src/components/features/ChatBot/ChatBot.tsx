import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';
import './ChatBot.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your Netflix assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    'How do I search for movies?',
    'What is My List?',
    'How to add movies to My List?',
    'Help with account',
  ];

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Search related
    if (lowerMessage.includes('search') || lowerMessage.includes('find')) {
      return "To search for movies or TV shows, click on the 'Search' link in the navigation bar at the top, or click the search icon. You can search by title, genre, or keywords!";
    }

    // My List related
    if (lowerMessage.includes('my list') || lowerMessage.includes('wishlist')) {
      return "My List is your personal collection! Click the '+' button on any movie or TV show card to add it to your list. You can view all your saved content by clicking 'My List' in the navigation bar.";
    }

    // Add to list
    if (lowerMessage.includes('add') || lowerMessage.includes('save')) {
      return "To add content to My List, simply hover over any movie or TV show card and click the '+' button in the top-right corner. Click again (checkmark) to remove it from your list!";
    }

    // Account related
    if (lowerMessage.includes('account') || lowerMessage.includes('profile')) {
      return "For account settings, check the footer at the bottom of the page under 'Account Centre'. You'll find options for Account Settings, Manage Profiles, Subscription, and Billing Details.";
    }

    // Trailer related
    if (lowerMessage.includes('trailer') || lowerMessage.includes('video') || lowerMessage.includes('play')) {
      return "Click on any movie card to open a detailed modal with an auto-playing trailer, cast information, genres, and more! You can also click the 'Play' button for quick access.";
    }

    // TV Shows
    if (lowerMessage.includes('tv show') || lowerMessage.includes('series')) {
      return "Browse TV shows by clicking 'TV Shows' in the navigation bar. You'll find Trending shows, Popular series, Top Rated, and shows Airing Today!";
    }

    // Movies
    if (lowerMessage.includes('movie')) {
      return "Browse movies by clicking 'Movies' in the navigation bar. You'll discover Now Playing, Popular, Top Rated, and Coming Soon sections!";
    }

    // Help
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return "I can help you with: searching for content, managing your list, understanding features, account settings, and navigation. What would you like to know more about?";
    }

    // Greeting
    if (
      lowerMessage.includes('hello') ||
      lowerMessage.includes('hi') ||
      lowerMessage.includes('hey')
    ) {
      return "Hello! Welcome to Netflix Clone! I'm here to help you navigate and enjoy our platform. What can I assist you with today?";
    }

    // Thanks
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! Happy streaming! Feel free to ask if you need anything else.";
    }

    // Default response
    return "I'm not sure about that, but I can help you with searching for content, managing your My List, playing trailers, and navigating the app. What would you like to know?";
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle Chat"
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <FaRobot className="chatbot-icon" />
                <div>
                  <h3>Netflix Assistant</h3>
                  <p>Online · Always here to help</p>
                </div>
              </div>
              <button
                className="chatbot-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close Chat"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`chatbot-message ${message.sender}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.sender === 'bot' && (
                    <div className="message-avatar">
                      <FaRobot />
                    </div>
                  )}
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="chatbot-message bot typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="message-avatar">
                    <FaRobot />
                  </div>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 3 && (
              <div className="chatbot-quick-replies">
                <p className="quick-replies-label">Quick questions:</p>
                <div className="quick-replies-buttons">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      className="quick-reply-btn"
                      onClick={() => handleQuickReply(reply)}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="chatbot-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="send-button"
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ''}
                aria-label="Send Message"
              >
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
