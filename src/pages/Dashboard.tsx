import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

const Dashboard = () => {
  const [noteCount, setNoteCount] = useState(0);
  const [userName, setUserName] = useState("");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const name = session.user.user_metadata?.name || session.user.email?.split("@")[0];
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
      "“Small steps every day lead to big results.”"
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      <Navbar />
      <main className="container mx-auto px-6 py-16 text-center">
        {/* Greeting */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Welcome back{userName ? `, ${userName}!` : "!"}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Ready to continue your learning journey?
        </p>

        {/* Quote */}
        <blockquote className="italic text-gray-400 text-md md:text-lg mb-12">
          {quote}
        </blockquote>

        {/* Cards Section */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
          <Card className="bg-slate-800/60 border border-slate-700 backdrop-blur-sm shadow-lg hover:shadow-blue-500/10 transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-blue-400">
                <FileText className="h-6 w-6 text-blue-400" />
                Total Notes
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your personal knowledge base
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-extrabold text-blue-300 mt-2">
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
