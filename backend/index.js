import "dotenv/config";
import express from "express";
import cors from "cors";
import { supabase } from "./lib/supabase.js";

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


// DELETE (delete by name)
app.delete("/delete", async (req, res) => {
  await supabase.from("people").delete().eq("id", req.body.id);
  res.json({ success: true });
});

app.listen(5000);
