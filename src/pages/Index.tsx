import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Sparkles, TrendingUp, CheckCircle } from "lucide-react";
import logo from "@/assets/dexnote-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <img src={logo} alt="DexNote Pro" className="h-20 w-auto mx-auto mb-8" />
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Welcome to DexNote Pro
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Your next-generation learning and productivity platform. Organize notes, complete courses, 
          and supercharge your studying with AI-powered tools.
        </p>
        <Link to="/auth">
          <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow">
            Get Started Free
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Excel</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-lg transition-shadow border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Smart Notes</CardTitle>
              <CardDescription>
                Create, organize, and categorize your notes with tags for easy retrieval.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-accent/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Course Library</CardTitle>
              <CardDescription>
                Access a curated collection of PDF courses and track your completion progress.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>AI Study Tools</CardTitle>
              <CardDescription>
                Generate summaries, flashcards, and quizzes instantly using advanced AI.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-accent/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your learning journey with comprehensive analytics and insights.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why DexNote Pro?</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">All-in-One Platform</h3>
                <p className="text-muted-foreground">
                  Everything you need for effective learning in one place - no need for multiple apps.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">AI-Powered Enhancement</h3>
                <p className="text-muted-foreground">
                  Leverage cutting-edge AI to transform your study materials into actionable learning tools.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Progress Visualization</h3>
                <p className="text-muted-foreground">
                  Track your achievements and stay motivated with clear progress indicators.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Secure & Private</h3>
                <p className="text-muted-foreground">
                  Your data is protected with enterprise-grade security and privacy measures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card className="max-w-2xl mx-auto border-primary/30 shadow-xl">
          <CardContent className="pt-6">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of learners who are achieving their goals with DexNote Pro.
            </p>
            <Link to="/auth">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Learning Today
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 DexNote Pro. Empowering learners worldwide.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;