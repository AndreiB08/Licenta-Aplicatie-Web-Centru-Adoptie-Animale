import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App/App.jsx";
import "./main.css";
import "./i18n";

window.onerror = (message, source, lineno, colno, error) => {
  console.error("Global error captured:", { message, source, lineno, colno, error });
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

console.log("React app successfully mounted.");
