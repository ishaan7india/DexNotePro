import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail_url: string;
  pdf_url: string;
}

interface UserProgress {
  course_id: string;
  completed: boolean;
}

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      fetchData();
    };

    checkAuthAndFetch();
  }, [navigate]);

  const fetchData = async () => {
    const [coursesResult, progressResult] = await Promise.all([
      supabase.from("courses").select("*").order("created_at", { ascending: false }),
      supabase.from("user_course_progress").select("*"),
    ]);

    if (coursesResult.data) setCourses(coursesResult.data);
    if (progressResult.data) setProgress(progressResult.data);
    setLoading(false);
  };

  const toggleCompletion = async (courseId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const existingProgress = progress.find((p) => p.course_id === courseId);

    if (existingProgress) {
      const { error } = await supabase
        .from("user_course_progress")
        .update({
          completed: !existingProgress.completed,
          completed_at: !existingProgress.completed ? new Date().toISOString() : null,
        })
        .eq("user_id", session.user.id)
        .eq("course_id", courseId);

      if (error) {
        toast.error("Failed to update progress");
      } else {
        toast.success(existingProgress.completed ? "Marked as incomplete" : "Marked as complete!");
        fetchData();
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

      if (error) {
        toast.error("Failed to update progress");
      } else {
        toast.success("Marked as complete!");
        fetchData();
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Course Library
          </h1>
          <p className="text-muted-foreground">Explore our collection of learning materials</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${course.thumbnail_url})` }}
              />
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
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