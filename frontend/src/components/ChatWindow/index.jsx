import { useState, useRef, useEffect } from "react";
import DocumentInfoCard from "../../ui-components/DocumentInfoCard";

export default function ChatWindow({ messages, onJumpToPage }) {
  const [showInfo, setShowInfo] = useState(true);
  const containerRef = useRef();

  // auto-scroll when messages update
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* info card */}
      {showInfo && (
        <div className="p-4 border-b border-gray-200">
          <DocumentInfoCard onClose={() => setShowInfo(false)} />
        </div>
      )}

      {/* messages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                msg.from === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p>{msg.text}</p>
              {msg.citations?.map((c, j) => (
                <button
                  key={j}
                  onClick={() => onJumpToPage(c.page)}
                  className="mt-2 text-sm text-purple-600 underline"
                >
                  Page {c.page}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
