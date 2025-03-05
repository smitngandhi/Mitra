import React, { useState } from 'react';
import './App.css';

// Define option colors for each index (0..3)
const optionColors = {
  0: "#2ecc71", // Green
  1: "#f1c40f", // Yellow
  2: "#e67e22", // Orange
  3: "#e74c3c"  // Red
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

function App() {
  const initialResponses = questions.reduce((acc, cur) => {
    acc[cur.key] = null;
    return acc;
  }, {});

  const [responses, setResponses] = useState(initialResponses);

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
            {/* Option group: small left circle, main circle, small right circle */}
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
            {/* Connector line (dashed) between options (except after last) */}
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted responses:', responses);
    alert('Questionnaire submitted!');
  };

  return (
    <div className="app">
      {/* Top Header */}
      <div className="header">
        <div className="logo">MITRA</div>
        <div className="header-right">
          <div className="user-profile">
            <img src="/api/placeholder/40/40" alt="User" />
            <span>Rahul Shah</span>
          </div>
        </div>
      </div>

      {/* Main Questionnaire Container */}
      <div className="questionnaire-container">
        <div className="questionnaire-header">
          <div className="header-content">
            <h1>Patient Health Questionnaire (PHQ-9)</h1>
            <p>Your Mental Health Today Test</p>
            <div className="header-illustration">
              <img src="/api/placeholder/200/200" alt="Questionnaire Illustration" />
            </div>
          </div>
        </div>

        <div className="questionnaire-instructions">
          Over the last 2 weeks, how often have you been bothered by any of the following problems?
        </div>

        {/* Scrollable container for questions */}
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

        {/* Submit Button outside the scrollable container */}
        <button type="submit" className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
