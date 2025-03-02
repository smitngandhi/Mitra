import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputMessage, setInputMessage] = useState('');

  // Sample messages using "ai" for bot-like messages
  const messages = [
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
  ];

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

  // Chat categories in the sidebar
  const chatCategories = ['Mental Peace', 'Stress Relief', 'Medicinal Guidance'];

  // Handle sending messages
  const handleSendMessage = (e) => {
    e.preventDefault();
    // Add logic here if you want to append a new user message to the list
    setInputMessage('');
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
          <img
            src="/images/freepeek.jpeg"
            alt="Chat"
            className="chat-image"
          />
        </div>

        <div className="mood-slider-container">
          <div className="mood-line"></div>
          <div className="mood-circle" id="moodCircle"></div>
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
        <div className="chat-box">
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
        <div className="chat-input">
          <input
            type="text"
            placeholder="Ask me anything ..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button className="send-btn">
            <img src="/images/send.svg" alt="Arrow" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
