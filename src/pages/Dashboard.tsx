import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Welcome Back!
        </h1>
        <p className="text-muted-foreground mb-8">
          Continue your learning journey with DexNotePro
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Notes
              </CardTitle>
              <CardDescription>Your personal knowledge base</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                Access, organize, and edit your saved notes anytime.
              </p>
              <a
                href="/notes"
                className="inline-block mt-4 text-primary hover:underline"
              >
                ✏️ Go to Notes
              </a>
            </CardContent>
          </Card>

          {/* Quick Links Section */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
              <CardDescription>Jump right into learning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <a href="/courses" className="block text-primary hover:underline">
                📘 Browse Courses
              </a>
              <a href="/aitools" className="block text-primary hover:underline">
                🤖 Explore AI Tools
              </a>
              <a href="/notes" className="block text-primary hover:underline">
                🗒️ Create New Note
              </a>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
