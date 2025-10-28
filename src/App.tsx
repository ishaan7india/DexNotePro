import { useState, useEffect, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import LoadingScreen from "@/components/LoadingScreen";
import { ThemeProvider } from "@/components/ThemeContext";

// Lazy load pages for smoother loading screen between routes
const Index = lazy(() => import("@/pages/Index"));
const Auth = lazy(() => import("@/pages/Auth"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Notes = lazy(() => import("@/pages/Notes"));
const Courses = lazy(() => import("@/pages/Courses"));
const AITools = lazy(() => import("@/pages/AITools"));
const DoubtSolver = lazy(() => import("@/pages/DoubtSolver"));
const Whiteboard = lazy(() => import("@/pages/Whiteboard"));
const Blog = lazy(() => import("@/pages/Blog"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  // Show loading screen between route transitions
  useEffect(() => {
    setIsRouteLoading(true);
    const timeout = setTimeout(() => setIsRouteLoading(false), 800);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {isRouteLoading && <LoadingScreen />}
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/ai-tools" element={<AITools />} />
          <Route path="/doubt-solver" element={<DoubtSolver />} />
          <Route path="/whiteboard" element={<Whiteboard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

const App = () => {
  const [loading, setLoading] = useState(true);

  // Initial splash loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/DexNotePro">
            <AppContent />
          </BrowserRouter>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
