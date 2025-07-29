import React, {
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import UploadingLoader from "./UploadingLoader";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export default forwardRef(function PDFViewer({ file }, ref) {
  const [numPages, setNumPages]     = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError]           = useState(null);

  useImperativeHandle(ref, () => ({
    goToPage: (n) => setPageNumber(n),
  }));

  const docFile =
    file instanceof File
      ? file
      : { url: file, withCredentials: false };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setError(null);
  };

  const onDocumentLoadError = (err) => {
    console.error("PDF load error:", err);
    setError(err.message);
  };

  const goPrev = () => setPageNumber((p) => Math.max(p - 1, 1));
  const goNext = () => setPageNumber((p) => Math.min(p + 1, numPages));

  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <UploadingLoader progress={100} />
        <p className="ml-4">Loading PDF…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden min-h-0">
      <div className="flex-1 overflow-auto p-4 bg-gray-50 min-h-0">
        {error ? (
          <p className="text-center text-red-500">
            Failed to load PDF: {error}
          </p>
        ) : (
          <Document
            file={docFile}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<UploadingLoader progress={100} />}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading={null}
            />
          </Document>
        )}
      </div>

      {/* pagination */}
      <div className="grid grid-cols-3 items-center p-[17px] bg-white border-t border-gray-300">
        <button
          onClick={goPrev}
          className={`justify-self-start px-4 py-2 bg-purple-600 text-white rounded-lg shadow font-medium hover:bg-purple-700 hover:shadow-lg transition ${
            pageNumber <= 1 ? "invisible" : ""
          }`}
        >
          Prev
        </button>

        <div className="justify-self-center text-sm text-gray-600">
          Page {pageNumber} of {numPages ?? "?"}
        </div>

        <button
          onClick={goNext}
          className={`justify-self-end px-4 py-2 bg-purple-600 text-white rounded-lg shadow font-medium hover:bg-purple-700 hover:shadow-lg transition ${
            pageNumber >= numPages ? "invisible" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
});
