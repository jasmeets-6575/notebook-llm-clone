import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    const t = text.trim();
    if (!t) return;
    onSend(t);
    setText("");
  };

  return (
    <div className="p-4 border-t border-gray-200 flex">
      <input
        className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
        placeholder="Ask your question…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <button
        onClick={send}
        className="px-4 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition"
      >
        Send
      </button>
    </div>
  );
}
