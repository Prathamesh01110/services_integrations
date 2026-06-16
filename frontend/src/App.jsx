import { useEffect, useState } from "react";
import Email from "./components/Email";
import AI from "./components/Ai";
import GroqAI from "./directmethod/Groq";
import Resend from "./directmethod/Resend";
import ResendEmail from "./directmethod/Resend";

export default function App() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");

  async function fetchPeople() {
    const res = await fetch("http://localhost:5000/read");
    const data = await res.json();
    setPeople(data);
  }

  async function addPerson() {
    await fetch("http://localhost:5000/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchPeople();
  }

  async function updatePerson() {
    await fetch("http://localhost:5000/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    fetchPeople();
  }

  async function deletePerson(id) {
    await fetch("http://localhost:5000/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });
    fetchPeople();
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <button onClick={addPerson}>Add</button>
      <button onClick={updatePerson}>Update (id=1)</button>

      {people.map((p) => (
        <div key={p.id}>
          {p.name}
          <button onClick={() => deletePerson(p.id)}>Delete</button>
        </div>
      ))}


      <hr />
      <ResendEmail/>
      <hr />
      <GroqAI/>
    </div>
  );
}