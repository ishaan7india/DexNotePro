import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const Courses = () => {
  const courses = [
    {
      id: "math_middle",
      title: "Middle School Mathematics (Grades 6–8)",
      description: "Fundamental math concepts for middle schoolers.",
      category: "Mathematics",
      pdf_url: "https://drive.google.com/file/d/1mDtE7cHTV6RUQ4OkrK5rArR5d9ysTrsG/view?usp=drive_link",
    },
    {
      id: "math_high",
      title: "High School Mathematics (Grades 9–10)",
      description: "Advanced topics in algebra, geometry, and trigonometry.",
      category: "Mathematics",
      pdf_url: "https://drive.google.com/file/d/1IizOE0ZvgxwujCLx-N5pN5tVx_gNo0p_/view?usp=drive_link",
    },
    {
      id: "math_senior",
      title: "Senior Secondary Mathematics (Grades 11–12)",
      description: "Comprehensive coverage for senior-level math.",
      category: "Mathematics",
      pdf_url: "https://drive.google.com/file/d/1Y8fOzfii_T3baQ4560kNDB94NF3_HgbK/view?usp=drive_link",
    },
    {
      id: "python",
      title: "Python Foundations",
      description: "A beginner-friendly guide to Python programming.",
      category: "Technology",
      pdf_url: "https://drive.google.com/file/d/1MOQKm4hLyiseRbcLhgHhvRGE295drQAN/view?usp=drive_link",
    },
    {
      id: "html",
      title: "HTML Foundations",
      description: "Learn how to structure and design web pages using HTML.",
      category: "Technology",
      pdf_url: "https://drive.google.com/file/d/15Ak4TIG-yzoT3DBgrAGxfSRpTXeTekjj/view?usp=drive_link",
    },
    {
      id: "backend",
      title: "Backend Development Foundations",
      description: "Introduction to servers, databases, and backend frameworks.",
      category: "Technology",
      pdf_url: "https://drive.google.com/file/d/1gjMzud9Ox-GZb1yWXRMHUvGJ8bqhS-_O/view?usp=drive_link",
    },
    {
      id: "ai_fundamentals",
      title: "AI Fundamentals",
      description: "Understand the core ideas behind Artificial Intelligence.",
      category: "Technology",
      pdf_url: "https://drive.google.com/file/d/1hJvCyp19laJyCN3dosN8HmP_MJVyEwp6/view?usp=drive_link",
    },
    {
      id: "ai_accelerator",
      title: "AI Generalist Accelerator",
      description: "Boost your AI knowledge and skills rapidly.",
      category: "Technology",
      pdf_url: "https://drive.google.com/file/d/1iACV5zdxfEDbQKH57D9CiSqAttI8b4Pt/view?usp=drive_link",
    },
    {
      id: "github_intro",
      title: "Introduction to GitHub",
      description: "Version control and collaboration essentials using GitHub.",
      category: "Technology",
      pdf_url: "https://drive.google.com/file/d/1m706395V3GJS3D6xpppPsLeW-BfDmNkR/view?usp=drive_link",
    },
    {
      id: "vscode_intro",
      title: "Introduction to Visual Studio Code",
      description: "Get started with Visual Studio Code for development.",
      category: "Technology",
      pdf_url: "https://drive.google.com/file/d/1ohEnTC7UO6L9zltVUzfQ39X-oUiwc7eF/view?usp=drive_link",
    },
    {
      id: "ethical_hacking",
      title: "Ethical Hacking Fundamentals",
      description: "Learn the basics of ethical hacking and penetration testing.",
      category: "Cybersecurity",
      pdf_url: "https://drive.google.com/file/d/16W969BkOX7H2O3nJC8C8P6PAq8Ip4SEI/view?usp=drive_link",
    },
    {
      id: "cybersecurity_fundamentals",
      title: "Cybersecurity Fundamentals",
      description: "Understand cybersecurity concepts and best practices.",
      category: "Cybersecurity",
      pdf_url: "https://drive.google.com/file/d/1uiNzmoxwxR0kvEgR-O4-WyWgO56AffpC/view?usp=drive_link",
    },
  ];

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
                </div>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(course.pdf_url, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open PDF
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
