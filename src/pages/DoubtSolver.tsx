import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const DoubtSolver = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSolve = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setError("");
    setAnswer("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-tools`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: question,
            action: "doubt_solver", // 👈 Uses your updated backend
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setAnswer(data.result);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🧠 AI Doubt Solver
        </h1>

        <div className="space-y-4">
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question or topic here..."
            className="w-full h-32"
          />

          <Button
            onClick={handleSolve}
            disabled={loading}
            className="w-full font-medium"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Solving...
              </>
            ) : (
              "Get Answer"
            )}
          </Button>

          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}

          {answer && (
            <div className="mt-6 p-4 rounded-md border bg-muted">
              <h2 className="text-lg font-semibold mb-2">Answer:</h2>
              <p className="whitespace-pre-line">{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoubtSolver;
