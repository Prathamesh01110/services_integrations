import { useState } from "react";
import { Resend } from "resend";

const resend = new Resend("YOUR_API_KEY");

export default function ResendEmail() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  async function sendMail() {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "receiver@gmail.com", // hardcoded email
      subject,
      html: body,
    });

    alert("Sent");
  }

  return (
    <>
      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <input
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <button onClick={sendMail}>
        Send Email
      </button>
    </>
  );
}