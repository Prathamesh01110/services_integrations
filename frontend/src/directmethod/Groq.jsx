import { useState } from "react";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "Your api key",
  dangerouslyAllowBrowser: true,
});

export default function GroqAI() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  async function ask() {
    const chat = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{role: "user",content: prompt,},],
    });

    setAnswer(chat.choices[0].message.content);
  }

  return (
    <>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask anything..."
      />

      <button onClick={ask}>Ask Groq</button>

      <p>{answer}</p>
    </>
  );
}