import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    username: 'johndoe123',
    email: 'example@gmail.com',
    password: '********'
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration submitted with:', formData);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        
        {/* LEFT SECTION: A single large illustration */}
        <div className="left-section">
          <img 
            src="/images/Illustration.jpeg" 
            alt="Registration Illustration" 
            className="left-illustration" 
          />
        </div>
        
        {/* RIGHT SECTION: The registration form */}
        <div className="right-section">
          <div className="header">
            <h1>Welcome to</h1>
            <h1 className="design-school">Design School</h1>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-container">
                <span className="input-icon">👤</span>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-container">
                <span className="input-icon">👤</span>
                <input 
                  type="text" 
                  id="username" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <span className="input-icon">📧</span>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <span className="input-icon">🔑</span>
                <input 
                  type={passwordVisible ? "text" : "password"} 
                  id="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  👁️
                </button>
              </div>
            </div>
            
            <button type="submit" className="register-button">Register</button>
            
            <div className="divider">
              <span className="line"></span>
              <span className="or">OR</span>
              <span className="line"></span>
            </div>
            
            <button type="button" className="google-button">
              <img src="/images/google.svg" alt="Google" className="google-icon" />
              Register with Google
            </button>
            
            <div className="login-prompt">
              Already have an account? <a href="#login" className="login-link">Log in</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
