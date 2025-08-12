
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
    // TODO: Call tRPC/gemini API here
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setLoading(false);
  };

  return (
    <AuthProvider>
      <div className="container-fluid bg-light min-vh-100 d-flex flex-column justify-content-end p-0" style={{ maxWidth: 480, margin: "0 auto" }}>
        <div className="flex-grow-1 overflow-auto p-3" style={{ maxHeight: "80vh" }}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 text-${msg.role === "user" ? "end" : "start"}`}>
              <span className={`badge bg-${msg.role === "user" ? "primary" : "secondary"}`}>{msg.content}</span>
            </div>
          ))}
        </div>
        <form className="d-flex p-3 border-top bg-white" onSubmit={e => { e.preventDefault(); handleSend(); }}>
          <input
            className="form-control me-2"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <button className="btn btn-primary" type="submit" disabled={loading || !input.trim()}>
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </AuthProvider>
  );
}
