import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Step data
  const [steps, setSteps] = useState([
    { id: 0, title: 'Meditation', completed: false, progress: 0 },
    { id: 1, title: 'Breathing Exercise', completed: false, progress: 0 },
    { id: 2, title: 'Gratitude Journaling', completed: false, progress: 0 },
    { id: 3, title: 'Nature Exposure', completed: false, progress: 0 },
    { id: 4, title: 'Relaxation Sound', completed: false, progress: 0 }
  ]);

  // Toggle completion of a step
  const toggleStep = (index) => {
    const newSteps = [...steps];
    const step = newSteps[index];
    step.completed = !step.completed;
    step.progress = step.completed ? 10 : 0; // each step is worth 10 points
    setSteps(newSteps);
  };

  // Calculate overall plan progress
  const calculateOverallProgress = () => {
    const total = steps.reduce((sum, step) => sum + step.progress, 0);
    // Each step = 10 points, so max total = steps.length * 10
    return Math.round((total / (steps.length * 10)) * 100);
  };

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">MITRA</h2>
        <nav>
          <ul>
            <li className="active">
              <span>💬</span> MINDchat
            </li>
            <li className="selected">
              <span>❤️</span> HealthCare
            </li>
            <li>
              <span>📋</span> Welfare Test
            </li>
            <li>
              <span>👤</span> Profile
            </li>
            <li>
              <span>📊</span> Health Reports
            </li>
            <li>
              <span>🏠</span> Home
            </li>
            <li>
              <span>🚪</span> Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* TOP BAR (gradient) */}
        <div className="top-bar">
          <h1 style={{ margin: 0, fontSize: 20, color: '#333' }}>
            Welcome, Rahul
          </h1>
          <span style={{ fontSize: 14, color: '#666' }}>Tue, 07 June 2022</span>
        </div>

        {/* Mindfulness & Relaxation Plan */}
        <section className="plan-section">
          <h2>Mindfulness &amp; Relaxation Plan</h2>
          <p>Plans especially designed for your wellness</p>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`step-card ${step.completed ? 'completed' : ''}`}
              >
                <div className="image-container">
                  <MeditationIcon />
                </div>
                <div className="step-content">
                  <div className="step-header">
                    <span className="step-name">{step.title}</span>
                    <span className="step-number">Step {index + 1}</span>
                  </div>
                  <div className="step-description">
                    Mindfulness activity to improve mental well-being
                  </div>
                  <button
                    className="lets-start-btn"
                    onClick={() => toggleStep(index)}
                  >
                    Let's Start
                  </button>
                </div>
                {step.completed && (
                  <div className="completed-check">✔</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Track the Progress */}
        <section className="progress-tracking">
          <h2>Track the Progress</h2>
          <p>Track your task achievements and plan progresses here</p>

          <div className="progress-grid">
            {/* LEFT COLUMN: Plan & Task Progress */}
            <div className="progress-left">
              {/* Plan Progress */}
              <div className="plan-progress-container">
                <h3 className="progress-title">Plan Progress</h3>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${calculateOverallProgress()}%` }}
                  />
                </div>
                <span className="progress-percent">
                  {calculateOverallProgress()}%
                </span>
              </div>

              {/* Task Progress */}
              <div className="task-progress-container">
                <h3 className="progress-title">Task Progress</h3>
                {steps.map((step) => (
                  <div key={step.id} className="task-item">
                    <span>{step.title}</span>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${(step.progress / 10) * 100}%` }}
                      />
                    </div>
                    <span>{`${step.progress}/10`}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Mood Tracker placeholder */}
            <div className="progress-right">
              <h3 className="progress-title">Mood Tracker</h3>
              <div className="mood-chart-placeholder">
                <p style={{ textAlign: 'center', marginTop: 50, color: '#777' }}>
                  Mood Tracker Chart
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Simple MeditationIcon placeholder
const MeditationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40">
    <circle cx="32" cy="32" r="30" fill="#6D5ED4" />
    <circle cx="32" cy="32" r="20" fill="#fff" />
  </svg>
);

export default App;
