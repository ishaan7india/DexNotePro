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
  const [quote, setQuote] = useState("");

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

    // ✨ Random motivational quote
    const quotes = [
      "“Learning never exhausts the mind.” — Leonardo da Vinci",
      "“The beautiful thing about learning is that no one can take it away from you.” — B.B. King",
      "“Strive for progress, not perfection.”",
      "“An investment in knowledge pays the best interest.” — Benjamin Franklin",
      "“Small steps every day lead to big results.”",
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="container mx-auto px-6 py-16 text-center">
        {/* Greeting */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Welcome back{userName ? `, ${userName}!` : "!"}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6">
          Ready to continue your learning journey?
        </p>

        {/* Quote */}
        <blockquote className="italic text-muted-foreground/80 text-md md:text-lg mb-12">
          {quote}
        </blockquote>

        {/* Centered Cards Section */}
        <div className="flex justify-center">
          <Card className="max-w-xs w-full bg-card border border-border shadow-md hover:shadow-lg transition">
            <CardHeader className="text-center">
              <CardTitle className="flex flex-col items-center text-primary text-xl font-semibold">
                <FileText className="h-6 w-6 mb-1 text-primary" />
                Total Notes
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Your personal knowledge base
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-5xl font-extrabold mt-2 text-primary">
                {noteCount}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
