import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

const AITools = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleAIAction = async (action: "summarize" | "flashcards" | "quiz") => {
    if (!inputText.trim()) {
      toast.error("Please enter some text");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const { data, error } = await supabase.functions.invoke("ai-tools", {
        body: { text: inputText, action },
      });

      if (error) throw error;
      setResult(data.result);
      toast.success("AI processing complete!");
    } catch (error: any) {
      console.error("AI tool error:", error);
      toast.error(error.message || "Failed to process with AI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Study Tools
          </h1>
          <p className="text-muted-foreground">Enhance your learning with AI-powered features</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                Input Text
              </CardTitle>
              <CardDescription>Enter your text or notes to enhance with AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your text, notes, or study material here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[300px]"
              />

              <Tabs defaultValue="summarize" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="summarize">Summarize</TabsTrigger>
                  <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                </TabsList>

                <TabsContent value="summarize" className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Generate a concise summary of your text to quickly grasp key points.
                  </p>
                  <Button
                    onClick={() => handleAIAction("summarize")}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Summarize Text
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="flashcards" className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Create study flashcards from your content for better memorization.
                  </p>
                  <Button
                    onClick={() => handleAIAction("flashcards")}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Flashcards
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="quiz" className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Generate quiz questions to test your understanding of the material.
                  </p>
                  <Button
                    onClick={() => handleAIAction("quiz")}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Quiz
                      </>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Result</CardTitle>
              <CardDescription>Your AI-generated content will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-[400px]">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : result ? (
                <div className="prose dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap bg-muted p-4 rounded-lg">{result}</div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                  Select an AI tool and click the button to see results here
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AITools;