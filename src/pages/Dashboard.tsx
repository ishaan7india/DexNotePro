import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FileText } from "lucide-react";

const Dashboard = () => {
  const [noteCount, setNoteCount] = useState(0);
  const [userName, setUserName] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  const quotes = [
    "“Learning never exhausts the mind.” — Leonardo da Vinci",
    "“The beautiful thing about learning is that no one can take it away from you.” — B.B. King",
    "“Strive for progress, not perfection.”",
    "“An investment in knowledge pays the best interest.” — Benjamin Franklin",
    "“Small steps every day lead to big results.”",
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const name =
          session.user.user_metadata?.name ||
          session.user.email?.split("@")[0];
        setUserName(name || "Learner");

        const { count } = await supabase
          .from("notes")
          .select("*", { count: "exact", head: true })
          .eq("user_id", session.user.id);
        if (count !== null) setNoteCount(count);
      }
    };

    fetchUserData();
    setFadeIn(true);

    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setFadeIn(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 bg-gradient-to-b from-background to-muted text-foreground">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6 py-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent dark:from-primary dark:to-accent">
          Welcome back{userName ? `, ${userName}!` : "!"}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-6">
          Ready to continue your learning journey?
        </p>

        <blockquote
          className={`italic text-muted-foreground/80 text-md md:text-lg mb-12 max-w-xl transition-opacity duration-700 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          {quotes[quoteIndex]}
        </blockquote>

        <Card className="w-full max-w-md bg-card/80 dark:bg-card border border-border/50 shadow-md dark:shadow-primary/10 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
          <CardHeader className="text-center">
            <CardTitle className="flex justify-center items-center gap-2 text-xl font-semibold text-blue-500 dark:text-primary">
              <FileText className="h-6 w-6 text-blue-500 dark:text-primary" />
              Total Notes
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Your personal knowledge base
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <p className="text-5xl font-extrabold text-blue-500 dark:text-primary mt-2">
              {noteCount}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
