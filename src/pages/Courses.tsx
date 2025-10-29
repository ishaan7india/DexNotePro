import { useEffect, useState } from "react";
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

const localCourses: Course[] = [
  {
    id: "1",
    title: "Python Foundations",
    description: "Master Python fundamentals, syntax, and logic.",
    category: "Programming",
    thumbnail_url: "/images/python.jpg", // optional thumbnail in /public/images/
    pdf_url: "/courses/python_foundations.pdf",
  },
  {
    id: "2",
    title: "Backend Development Foundations",
    description: "Learn APIs, databases, and server-side logic.",
    category: "Web Development",
    thumbnail_url: "/images/backend.jpg",
    pdf_url: "/courses/backend_development.pdf",
  },
  {
    id: "3",
    title: "Ethical Hacking",
    description: "Understand cybersecurity and penetration testing basics.",
    category: "Cybersecurity",
    thumbnail_url: "/images/ethical_hacking.jpg",
    pdf_url: "/courses/ethical_hacking.pdf",
  },
  // ➕ Add more courses here
];

interface UserProgress {
  course_id: string;
  completed: boolean;
}

const Courses = () => {
  const [progress, setProgress] = useState<UserProgress[]>([]);

  // 🧠 Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("course_progress");
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  // 💾 Save progress to localStorage
  const saveProgress = (newProgress: UserProgress[]) => {
    setProgress(newProgress);
    localStorage.setItem("course_progress", JSON.stringify(newProgress));
  };

  const toggleCompletion = (courseId: string) => {
    const existing = progress.find((p) => p.course_id === courseId);
    let newProgress;

    if (existing) {
      newProgress = progress.map((p) =>
        p.course_id === courseId ? { ...p, completed: !p.completed } : p
      );
      toast.success(existing.completed ? "Marked as incomplete" : "Marked as complete!");
    } else {
      newProgress = [...progress, { course_id: courseId, completed: true }];
      toast.success("Marked as complete!");
    }

    saveProgress(newProgress);
  };

  const isCompleted = (courseId: string) =>
    progress.find((p) => p.course_id === courseId)?.completed || false;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Course Library
          </h1>
          <p className="text-muted-foreground">
            Explore our curated collection of PDF-based courses
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {localCourses.map((course) => (
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
