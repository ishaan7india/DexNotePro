import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

const Dashboard = () => {
  const [noteCount, setNoteCount] = useState(0);

  useEffect(() => {
    const fetchNoteCount = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { count } = await supabase
        .from("notes")
        .select("*", { count: "exact", head: true })
        .eq("user_id", session.user.id);
      if (count !== null) setNoteCount(count);
    };
    fetchNoteCount();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Welcome Back!
        </h1>
        <p className="text-muted-foreground mb-8">
          Here's your learning progress overview
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Total Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Total Notes
              </CardTitle>
              <CardDescription>Your personal knowledge base</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{noteCount}</p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Jump right into learning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <a
                href="/notes"
                className="block text-primary hover:underline"
              >
                ✏️ Create a new note
              </a>
              <a
                href="/courses"
                className="block text-primary hover:underline"
              >
                📘 Browse courses
              </a>
              <a
                href="/aitools"
                className="block text-primary hover:underline"
              >
                🤖 Try AI tools
              </a>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
