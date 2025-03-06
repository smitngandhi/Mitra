import React, { useState } from 'react';
import './App.css';

function App() {
  // State to track if the video has finished playing
  const [isCompleted, setIsCompleted] = useState(false);

  // When video ends, mark isCompleted as true
  const handleVideoEnd = () => {
    setIsCompleted(true);
  };

  return (
    <div className="breathing-container">
      {/* Instruction text above video */}
      <h2 className="instruction-text">
        Breathe in for 4 sec then hold for 2 sec and then exhale
      </h2>

      {/* Centered video that plays automatically */}
      <video
        className="breathing-video"
        src="/videos/video1.mp4"
        autoPlay
        onEnded={handleVideoEnd}
        playsInline
      />

      {/* Show "Completed" box at bottom if video ended */}
      {isCompleted && (
        <div className="completed-box">
          <p>Completed</p>
        </div>
      )}
    </div>
  );
}

export default App;
