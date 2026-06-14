import { useState } from "react";

export default function Vision() {
  const [file, setFile] = useState();
  const [out, setOut] = useState("");

  async function run(url) {
    const form = new FormData();
    form.append("image", file);

    const res = await fetch(`http://localhost:5000/${url}`, {
      method: "POST",
      body: form,
    });

    setOut((await res.json()).text);
  }

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={() => run("gemini-vision")}>Gemini</button>
      <button onClick={() => run("groq-vision")}>Groq</button>

      <p>{out}</p>
    </div>
  );
}