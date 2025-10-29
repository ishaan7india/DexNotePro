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
  user_id?: string;
  completed_at?: string | null;
}

const Courses = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  // ——— Your Google Drive links in the order you specified ———
  const courses: Course[] = [
    {
      id: "ai_fundamentals",
      title: "AI Fundamentals",
      description: "Understand the core ideas behind Artificial Intelligence.",
      category: "Technology",
      pdf_url: "https://drive.google.com/uc?export=view&id=1hJvCyp19laJyCN3dosN8HmP_MJVyEwp6",
    },
    {
      id: "ai_accelerator",
      title: "AI Generalist Accelerator",
      description: "Boost your AI knowledge and skills rapidly.",
      category: "Technology",
      pdf_url: "https://drive.google.com/uc?export=view&id=1iACV5zdxfEDbQKH57D9CiSqAttI8b4Pt",
    },
    {
      id: "backend",
      title: "Backend Development Foundations",
      description: "Introduction to servers, databases, and backend frameworks.",
      category: "Technology",
      pdf_url: "https://drive.google.com/uc?export=view&id=1gjMzud9Ox-GZb1yWXRMHUvGJ8bqhS-_O",
    },
    {
      id: "cybersecurity_fundamentals",
      title: "Cybersecurity Fundamentals",
      description: "Understand cybersecurity concepts and best practices.",
      category: "Cybersecurity",
      pdf_url: "https://drive.google.com/uc?export=view&id=1uiNzmoxwxR0kvEgR-O4-WyWgO56AffpC",
    },
    {
      id: "ethical_hacking",
      title: "Ethical Hacking Fundamentals",
      description: "Learn the basics of ethical hacking and penetration testing.",
      category: "Cybersecurity",
      pdf_url: "https://drive.google.com/uc?export=view&id=16W969BkOX7H2O3nJC8C8P6PAq8Ip4SEI",
    },
    {
      id: "math_high",
      title: "High School Mathematics (Grades 9–10)",
      description: "Advanced topics in algebra, geometry, and trigonometry.",
      category: "Mathematics",
      pdf_url: "https://drive.google.com/uc?export=view&id=1IizOE0ZvgxwujCLx-N5pN5tVx_gNo0p_",
    },
    {
      id: "html",
      title: "HTML Foundations",
      description: "Learn how to structure and design web pages using HTML.",
      category: "Technology",
      pdf_url: "https://drive.google.com/uc?export=view&id=15Ak4TIG-yzoT3DBgrAGxfSRpTXeTekjj",
    },
    {
      id: "github_intro",
      title: "Introduction to GitHub",
      description: "Version control and collaboration essentials using GitHub.",
      category: "Technology",
      pdf_url: "https://drive.google.com/uc?export=view&id=1m706395V3GJS3D6xpppPsLeW-BfDmNkR",
    },
    {
      id: "vscode_intro",
      title: "Introduction to VS Code",
      description: "Get started with Visual Studio Code for development.",
      category: "Technology",
      pdf_url: "https://drive.google.com/uc?export=view&id=1ohEnTC7UO6L9zltVUzfQ39X-oUiwc7eF",
    },
    {
      id: "math_middle",
      title: "Middle School Mathematics (Grades 6–8)",
      description: "Fundamental math concepts for middle schoolers.",
      category: "Mathematics",
      pdf_url: "https://drive.google.com/uc?export=view&id=1mDtE7cHTV6RUQ4OkrK5rArR5d9ysTrsG",
    },
    {
      id: "python",
      title: "Python Foundations",
      description: "A beginner-friendly guide to Python programming.",
      category: "Technology",
      pdf_url: "https://drive.google.com/uc?export=view&id=1MOQKm4hLyiseRbcLhgHhvRGE295drQAN",
    },
    {
      id: "math_senior",
      title: "Senior Secondary Mathematics (Grades 11–12)",
      description: "Comprehensive coverage for senior-level math.",
      category: "Mathematics",
      pdf_url: "https://drive.google.com/uc?export=view&id=1Y8fOzfii_T3baQ4560kNDB94NF3_HgbK",
    },
  ];

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      await fetchProgress(session.user.id);
    };

    checkAuthAndFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // fetch progress for current user only
  const fetchProgress = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_course_progress")
        .select("course_id, completed, completed_at")
        .eq("user_id", userId);

      if (error) {
        console.error("Fetch progress error:", error);
      } else {
        setProgress(data || []);
      }
    } catch (err) {
      console.error("Unexpected fetchProgress error:", err);
    } finally {
      setLoading(false);
    }
  };

  // toggle completion via upsert (insert or update in one atomic call)
  const toggleCompletion = async (courseId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("You must be signed in to mark progress.");
        return;
      }
      const userId = session.user.id;
      const existing = progress.find((p) => p.course_id === courseId);
      const newCompleted = existing ? !existing.completed : true;
      const completedAt = newCompleted ? new Date().toISOString() : null;

      // upsert: will insert if not exists or update if exists; onConflict by user+course
      const { error } = await supabase
        .from("user_course_progress")
        .upsert(
          [
            {
              user_id: userId,
              course_id: courseId,
              completed: newCompleted,
              completed_at: completedAt,
            },
          ],
          { onConflict: ["user_id", "course_id"] }
        );

      if (error) {
        console.error("Upsert error:", error);
        toast.error("Failed to save progress");
      } else {
        toast.success(newCompleted ? "Marked complete!" : "Marked incomplete");
        await fetchProgress(userId);
      }
    } catch (err) {
      console.error("toggleCompletion unexpected error:", err);
      toast.error("Failed to save progress");
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
