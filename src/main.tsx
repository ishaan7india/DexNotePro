// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext"; // 👈 add this import

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>   {/* 👈 wrap App inside ThemeProvider */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
