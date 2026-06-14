import "dotenv/config";
import express from "express";
import cors from "cors";
import { supabase } from "./lib/supabase.js";
import multer from "multer";
import fs from "fs";
import { geminiModel } from "./lib/gemini.js";
import { groq } from "./lib/groq.js";
import { mailer } from "./lib/nodemailer.js";
import { resend } from "./lib/resend.js";

const app = express();

app.use(cors());
app.use(express.json());

// READ
app.get("/read", async (_, res) => {
  const { data } = await supabase.from("people").select("*");
  res.json(data);
});

// CREATE
app.post("/create", async (req, res) => {
  await supabase.from("people").insert({ name: req.body.name });
  res.json({ success: true });
});

// UPDATE (hardcoded example: updates name where id = 1)
app.put("/update", async (req, res) => {
  await supabase.from("people").update({ name: req.body.name }).eq("id", 1);
  res.json({ success: true });
});

// DELETE (delete by name)
app.delete("/delete", async (req, res) => {
  await supabase.from("people").delete().eq("id", req.body.id);
  res.json({ success: true });
});

// Nodemailer email
app.post("/mail", async (req, res) => {
  await mailer.sendMail({
    from: process.env.EMAIL,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
  });

  res.json({ success: true });
});

// Resend email
app.post("/resend", async (req, res) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
  });

  res.json({ success: true });
});

// Gemini
app.post("/gemini", async (req, res) => {
  const result = await geminiModel.generateContent(req.body.prompt);
  res.json({ text: result.response.text() });
});

// Groq
app.post("/groq", async (req, res) => {
  const chat = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: req.body.prompt }],
  });

  res.json({ text: chat.choices[0].message.content });
});

// const toBase64 = (p) => fs.readFileSync(p).toString("base64");

// // GEMINI VISION
// app.post("/gemini", upload.single("image"), async (req, res) => {
//   const result = await geminiModel.generateContent([
//     "Describe this image",
//     {
//       inlineData: {
//         data: toBase64(req.file.path),
//         mimeType: req.file.mimetype,
//       },
//     },
//   ]);

//   res.json({ text: result.response.text() });
// });

// // GROQ VISION
// app.post("/groq", upload.single("image"), async (req, res) => {
//   const r = await groq.chat.completions.create({
//     model: "meta-llama/llama-4-scout-17b-16e-instruct",
//     messages: [
//       {
//         role: "user",
//         content: [
//           { type: "text", text: "Describe this image" },
//           {
//             type: "image_url",
//             image_url: {
//               url: `data:${req.file.mimetype};base64,${toBase64(req.file.path)}`,
//             },
//           },
//         ],
//       },
//     ],
//   });

//   res.json({ text: r.choices[0].message.content });
// });

app.listen(5000);