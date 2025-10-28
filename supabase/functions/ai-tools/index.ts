import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, action } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!text || !action) {
      throw new Error("Text and action are required");
    }

    // 🧠 Select the correct system prompt based on action
    let systemPrompt = "";
    switch (action) {
      case "summarize":
        systemPrompt =
          "You are a helpful AI assistant that creates concise, clear summaries of text. Extract key points and present them in an easy-to-understand format.";
        break;

      case "flashcards":
        systemPrompt =
          "You are a helpful AI assistant that creates study flashcards. Generate 5-10 flashcard pairs (Question/Answer format) based on the provided text. Format them clearly with 'Q:' and 'A:' prefixes.";
        break;

      case "quiz":
        systemPrompt =
          "You are a helpful AI assistant that creates quiz questions. Generate 5-10 multiple choice or short answer questions based on the provided text to test comprehension. Include answer keys.";
        break;

      case "doubt_solver":
        systemPrompt =
          "You are an expert educational AI tutor. When a student asks a question or expresses doubt, give a clear, detailed, and step-by-step explanation. If relevant, show working steps or reasoning. Keep it concise, accurate, and friendly. If the question is ambiguous, politely ask for clarification.";
        break;

      default:
        throw new Error("Invalid action");
    }

    // 🧩 Send the request to the Lovable AI Gateway
    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: text },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error: "Rate limit exceeded. Please try again later.",
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({
            error:
              "Payment required. Please add credits to your Lovable workspace.",
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    if (!result) {
      throw new Error("No result from AI");
    }

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in ai-tools function:", error);
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "Unknown server error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
