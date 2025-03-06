import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function HappinessMeter({ value, onChange }) {
  const radius = 80;      // Radius for the arc
  const centerX = 150;    // Horizontal center of the SVG
  const centerY = 100;    // Vertical center (adjusted for height)
  // Map value (0..1) to an angle in radians:
  // value = 0 => angle = π (left end); value = 1 => angle = 0 (right end)
  const angle = (1 - value) * Math.PI;
  // Calculate knob position on the arc
  const knobX = centerX + radius * Math.cos(angle);
  const knobY = centerY - radius * Math.sin(angle);

  // Determine label text based on value
  let label = 'Okay';
  if (value < 0.33) label = 'Bad';
  else if (value > 0.66) label = 'Good';

  const [dragging, setDragging] = useState(false);

  // Handle dragging: update value based on mouse position relative to center
  const handleMouseMove = (e) => {
    if (!dragging) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    // Calculate mouse position within SVG
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x - centerX;
    const dy = centerY - y; // invert y axis so upward is positive
    let theta = Math.atan2(dy, dx);
    // Clamp theta to [0, π] (only allow movement along the semicircle)
    if (theta < 0) theta = 0;
    if (theta > Math.PI) theta = Math.PI;
    // Convert theta to value: value = 1 - (theta / π)
    const newValue = 1 - theta / Math.PI;
    onChange(newValue);
  };

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className="happiness-meter-container">
      <svg
        width="300"
        height="160"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <defs>
          <linearGradient id="happinessGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4D4F" />
            <stop offset="50%" stopColor="#FFC107" />
            <stop offset="100%" stopColor="#2ECC71" />
          </linearGradient>
        </defs>
        {/* Broad semicircular arc with rounded endpoints */}
        <path
          d="M 70 100 A 80 80 0 0 1 230 100"
          stroke="url(#happinessGrad)"
          strokeWidth="20"
          strokeLinecap="round"
          fill="none"
        />
        {/* Draggable knob */}
        <circle
          cx={knobX}
          cy={knobY}
          r="12"
          fill="#fff"
          stroke="#2ECC71"
          strokeWidth="3"
          onMouseDown={handleMouseDown}
          style={{ cursor: 'pointer' }}
        />
        {/* "Happiness Meter" text at top-center */}
        <text
          x="150"
          y="85"
          textAnchor="middle"
          fill="#fff"
          fontSize="15"
          fontWeight="bold"
        >
          Happiness Meter
        </text>
        {/* White label box inside the arc */}
        <rect x="120" y="95" width="60" height="28" rx="6" ry="6" fill="#fff" />
        <text
          x="150"
          y="115"
          textAnchor="middle"
          fill={label === 'Bad' ? '#FF4D4F' : label === 'Good' ? '#2ECC71' : '#FFC107'}
          fontSize="14"
          fontWeight="bold"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}

function App() {
  // Happiness meter state (0 to 1)
  const [happiness, setHappiness] = useState(0.5);

  // Sidebar navigation items
  const navItems = [
    { icon: '/images/chat.svg', label: 'MINDchat', active: true },
    { icon: '/images/personheart.svg', label: 'HealthCare', active: false },
    { icon: '/images/person.svg', label: 'Welfare Test', active: false },
    { icon: '/images/person.svg', label: 'Profile', active: false },
    { icon: '/images/house.svg', label: 'Health Reports', active: false },
    { icon: '/images/house.svg', label: 'Home', active: false },
    { icon: '/images/arrow.svg', label: 'Logout', active: false },
  ];

  // Chat categories to appear below Logout
  const chatCategories = ['Mental Peace', 'Stress Relief', 'Medicinal Guidance'];

  // Chat state
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  // Send a message and simulate a dummy AI response
  const handleSend = () => {
    if (!userInput.trim()) return;
    setMessages([...messages, { role: 'user', text: userInput.trim() }]);
    setUserInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: 'Hello, I am AI just like ChatGPT' },
      ]);
    }, 1000);
  };

  // Auto-scroll to bottom when messages update
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="container">
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <h2 className="Mitra">MITRA</h2>
        <nav>
          <ul>
            {navItems.map((item, idx) => (
              <li key={idx} className={item.active ? 'active' : ''}>
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

        {/* Chat Categories Section */}
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
        </div>

        {/* Sidebar Bottom: Happiness Meter above user profile */}
        <div className="sidebar-bottom">
          <HappinessMeter value={happiness} onChange={setHappiness} />
          <div className="user-profile">
            <img src="/images/User.png" alt="User" className="profile-photo" />
            <div className="user-info">
              <p className="user-name">Rahul Shah</p>
              <p className="user-email">rahul@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT CONTAINER */}
      <section className="right-container">
        <header>
          <h2 className="Mindchat">MINDchat</h2>
        </header>

        {!hasMessages ? (
          // HERO CONTAINER (no messages yet)
          <div className="hero-container">
            <img
              src="/images/freepeek.jpeg"
              alt="Mitra AI Bot"
              className="center-image"
            />
            <h1 className="hero-title">
              I’m Mitra, your AI Mental Health Companion
            </h1>
            <p className="hero-subtitle">
              I’m here to support your emotional health in any way I can!
            </p>
            <div className="ask-input-container">
              <input
                type="text"
                placeholder="Ask me anything ..."
                className="ask-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="send-arrow" onClick={handleSend}>
                <img src="/images/arrow1.svg" alt="Send" />
              </div>
            </div>
            <div className="suggestions-row">
              <button className="suggestion-btn">Having relationship problems</button>
              <button className="suggestion-btn">My toxic life</button>
              <button className="suggestion-btn">I am anxious today</button>
              <button className="suggestion-btn">I am bored</button>
            </div>
          </div>
        ) : (
          // CHAT CONTAINER (when messages exist)
          <div className="chat-container">
            <div className="messages-container">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message-bubble ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-container">
              <input
                type="text"
                placeholder="Ask me anything ..."
                className="ask-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="send-arrow" onClick={handleSend}>
                <img src="/images/arrow1.svg" alt="Send" />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
