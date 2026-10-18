/**
 * OpenRouter Free Tier LLM & Vision Reasoning Client
 * Models:
 * - meta-llama/llama-3.2-11b-vision-instruct:free
 * - google/gemini-2.0-flash-exp:free / google/gemini-flash-1.5:free
 */

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string | Array<{ type: "text" | "image_url"; text?: string; image_url?: { url: string } }>;
}

export async function queryFreeLLM(
  messages: ChatMessage[],
  model: string = "meta-llama/llama-3.2-11b-vision-instruct:free"
) {
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "";

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : "https://omni-va.local",
      "X-Title": "Omni-VA Visual Agent",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter Free Tier API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}
