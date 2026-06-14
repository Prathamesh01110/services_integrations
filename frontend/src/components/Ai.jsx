import { useState } from "react";

export default function AI() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");

  async function runGemini() {
    const res = await fetch("http://localhost:5000/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    setOutput((await res.json()).text);
  }

  async function runGroq() {
    const res = await fetch("http://localhost:5000/groq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    setOutput((await res.json()).text);
  }

  return (
    <div>
      <textarea onChange={(e) => setPrompt(e.target.value)} />

      <button onClick={runGemini}>Gemini</button>
      <button onClick={runGroq}>Groq</button>

      <p>{output}</p>
    </div>
  );
}