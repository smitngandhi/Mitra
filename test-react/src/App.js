import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">MITRA</div>
        <nav className="nav-menu">
          <div className="nav-item">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <span>MINDchat</span>
          </div>
          <div className="nav-item">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <span>HealthCare</span>
          </div>
          <div className="nav-item">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <span>Welfare Test</span>
          </div>
          <div className="nav-item active">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span>Profile</span>
          </div>
          <div className="nav-item">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <span>Health Reports</span>
          </div>
          <div className="nav-item">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <span>Home</span>
          </div>
          <div className="nav-item">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </div>
            <span>Logout</span>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="header">
          <h1>Welcome, Rahul</h1>
          <p className="date">Tue, 07 June 2022</p>
        </div>

        <div className="profile-banner">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
                <img src="https://i.pravatar.cc/150?img=8" alt="Profile" />
            </div>
          </div>
          <div className="profile-details">
            <h2 className="user-name">Rahul Shah</h2>
            <p className="date">Tue, 07 June 2022</p>
            <button className="edit-btn">Edit</button>
          </div>
        </div>

        <div className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label class="Text">Full Name</label>
              <input type="text" value="Rahul Shah" disabled className="form-control" />
            </div>
            <div className="form-group">
              <div className="label-with-tag">
                <label class="Text">Phone Number</label>
                <span className="pending-tag">Pending</span>
              </div>
              <input type="text" placeholder="Your First Name" disabled className="form-control" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label class="Text">Gender</label>
              <div className="select-wrapper">
                <select className="form-control">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="label-with-tag">
                <label class="Text">Country</label>
                <span className="pending-tag">Pending</span>
              </div>
              <div className="select-wrapper">
                <select className="form-control">
                  <option>Your First Name</option>
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label class="Text">Language</label>
              <input type="text" value="Hindi" disabled className="form-control" />
            </div>
            <div className="form-group">
              <div className="label-with-tag">
                <label class="Text">Time Zone</label>
                <span className="pending-tag">Pending</span>
              </div>
              <div className="select-wrapper">
                <select className="form-control">
                  <option>Your First Name</option>
                  <option>IST (GMT+5:30)</option>
                  <option>PST (GMT-8)</option>
                  <option>EST (GMT-5)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="email-section">
            <abel class="My-Email">My email Address</abel>
            <div className="email-container">
              <div className="email-box">
                <div className="email-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="email-info">
                  <div className="email">rahul@gmail.com</div>
                  <div className="time-ago">1 month ago</div>
                </div>
              </div>
              <button className="add-email-btn">+Add Email Address</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;