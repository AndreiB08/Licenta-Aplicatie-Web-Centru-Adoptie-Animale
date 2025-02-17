import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./main.css";

window.onerror = (message, source, lineno, colno, error) => {
  console.error("Global error captured:", { message, source, lineno, colno, error });
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

console.log("React app successfully mounted.");
