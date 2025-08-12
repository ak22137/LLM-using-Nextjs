"use client";
import { useState } from "react";
import { AuthProvider } from "../lib/AuthProvider";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Welcome to ChatGPT Mobile Clone!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    // Add user message first
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    // Simulate bot response for demo
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "system", content: "(Gemini API response here)" }]);
      setLoading(false);
    }, 800);
  };

  return (
    <AuthProvider>
      <div className="container-fluid bg-gradient min-vh-100 d-flex flex-column justify-content-end p-0" style={{ maxWidth: 480, margin: "0 auto" }}>
        <div className="flex-grow-1 overflow-auto p-3" style={{ maxHeight: "80vh", background: "#f8fafc" }}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`d-flex ${msg.role === "user" ? "justify-content-end" : "justify-content-start"} mb-2`}>
              <div className={`rounded px-3 py-2 shadow-sm ${msg.role === "user" ? "bg-primary text-white" : "bg-white border"}`} style={{ maxWidth: "80%" }}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <form className="d-flex p-3 border-top bg-white" style={{ boxShadow: "0 -2px 8px rgba(0,0,0,0.03)" }} onSubmit={e => { e.preventDefault(); handleSend(); }}>
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
