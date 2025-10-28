import { useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/blogsData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const Blog = () => {
  const { id } = useParams();

  // Single post page
  if (id) {
    const post = blogPosts.find((p) => p.id === id);
    if (!post) {
      return (
        <div className="p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Post Not Found</h2>
          <Link to="/blog" className="text-blue-500 hover:underline">
            ← Back to Blog
          </Link>
        </div>
      );
    }

    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Link to="/blog" className="flex items-center gap-2 text-blue-500 mb-4">
          <ArrowLeft size={18} /> Back to Blog
        </Link>
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="rounded-xl w-full mb-4 shadow-md"
          />
        )}
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 mb-4">
          {post.date} · {post.author}
        </p>
        <div className="text-lg leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>
    );
  }

  // Blog list page
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">DexNote Blog</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`}>
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="rounded-t-xl h-48 w-full object-cover"
                />
              )}
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">
                  {post.date} · {post.author}
                </p>
                <p className="text-gray-700 line-clamp-3">
                  {post.content.slice(0, 180)}...
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
