// src/ui‑components/DocumentInfoCard.jsx
import { FiFileText, FiX } from "react-icons/fi";

export default function DocumentInfoCard({ onClose }) {
  return (
    <div className="relative p-6 bg-purple-50 rounded-lg shadow-md">
      <button
        onClick={onClose}
        className="absolute cursor-pointer bg-white p-2 shadow-md rounded-full top-3 right-3 text-purple-500 hover:text-purple-700"
      >
        <FiX size={20} />
      </button>

      <div className="flex items-center mb-4">
        <div className="bg-purple-100 p-2 rounded-full mr-3">
          <FiFileText className="text-purple-600 text-2xl" />
        </div>
        <h2 className="text-xl font-semibold text-purple-900">
          Your document is ready!
        </h2>
      </div>
      <p className="text-purple-700 mb-3">
        You can now ask questions about your document. For example:
      </p>
      <ul className="list-disc pl-4 space-y-1 text-purple-700">
        <li>"What is the main topic of this document?"</li>
        <li>"Can you summarize the key points?"</li>
        <li>"What are the conclusions or recommendations?"</li>
      </ul>
    </div>
  );
}
