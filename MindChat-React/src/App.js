import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [inputMessage, setInputMessage] = useState('');

  // Keep messages in state so we can update them dynamically
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      message:
        'Heyy !!! What can I help you with? Consider me as your मित्र and just tell me about your ongoing life.',
      isFavorite: false,
    },
    {
      id: 2,
      sender: 'user',
      message:
        'Heyy !!! Rahul here! I’ve been feeling really overwhelmed lately. I don’t know how to handle everything.',
    },
    {
      id: 3,
      sender: 'ai',
      message:
        'I hear you. Managing stress can be tough. Would you like to talk about what’s been overwhelming you?',
      isFavorite: false,
    },
    {
      id: 4,
      sender: 'user',
      message:
        'That sounds like a lot. When everything feels too much, taking a step back can help. Have you tried breaking tasks into smaller steps or setting realistic goals?',
    },
  ]);

  // Reference to scrollable chat box
  const chatBoxRef = useRef(null);

  // Auto-scroll to bottom whenever messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // State for stress score (range: 0 to 1) coming from your backend
  const [stressScore, setStressScore] = useState(0);

  // Fetch stress score from backend on component mount
  useEffect(() => {
    // Replace the URL with your actual backend endpoint
    fetch('https://your-backend.com/api/stressscore')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the backend returns a JSON object with a "score" property
        setStressScore(data.score);
      })
      .catch((error) => {
        console.error('Error fetching stress score:', error);
      });
  }, []);
  
  // Nav items and chat categories (unchanged)
  const navItems = [
    { icon: '/images/chat.svg', label: 'MINDchat', active: true },
    { icon: '/images/personheart.svg', label: 'HealthCare', active: false },
    { icon: '/images/person.svg', label: 'Welfare Test', active: false },
    { icon: '/images/person.svg', label: 'Profile', active: false },
    { icon: '/images/house.svg', label: 'Health Reports', active: false },
    { icon: '/images/house.svg', label: 'Home', active: false },
    { icon: '/images/arrow.svg', label: 'Logout', active: false },
  ];
  const chatCategories = ['Mental Peace', 'Stress Relief', 'Medicinal Guidance'];

  // Send message -> user message + delayed AI response
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // 1) Append user’s message
    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      message: inputMessage,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage('');

    // 2) Simulate AI response after a short delay
    setTimeout(() => {
      setMessages((prev) => {
        const aiId = prev.length + 1; // Use prev.length to avoid stale closure
        return [
          ...prev,
          {
            id: aiId,
            sender: 'ai',
            message: 'This is an AI response. How can I help further?',
          },
        ];
      });
    }, 1000);
  };

  return (
    <div className="container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <h2 className="Mitra">MITRA</h2>
        <nav>
          <ul>
            {navItems.map((item, index) => (
              <li key={index} className={item.active ? 'active' : ''}>
                <img
                  src={item.icon}
                  alt={`${item.label} Logo`}
                  className="menu-logo"
                />
                {item.label}
              </li>
            ))}
          </ul>
        </nav>

        <div className="chat-section">
          <h3 className="chats">
            Chats <span className="add-chat">+</span>
          </h3>
          <ul>
            {chatCategories.map((cat, index) => (
              <li key={index} className="chat-help">
                {cat}
              </li>
            ))}
          </ul>
          <img src="/images/freepeek.jpeg" alt="Chat" className="chat-image" />
        </div>

        {/* Mood Slider Container */}
        <div className="mood-slider-container">
          <div className="mood-line"></div>
          {/* The mood-circle's left position is set based on the stressScore */}
          <div
            className="mood-circle"
            id="moodCircle"
            style={{ left: `${stressScore * 100}%` }}
          ></div>
        </div>

        <div className="user-profile">
          <img src="/images/User.png" alt="User Photo" className="profile-photo" />
          <div className="user-info">
            <p className="user-name">Rahul Shah</p>
            <p className="user-email">rahul@gmail.com</p>
          </div>
        </div>
      </aside>

      {/* Chat Section */}
      <section className="chat-container">
        <header>
          <i className="fas fa-comments"></i>
          <h2 className="Mindchat">MINDchat</h2>
        </header>
        {/* Scrollable chat box */}
        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((msg) =>
            msg.sender === 'ai' ? (
              <div key={msg.id} className="chat ai">
                <p className="text">{msg.message}</p>
                <span className="heart">
                  <i className="far fa-heart"></i>
                </span>
                <button className="regenerate-btn">Regenerate</button>
              </div>
            ) : (
              <div key={msg.id} className="chat user">
                <img src="/images/User.png" alt="User" />
                <p className="text">{msg.message}</p>
              </div>
            )
          )}
        </div>
        {/* Input area (remains fixed below) */}
        <form className="chat-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Ask me anything ..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button type="submit" className="send-btn">
            <img src="/images/send.svg" alt="Arrow" />
          </button>
        </form>
      </section>
    </div>
  );
}

export default App;
