import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // You can leave this empty or use it for global resets
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
