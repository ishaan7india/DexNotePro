import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Courses from "./pages/Courses";
import AITools from "./pages/AITools";
import DoubtSolver from "./pages/DoubtSolver";
import NotFound from "./pages/NotFound";

import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Show loading on first load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Show loader briefly when navigating
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) return <LoadingScreen />;

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/ai-tools" element={<AITools />} />
      <Route path="/doubt-solver" element={<DoubtSolver />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/DexNotePro">
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
