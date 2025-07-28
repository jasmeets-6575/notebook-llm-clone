import React from "react";

export default function UploadingLoader({ progress = 100 }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center bg-gray-50 p-8">
      <div className="flex items-center w-full max-w-xl space-x-4">
        <div className="animate-spin h-8 w-8 border-4 border-gray-200 border-t-purple-600 rounded-full"></div>
        <span className="text-xl font-medium text-purple-600">
          Uploading PDF
        </span>
        <span className="ml-auto text-xl font-bold text-purple-600">
          {progress}%
        </span>
      </div>

      <div className="w-full max-w-xl h-2 bg-purple-200 rounded-full overflow-hidden mt-4">
        <div
          className="h-full bg-purple-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
