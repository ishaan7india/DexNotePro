import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

    let systemPrompt = "";
    switch (action) {
      case "summarize":
        systemPrompt =
          "You are a helpful AI assistant that summarizes text into clear and concise key points.";
        break;
      case "flashcards":
        systemPrompt =
          "You are a helpful AI assistant that creates study flashcards. Output 5–10 question/answer pairs in clear readable text.";
        break;
      case "quiz":
        systemPrompt =
          "You are a helpful AI assistant that generates 5–10 quiz questions (multiple choice or short answer) with answers.";
        break;
      case "doubt_solver":
        systemPrompt =
          "You are an expert educational tutor. When given a question, explain it clearly step-by-step with examples where relevant.";
        break;
      default:
        throw new Error("Invalid action");
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errorText);
      throw new Error("AI gateway failed");
    }

    const data = await aiResponse.json();
    const result = data.choices?.[0]?.message?.content || "No response from AI.";

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("Function error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
