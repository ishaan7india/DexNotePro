import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Courses from "./pages/Courses";
import AITools from "./pages/AITools";
import DoubtSolver from "./pages/DoubtSolver";
import NotFound from "./pages/NotFound";
import "./components/LoadingScreen.css"; // 🌀 loading styles
import shortLogo from "@/assets/short-logo.png"; // 🧠 your logo file

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading screen for ~1.5 seconds
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner">
          <img src={shortLogo} alt="DexNote Logo" className="loading-logo" />
        </div>
        <p className="loading-text">Loading DexNote Pro...</p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/DexNotePro">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/ai-tools" element={<AITools />} />
            <Route path="/ai-doubt-solver" element={<DoubtSolver />} /> {/* 🧠 New Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
