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
import Whiteboard from "./pages/Whiteboard";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";
import { ThemeProvider } from "@/components/ThemeContext";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⏳ Simulated initial loading screen
    const timer = setTimeout(() => setLoading(false), 1500);

    // ✅ Fix disappearing favicon issue after React mounts
    const favicon = document.getElementById("favicon") as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = "/DexNotePro/short-logo.png";
    }

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
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
              {/* <Route path="/doubt-solver" element={<DoubtSolver />} /> */}
              <Route path="/whiteboard" element={<Whiteboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
