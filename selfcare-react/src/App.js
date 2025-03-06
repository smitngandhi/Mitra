import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // Step data for Mindfulness plan
  const [steps, setSteps] = useState([
    { id: 0, title: 'Meditation', completed: false, progress: 0 },
    { id: 1, title: 'Breathing Exercise', completed: false, progress: 0 },
    { id: 2, title: 'Gratitude Journaling', completed: false, progress: 0 },
    { id: 3, title: 'Nature Exposure', completed: false, progress: 0 },
    { id: 4, title: 'Relaxation Sound', completed: false, progress: 0 },
  ]);

  // Current streak state
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // Calendar data – tracking days of the current month
  const [calendarData, setCalendarData] = useState(() => {
    const today = new Date();
    const daysInMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();

    const daysArray = Array(daysInMonth)
      .fill()
      .map((_, i) => {
        const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
        const isBeforeToday = date < new Date(today.setHours(0, 0, 0, 0));
        const randomCompleted = isBeforeToday && Math.random() < 0.3;
        return { date, completed: randomCompleted };
      });
    return daysArray;
  });

  // Calculate streaks from calendar data
  useEffect(() => {
    let streak = 0;
    const today = new Date().setHours(0, 0, 0, 0);
    for (let i = calendarData.length - 1; i >= 0; i--) {
      const day = calendarData[i];
      if (day.completed) {
        streak++;
      } else if (day.date.getTime() < today) {
        break;
      }
    }
    setCurrentStreak(streak);

    let maxStreak = 0;
    let currentMaxStreak = 0;
    for (let i = 0; i < calendarData.length; i++) {
      if (calendarData[i].completed) {
        currentMaxStreak++;
        maxStreak = Math.max(maxStreak, currentMaxStreak);
      } else {
        currentMaxStreak = 0;
      }
    }
    setLongestStreak(maxStreak);
  }, [calendarData]);

  // Check if all tasks are completed for today
  useEffect(() => {
    const allTasksCompleted = steps.every(step => step.completed);
    if (allTasksCompleted) {
      setCalendarData(prev => {
        const newCalendar = [...prev];
        const todayIndex = newCalendar.findIndex(
          day => day.date.toDateString() === new Date().toDateString()
        );
        if (todayIndex !== -1) {
          newCalendar[todayIndex].completed = true;
        }
        return newCalendar;
      });
    }
  }, [steps]);

  // Toggle completion of a step
  const toggleStep = index => {
    const newSteps = [...steps];
    const step = newSteps[index];
    step.completed = !step.completed;
    step.progress = step.completed ? 10 : 0;
    setSteps(newSteps);
  };

  // Calculate overall plan progress
  const calculateOverallProgress = () => {
    const total = steps.reduce((sum, step) => sum + step.progress, 0);
    return Math.round((total / (steps.length * 10)) * 100);
  };

  // Sidebar navigation items (all items will be shown immediately below MITRA logo)
  const navItems = [
    { icon: '/images/chat.svg', label: 'MINDchat', active: true },
    { icon: '/images/person.svg', label: 'Welfare Test', active: false },
    { icon: '/images/personheart.svg', label: 'Selfcare Plans', active: true },
    { icon: '/images/person.svg', label: 'Profile', active: false },
    { icon: '/images/house.svg', label: 'Home', active: false },
  ];

  return (
    <div className="app-container">
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <h2 className="Mitra">MITRA</h2>
        <nav>
          <ul className="nav-list">
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
        {/* (Other sidebar elements, such as chat section or happiness meter, can be placed here if desired) */}
      </aside>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* TOP BAR (gradient) with vertical stacking */}
        <div className="top-bar">
          <h1 style={{ margin: 0, fontSize: 20, color: '#333' }}>
            Welcome, Rahul
          </h1>
          <span style={{ fontSize: 14, color: '#666' }}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'short',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </span>
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
                    onClick={() => {
                      if (!step.completed) toggleStep(index);
                    }}
                    disabled={step.completed}
                  >
                    {step.completed ? 'Completed' : "Let's Start"}
                  </button>
                </div>
                {step.completed && <div className="completed-check">✔</div>}
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
              <div className="streak-container">
                <h3 className="progress-title">Your Mindfulness Streaks</h3>
                <div className="streak-info">
                  <div className="streak-card">
                    <div className="streak-value">{currentStreak}</div>
                    <div className="streak-label">Current Streak</div>
                  </div>
                  <div className="streak-card">
                    <div className="streak-value">{longestStreak}</div>
                    <div className="streak-label">Longest Streak</div>
                  </div>
                </div>
              </div>
              <div className="plan-progress-container">
                <h3 className="progress-title">Plan Progress</h3>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${calculateOverallProgress()}%` }}
                  ></div>
                </div>
                <span className="progress-percent">
                  {calculateOverallProgress()}%
                </span>
              </div>
              <div className="task-progress-container">
                <h3 className="progress-title">Task Progress</h3>
                {steps.map((step) => (
                  <div key={step.id} className="task-item">
                    <span>{step.title}</span>
                    <div className="task-progress-wrapper">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${(step.progress / 10) * 100}%` }}
                        ></div>
                      </div>
                      <div className="progress-bar-line" />
                    </div>
                    <span>{`${step.progress}/10`}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Calendar */}
            <div className="progress-right">
              <div className="calendar-container">
                <div className="calendar-header">
                  <h3 className="calendar-title">Mindfulness Streak</h3>
                </div>
                <p className="calendar-subtitle">
                  {calendarData.filter(day => day.completed).length} days completed this month
                </p>
                <div className="calendar-grid">
                  {calendarData.slice(-28).map((day, index) => (
                    <div
                      key={index}
                      className={`calendar-day ${day.completed ? 'completed-day' : ''} ${
                        day.date.toDateString() === new Date().toDateString() ? 'today' : ''
                      }`}
                    >
                      <div className="calendar-date">{day.date.getDate()}</div>
                      {day.completed && <div className="calendar-status">✓</div>}
                    </div>
                  ))}
                </div>
                <div className="calendar-legend">
                  <div className="legend-item">
                    <div className="legend-color completed-day"></div>
                    <span>Completed</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color today"></div>
                    <span>Today</span>
                  </div>
                </div>
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
