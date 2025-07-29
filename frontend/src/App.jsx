import React, { useState, useRef } from "react";
import FileUploader from "./components/FileUploader";
import PDFViewer    from "./components/PDFViewer";
import ChatWindow   from "./components/ChatWindow";
import ChatInput    from "./components/ChatInput";

export default function App() {
  const [pdfSrc, setPdfSrc]   = useState(null);
  const [messages, setMessages] = useState([]);
  const pdfRef = useRef();

  const handleFileSelect = (src) => setPdfSrc(src);

  const handleSend = (text) => {
    setMessages((msgs) => [...msgs, { from: "user", text }]);
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: `Echo: "${text}"`, citations: [] },
      ]);
    }, 500);
  };

  const jumpToPage = (page) => pdfRef.current?.goToPage(page);

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-white shadow-md border-b-2 border-gray-100">
        <h1 className="text-2xl font-bold">NotebookLLM Clone</h1>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {!pdfSrc ? (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <FileUploader onFileUpload={handleFileSelect} />
          </div>
        ) : (
          <div className="flex flex-1">
            <div className="w-1/2 flex flex-col border-r border-gray-200">
              <ChatWindow messages={messages} onJumpToPage={jumpToPage} />
              <ChatInput onSend={handleSend} />
            </div>

            <div className="w-1/2 flex flex-col">
              <PDFViewer ref={pdfRef} file={pdfSrc} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
