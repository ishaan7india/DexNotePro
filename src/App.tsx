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
import NotFound from "./pages/NotFound";
import CalculatorPage from "./pages/CalculatorPage"; // ✅ Added in Step 5
import WhiteboardPage from "./pages/WhiteboardPage"; // ✅ Added in Step 6

const queryClient = new QueryClient();

const App = () => (
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

          {/* ✅ New utility pages */}
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/whiteboard" element={<WhiteboardPage />} />

          {/* Always keep NotFound last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
