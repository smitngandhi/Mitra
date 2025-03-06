import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // start muted for autoplay compliance
  const videoRef = useRef(null);

  // When the video ends, mark it as completed
  const handleVideoEnd = () => {
    setIsCompleted(true);
  };

  // On mount, try playing the video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Autoplay error:", err);
      });
    }
  }, []);

  // Unmute handler: remove muted flag and update state
  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      // Optionally, resume play if needed:
      videoRef.current.play().catch((err) => {
        console.error("Play after unmute error:", err);
      });
    }
  };

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="fullscreen-video"
        src="/videos/Meditation-Video.mp4"  // Replace with your actual video path
        autoPlay
        muted // initially muted for autoplay
        playsInline
        onEnded={handleVideoEnd}
      />

      {/* Unmute button overlay, visible if video is still muted */}
      {isMuted && (
        <button className="unmute-button" onClick={handleUnmute}>
          Unmute
        </button>
      )}

      {/* "Completed" box shown when video ends */}
      {isCompleted && (
        <div className="completed-box">
          <p>Completed</p>
        </div>
      )}
    </div>
  );
}

export default App;
