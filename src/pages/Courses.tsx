import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  pdf_url: string;
}

interface UserProgress {
  course_id: string;
  completed: boolean;
}

const Courses = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ base path fix for GitHub Pages
  const base = import.meta.env.BASE_URL || "/";

  // 🧾 Static course list
  const courses: Course[] = [
    // 🧮 Mathematics Series
    {
      id: "math_middle",
      title: "Middle School Mathematics (Grades 6–8)",
      description: "Fundamental math concepts for middle schoolers.",
      category: "Mathematics",
      pdf_url: `${base}courses/Middle_School_Mathematics.pdf`,
    },
    {
      id: "math_high",
      title: "High School Mathematics (Grades 9–10)",
      description: "Advanced topics in algebra, geometry, and trigonometry.",
      category: "Mathematics",
      pdf_url: `${base}courses/High_School_Mathematics.pdf`,
    },
    {
      id: "math_senior",
      title: "Senior Secondary Mathematics (Grades 11–12)",
      description: "Comprehensive coverage for senior-level math.",
      category: "Mathematics",
      pdf_url: `${base}courses/Senior_Secondary_Mathematics.pdf`,
    },

    // 💻 Technology & Computing
    {
      id: "python",
      title: "Python Foundations",
      description: "A beginner-friendly guide to Python programming.",
      category: "Technology",
      pdf_url: `${base}courses/Python_Foundations.pdf`,
    },
    {
      id: "html",
      title: "HTML Foundations",
      description: "Learn how to structure and design web pages using HTML.",
      category: "Technology",
      pdf_url: `${base}courses/HTML_Foundations.pdf`,
    },
    {
      id: "backend",
      title: "Backend Development Foundations",
      description: "Introduction to servers, databases, and backend frameworks.",
      category: "Technology",
      pdf_url: `${base}courses/Backend_Development_Foundations.pdf`,
    },
    {
      id: "ai_fundamentals",
      title: "AI Fundamentals",
      description: "Understand the core ideas behind Artificial Intelligence.",
      category: "Technology",
      pdf_url: `${base}courses/AI_Fundamentals.pdf`,
    },
    {
      id: "ai_accelerator",
      title: "AI Generalist Accelerator",
      description: "Boost your AI knowledge and skills rapidly.",
      category: "Technology",
      pdf_url: `${base}courses/AI_Generalist_Accelerator.pdf`,
    },
    {
      id: "github_intro",
      title: "Introduction to GitHub",
      description: "Version control and collaboration essentials using GitHub.",
      category: "Technology",
      pdf_url: `${base}courses/Introduction_to_GitHub.pdf`,
    },
    {
      id: "vscode_intro",
      title: "Introduction to VS Code",
      description: "Get started with Visual Studio Code for development.",
      category: "Technology",
      pdf_url: `${base}courses/Introduction_to_VS_Code.pdf`,
    },

    // 🔒 Cybersecurity
    {
      id: "ethical_hacking",
      title: "Ethical Hacking Fundamentals",
      description: "Learn the basics of ethical hacking and penetration testing.",
      category: "Cybersecurity",
      pdf_url: `${base}courses/Ethical_Hacking_Fundamentals.pdf`,
    },
    {
      id: "cybersecurity_fundamentals",
      title: "Cybersecurity Fundamentals",
      description: "Understand cybersecurity concepts and best practices.",
      category: "Cybersecurity",
      pdf_url: `${base}courses/Cybersecurity_Fundamentals.pdf`,
    },
  ];

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      fetchProgress();
    };

    checkAuthAndFetch();
  }, [navigate]);

  const fetchProgress = async () => {
    const { data } = await supabase.from("user_course_progress").select("*");
    if (data) setProgress(data);
    setLoading(false);
  };

  const toggleCompletion = async (courseId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const existing = progress.find((p) => p.course_id === courseId);
    if (existing) {
      const { error } = await supabase
        .from("user_course_progress")
        .update({ completed: !existing.completed })
        .eq("user_id", session.user.id)
        .eq("course_id", courseId);
      if (error) toast.error("Failed to update progress");
      else {
        toast.success(
          existing.completed ? "Marked incomplete" : "Marked complete!"
        );
        fetchProgress();
      }
    } else {
      const { error } = await supabase.from("user_course_progress").insert([
        {
          user_id: session.user.id,
          course_id: courseId,
          completed: true,
          completed_at: new Date().toISOString(),
        },
      ]);
      if (error) toast.error("Failed to save progress");
      else {
        toast.success("Marked complete!");
        fetchProgress();
      }
    }
  };

  const isCompleted = (courseId: string) => {
    return progress.find((p) => p.course_id === courseId)?.completed || false;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          🎓 DexNotePro Course Catalogue
        </h1>
        <p className="text-muted-foreground mb-8">
          Access our official learning resources across all domains.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="secondary">{course.category}</Badge>
                  {isCompleted(course.id) && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </div>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(course.pdf_url, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open PDF
                </Button>
                <Button
                  variant={isCompleted(course.id) ? "secondary" : "default"}
                  className="w-full"
                  onClick={() => toggleCompletion(course.id)}
                >
                  {isCompleted(course.id) ? "Mark Incomplete" : "Mark Complete"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Courses;
