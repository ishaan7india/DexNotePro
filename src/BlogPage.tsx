import Navbar from "@/components/Navbar";

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog System Coming Soon 📰</h1>
        <p className="text-muted-foreground">Stay tuned for updates!</p>
      </div>
    </div>
  );
};

export default BlogPage;
