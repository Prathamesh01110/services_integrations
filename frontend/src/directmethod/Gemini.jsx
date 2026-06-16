import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");

export default function Gemini() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  async function ask() {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);

    setAnswer(result.response.text());
  }

  return (
    <>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={ask}>Ask Gemini</button>

      <p>{answer}</p>
    </>
  );
}