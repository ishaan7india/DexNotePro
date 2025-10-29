import React, { useState } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail_url: string;
  pdf_url: string;
}

const localCourses: Course[] = [
  // 🧮 Mathematics Series
  {
    id: "math6-8",
    title: "Middle School Mathematics (Grades 6–8)",
    description: "Covers arithmetic, algebra basics, and geometry essentials.",
    category: "Mathematics",
    thumbnail_url: "/images/math_middle.jpg",
    pdf_url: "/courses/middle_school_math.pdf",
  },
  {
    id: "math9-10",
    title: "High School Mathematics (Grades 9–10)",
    description: "Master algebra, trigonometry, and coordinate geometry.",
    category: "Mathematics",
    thumbnail_url: "/images/math_high.jpg",
    pdf_url: "/courses/high_school_math.pdf",
  },
  {
    id: "math11-12",
    title: "Senior Secondary Mathematics (Grades 11–12)",
    description: "Advanced calculus, vectors, and probability concepts.",
    category: "Mathematics",
    thumbnail_url: "/images/math_senior.jpg",
    pdf_url: "/courses/senior_secondary_math.pdf",
  },

  // 💻 Technology & Computing Series
  {
    id: "python",
    title: "Python Foundations",
    description: "Learn core Python syntax, logic, and problem-solving.",
    category: "Technology",
    thumbnail_url: "/images/python.jpg",
    pdf_url: "/courses/python_foundations.pdf",
  },
  {
    id: "html",
    title: "HTML Foundations",
    description: "Get started with web structure, tags, and styling fundamentals.",
    category: "Technology",
    thumbnail_url: "/images/html.jpg",
    pdf_url: "/courses/html_foundations.pdf",
  },
  {
    id: "backend",
    title: "Backend Development Foundations",
    description: "Explore APIs, databases, and server-side development.",
    category: "Technology",
    thumbnail_url: "/images/backend.jpg",
    pdf_url: "/courses/backend_development.pdf",
  },
  {
    id: "ai_fundamentals",
    title: "AI Fundamentals",
    description: "Understand the basics of Artificial Intelligence and its core ideas.",
    category: "Technology",
    thumbnail_url: "/images/ai_fundamentals.jpg",
    pdf_url: "/courses/ai_fundamentals.pdf",
  },
  {
    id: "ai_accelerator",
    title: "AI Generalist Accelerator",
    description: "Upskill in AI tools, prompt design, and automation techniques.",
    category: "Technology",
    thumbnail_url: "/images/ai_accelerator.jpg",
    pdf_url: "/courses/ai_generalist_accelerator.pdf",
  },
  {
    id: "github_intro",
    title: "Introduction to GitHub",
    description: "Learn repositories, commits, and version control basics.",
    category: "Technology",
    thumbnail_url: "/images/github.jpg",
    pdf_url: "/courses/introduction_to_github.pdf",
  },
  {
    id: "vscode_intro",
    title: "Introduction to VS Code",
    description: "Discover VS Code features, extensions, and coding workflow.",
    category: "Technology",
    thumbnail_url: "/images/vscode.jpg",
    pdf_url: "/courses/introduction_to_vscode.pdf",
  },

  // 🔒 Cybersecurity Series
  {
    id: "ethical_hacking",
    title: "Ethical Hacking Fundamentals",
    description: "Dive into cybersecurity principles and penetration testing.",
    category: "Cybersecurity",
    thumbnail_url: "/images/ethical_hacking.jpg",
    pdf_url: "/courses/ethical_hacking.pdf",
  },
  {
    id: "cybersecurity_fundamentals",
    title: "Cybersecurity Fundamentals",
    description: "Learn digital safety, encryption, and network protection basics.",
    category: "Cybersecurity",
    thumbnail_url: "/images/cybersecurity.jpg",
    pdf_url: "/courses/cybersecurity_fundamentals.pdf",
  },
];

const Courses: React.FC = () => {
  const [search, setSearch] = useState("");
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);

  const filteredCourses = localCourses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleComplete = (id: string) => {
    setCompletedCourses((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
        DexNotePro Course Catalogue
      </h1>

      <div className="max-w-3xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-blue-200 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-48">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {course.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                  {course.description}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <a
                  href={course.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Open PDF
                </a>
                <button
                  onClick={() => toggleComplete(course.id)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    completedCourses.includes(course.id)
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}
                >
                  {completedCourses.includes(course.id) ? "Completed" : "Mark Complete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <p className="text-center text-gray-500 mt-12">
          No courses found for “{search}”.
        </p>
      )}
    </div>
  );
};

export default Courses;
