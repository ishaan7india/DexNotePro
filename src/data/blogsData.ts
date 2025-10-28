export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  image?: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "ai-in-education",
    title: "How AI is Transforming Education",
    date: "October 25, 2025",
    author: "DexNote Team",
    image: "https://source.unsplash.com/800x400/?ai,education",
    content: `
      Artificial Intelligence (AI) has revolutionized how students learn and teachers teach.
      With tools like DexNote, learners can now summarize notes, clear doubts instantly, 
      and stay organized with personalized insights. The future of education will rely on 
      adaptive AI models that understand each student’s pace and pattern to deliver 
      a unique learning journey.
    `,
  },
  {
    id: "note-taking-tips",
    title: "Smart Note-Taking Tips for Students",
    date: "October 20, 2025",
    author: "DexNote Team",
    image: "https://source.unsplash.com/800x400/?notes,students",
    content: `
      Note-taking is an art — and when done smartly, it can boost memory retention by 60%.
      Tools like DexNote help students organize digital notes, tag subjects, and 
      retrieve them instantly. Always keep your notes concise, use bullet points, 
      and review them weekly to stay exam-ready.
    `,
  },
];
