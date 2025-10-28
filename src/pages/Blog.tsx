import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { blogPosts } from "@/data/blogsData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const Blog = () => {
  const { id } = useParams();

  // ✅ If individual blog is open
  if (id) {
    const post = blogPosts.find((p) => p.id === id);
    if (!post) {
      return (
        <div className="min-h-screen bg-background">
          <Navbar />
          <div className="container mx-auto px-4 py-10 text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Post Not Found
            </h2>
            <Link
              to="/blog"
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-10 max-w-3xl">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-primary mb-6 hover:opacity-80 transition"
          >
            <ArrowLeft size={18} /> Back to Blog
          </Link>

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="rounded-2xl w-full mb-6 shadow-md"
            />
          )}

          <h1 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {post.title}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {post.date} · {post.author}
          </p>

          <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </main>
      </div>
    );
  }

  // ✅ Blog list view
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            DexNote Blog
          </h1>
          <p className="text-muted-foreground text-lg">
            Latest updates, insights & announcements from DexNote.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <Card className="hover:shadow-xl transition-transform transform hover:scale-[1.02] cursor-pointer">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="rounded-t-2xl h-48 w-full object-cover"
                  />
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {post.date} · {post.author}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                    {post.content.slice(0, 180)}...
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blog;
