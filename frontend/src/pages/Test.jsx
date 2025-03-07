<<<<<<< HEAD:frontend/src/pages/Test.jsx
import React, { useState } from 'react';
import '../Test.css';
import { useCookies } from "react-cookie";
import { useEffect } from 'react';
import illustration from "../assets/Illustration.jpg.jpeg";
import Navbar from "../components/Navbar"

const optionColors = {
  0: "#2ecc71", 
  1: "#f1c40f", 
  2: "#e67e22", 
  3: "#e74c3c"  
};

const questions = [
  { key: "q0", text: "Little interest or pleasure in doing things" },
  { key: "q1", text: "Feeling down, depressed, or hopeless" },
  { key: "q2", text: "Trouble falling or staying asleep, or sleeping too much" },
  { key: "q3", text: "Feeling tired or having little energy" },
  { key: "q4", text: "Poor appetite or overeating" },
  { key: "q5", text: "Feeling bad about yourself or that you are a failure or have let yourself or your family down" },
  { key: "q6", text: "Trouble concentrating on things, such as reading the newspaper or watching television" },
  { key: "q7", text: "Moving or speaking so slowly that other people could have noticed. Or the opposite – being so fidgety or restless that you have been moving around a lot more than usual" },
  { key: "q8", text: "Thoughts that you would be better off dead, or of hurting yourself" }
];

function Test() {
  const [username, setUsername] = useState("");
  const [cookies] = useCookies(["access_token"]);
  const initialResponses = questions.reduce((acc, cur) => {
    acc[cur.key] = null;
    return acc;
  }, {});

  const [responses, setResponses] = useState(initialResponses);
  const [loading, setLoading] = useState(false); // Loading state added

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        if (!cookies.access_token) {
          console.error("No access token found.");
          return;
        }

        const response = await fetch("http://127.0.0.1:5000/api/v1/get-username", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token: cookies.access_token }),
        });

        const data = await response.json();

        if (response.ok) {
          setUsername(data.username);
        } else {
          console.error("Error fetching username:", data.msg);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchUsername();
  }, [cookies.access_token]);

  const handleOptionSelect = (questionKey, value) => {
    setResponses(prev => ({
      ...prev,
      [questionKey]: value
    }));
  };

  const renderQuestionOptions = (questionKey) => {
    return (
      <div className="question-options">
        {[0, 1, 2, 3].map((value, index) => (
          <React.Fragment key={index}>
            <div className="option-wrapper" style={{ '--option-color': optionColors[value] }}>
              <div className="small-circle left"></div>
              <div
                className={`option ${responses[questionKey] === value ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(questionKey, value)}
              >
                <div className="outer-circle"></div>
              </div>
              <div className="small-circle right"></div>
            </div>
            {index < 3 && (
              <div className="connector" style={{ '--option-color': optionColors[value] }}>
                <div className="connector-line"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFilled = Object.values(responses).every(value => value !== null);

    if (!allFilled) {
      alert("Please fill all the values before submitting.");
      return;
    }

    setLoading(true); // Start loading

    const totalScore = Object.values(responses).reduce(
      (sum, value) => sum + (value !== null ? value : 0),
      0
    );

    console.log("Submitted responses:", responses);
    console.log("Total Score:", totalScore);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/store_test_score",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: cookies.access_token,
            test_score: totalScore,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert(`Questionnaire submitted! Total Score: ${totalScore}`);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting score:", error);
      alert("Failed to submit score. Please try again.");
    }

    setLoading(false); // Stop loading after process completes
  };

  return (
    <div className='main'>
      <Navbar/>
    <div className="app">
      <div className="questionnaire-container">
        <div className="questionnaire-header">
          <div className="header-content">
            <h1>Patient Health Questionnaire (PHQ-9)</h1>
            <p>Your Mental Health Today Test</p>
            <div className="header-illustration">
              <img src={illustration} alt="Questionnaire Illustration" className="w-20 h-20" />
            </div>
          </div>
        </div>

        <div className="questionnaire-instructions">
          Over the last 2 weeks, how often have you been bothered by any of the following problems?
        </div>

        <div className="questions-scroll">
          <form onSubmit={handleSubmit} className="phq-form">
            {questions.map((q, index, arr) => (
              <React.Fragment key={q.key}>
                <div className="question">
                  <label>{q.text}</label>
                  {renderQuestionOptions(q.key)}
                </div>
                {index < arr.length - 1 && <div className="question-divider"></div>}
              </React.Fragment>
            ))}
          </form>
        </div>

        {/* Submit Button with Loading State */}
        <button
          type="submit"
          className="submit-button"
          onClick={handleSubmit}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <span className="loader">Loading...</span> // Show loader animation
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
    </div>

  );
}

export default Test;
=======
import React from 'react';
import '../Profile.css';

function Profile() {
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

export default Profile;
>>>>>>> e2754c7ea8f0562b3d43631cb9d151edca2ff2c2:Frontendapp/FrontendMitra/frontend/src/pages/Test.jsx
