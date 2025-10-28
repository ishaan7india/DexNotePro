import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import logo from "@/assets/dexnote-logo.png";
import ThemeToggle from "./ThemeToggle"; // 🌙 Light/Dark Toggle

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const linkClasses = (path: string) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      location.pathname === path ? "underline underline-offset-4" : ""
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="DexNote Pro" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link to="/dashboard" className={linkClasses("/dashboard")}>
                  Dashboard
                </Link>
                <Link to="/notes" className={linkClasses("/notes")}>
                  Notes
                </Link>
                <Link to="/courses" className={linkClasses("/courses")}>
                  Courses
                </Link>
                <Link to="/ai-tools" className={linkClasses("/ai-tools")}>
                  AI Tools
                </Link>

                {/* 🧠 Added AI Doubt Solver */}
                <Link to="/doubt-solver" className={linkClasses("/doubt-solver")}>
                  Doubt Solver
                </Link>

                {/* 🧩 Added Whiteboard */}
                <Link to="/whiteboard" className={linkClasses("/whiteboard")}>
                  Whiteboard
                </Link>

                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="hover:bg-blue-500 hover:text-white"
                >
                  Sign Out
                </Button>

                {/* 🌙 Theme Toggle */}
                <ThemeToggle />
              </>
            ) : (
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`block px-4 py-2 rounded-md hover:bg-accent ${
                    location.pathname === "/dashboard"
                      ? "underline underline-offset-4"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/notes"
                  className={`block px-4 py-2 rounded-md hover:bg-accent ${
                    location.pathname === "/notes"
                      ? "underline underline-offset-4"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Notes
                </Link>
                <Link
                  to="/courses"
                  className={`block px-4 py-2 rounded-md hover:bg-accent ${
                    location.pathname === "/courses"
                      ? "underline underline-offset-4"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Courses
                </Link>
                <Link
                  to="/ai-tools"
                  className={`block px-4 py-2 rounded-md hover:bg-accent ${
                    location.pathname === "/ai-tools"
                      ? "underline underline-offset-4"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  AI Tools
                </Link>

                {/* 🧠 AI Doubt Solver link for mobile */}
                <Link
                  to="/doubt-solver"
                  className={`block px-4 py-2 rounded-md hover:bg-accent ${
                    location.pathname === "/doubt-solver"
                      ? "underline underline-offset-4"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Doubt Solver
                </Link>

                {/* 🧩 Whiteboard link for mobile */}
                <Link
                  to="/whiteboard"
                  className={`block px-4 py-2 rounded-md hover:bg-accent ${
                    location.pathname === "/whiteboard"
                      ? "underline underline-offset-4"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Whiteboard
                </Link>

                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full hover:bg-blue-500 hover:text-white"
                >
                  Sign Out
                </Button>

                {/* 🌙 Theme Toggle in mobile menu */}
                <div className="px-4 mt-2">
                  <ThemeToggle />
                </div>
              </>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
