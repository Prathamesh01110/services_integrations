import { useState } from "react";

export default function Email() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  async function sendMail() {
    await fetch("http://localhost:5000/mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, text }),
    });
  }

  async function sendResend() {
    await fetch("http://localhost:5000/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, text }),
    });
  }

  return (
    <div>
      <input placeholder="to" onChange={(e) => setTo(e.target.value)} />
      <input placeholder="subject" onChange={(e) => setSubject(e.target.value)} />
      <input placeholder="text" onChange={(e) => setText(e.target.value)} />

      <button onClick={sendMail}>Send Nodemailer</button>
      <button onClick={sendResend}>Send Resend</button>
    </div>
  );
}