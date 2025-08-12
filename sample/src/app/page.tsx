
"use client";
import { useState } from "react";
import { AuthProvider } from "../lib/AuthProvider";
// Gemini handled server-side via /api/gemini route

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Welcome to ChatGPT Mobile Clone!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      if (data.error) {
        setMessages(prev => [...prev, { role: 'system', content: 'Error: ' + data.error }]);
      } else {
        setMessages(prev => [...prev, { role: 'system', content: data.reply }]);
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'system', content: 'Network error contacting Gemini.' }]);
    }
    setLoading(false);
  };

  return (
    <AuthProvider>
      <div className="container-fluid min-vh-100 d-flex flex-column p-0" style={{ maxWidth: 480, margin: "0 auto", background: 'linear-gradient(180deg,#eef2f7,#ffffff)' }}>
        <header className="py-3 px-3 border-bottom bg-white d-flex align-items-center gap-2" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <span className="fw-bold text-primary">Gemini Chat</span>
          {loading && <span className="spinner-border spinner-border-sm text-secondary ms-auto" />}
        </header>
        <div className="flex-grow-1 overflow-auto p-3" style={{ background: "transparent" }}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`d-flex ${msg.role === "user" ? "justify-content-end" : "justify-content-start"} mb-2`}>
              <div
                className={`rounded px-3 py-2 shadow-sm ${msg.role === "user" ? "bg-primary text-white" : "bg-white border"}`}
                style={{
                  maxWidth: "80%",
                  color: msg.role === "system" ? "#222" : undefined,
                  background: msg.role === "system" ? "#fff" : undefined,
                  border: msg.role === "system" ? "1px solid #bbb" : undefined,
                  fontWeight: msg.role === "system" ? 500 : undefined
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <form className="d-flex p-3 border-top bg-white" style={{ boxShadow: "0 -2px 8px rgba(0,0,0,0.06)" }} onSubmit={e => { e.preventDefault(); handleSend(); }}>
          <input
            className="form-control me-2 rounded-pill"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
            autoFocus
            style={{ fontSize: "1.1rem" }}
          />
          <button className="btn btn-primary rounded-pill px-4" type="submit" disabled={loading || !input.trim()} style={{ fontWeight: 600 }}>
            {loading ? <span className="spinner-border spinner-border-sm" /> : "Send"}
          </button>
        </form>
      </div>
    </AuthProvider>
  );
}
