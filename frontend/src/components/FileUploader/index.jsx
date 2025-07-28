import React, { useState, useCallback } from "react";
import { FiUpload } from "react-icons/fi";
import { uploadPDF } from "../../api/upload";

export default function FileUploader({ onFileUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = useCallback(async (file) => {
    if (!file || file.type !== "application/pdf") return;
    setUploading(true);
    try {
      await uploadPDF(file, (pct) => setProgress(pct));
      onFileUpload(file); 
    } catch (err) {
      console.error(err);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, [onFileUpload]);

  const handleFiles = useCallback((files) => {
    handleUpload(files[0]);
  }, [handleUpload]);

  const onInputChange = (e) => handleFiles(e.target.files);

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      className={`flex items-center justify-center ${isDragging ? "bg-purple-50" : "bg-white"}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {uploading ? (
        <div className="p-8 text-center">
          <p className="font-semibold">Uploading… {progress}%</p>
          <div className="h-2 w-64 bg-gray-200 rounded mt-2 overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <label
          htmlFor="pdf-upload"
          className={`cursor-pointer min-w-[20rem] p-8 rounded-xl shadow-lg border ${
            isDragging ? "border-purple-400" : "border-gray-200"
          } hover:shadow-xl transition`}
        >
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={onInputChange}
          />
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <FiUpload className="text-purple-600 text-5xl" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-gray-700 font-semibold">
                {isDragging
                  ? "Drop your PDF here"
                  : "Click to select or drag your PDF here"}
              </p>
              <p className="text-sm text-gray-400">Up to 100 MB</p>
            </div>
          </div>
        </label>
      )}
    </div>
  );
}
