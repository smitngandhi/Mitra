import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted with:', { email, password, rememberMe });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* LEFT SECTION with a single illustration */}
        <div className="left-section">
          <img 
            src="/images/Illustration.jpeg" 
            alt="Login Illustration" 
            className="left-illustration" 
          />
        </div>
        
        {/* RIGHT SECTION with the form */}
        <div className="right-section">
          <div className="header">
            <h1>Welcome to</h1>
            <h1 className="design-school">Design School</h1>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <span className="input-icon">📧</span>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            
            <div className="remember-forgot">
              <div className="remember-me">
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#forgot" className="forgot-link">Forgot Password?</a>
            </div>
            
            <button type="submit" className="login-button">Login</button>
            
            <div className="divider">
              <span className="line"></span>
              <span className="or">OR</span>
              <span className="line"></span>
            </div>
            
            <button type="button" className="google-button">
              <img src="/images/google.svg" alt="Google" className="google-icon" />
              Login with Google
            </button>
            
            <div className="register-prompt">
              Don't have an account? <a href="#register" className="register-link">Register</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
