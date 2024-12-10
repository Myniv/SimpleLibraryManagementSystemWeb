import axios from "axios";
import { useState } from "react";

const ReportFormIFrame = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filename, setFileName] = useState("");

  const handleGenerateReport = async () => {
    setIsLoading(true);
    setError(null);
    setPdfFile(null);
    try {
      const response = await axios.get(
        "http://localhost:5238/api/Books/overdue-report",
        {
          responseType: "blob",
        }
      );

      //ToGetFileName from backend
      const contentDisposition = response.headers.get("content-disposition");
      let tempfilename = "document.pdf"; // default filename
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        );

        if (filenameMatch && filenameMatch[1]) {
          tempfilename = filenameMatch[1].replace(/['"]/g, "");

          setFileName(tempfilename);
        }
      }
      //*** */

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfFile(pdfUrl);
    } catch (err) {
      setError(`Gagal menghasilkan laporan. Silakan coba lagi.`);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (pdfFile) {
      const link = document.createElement("a");
      link.href = pdfFile;
      link.setAttribute(
        "download",
        // `Laporan_${pdfFile?.startDate}_to_${pdfFile?.endDate}.pdf`
        filename
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  return (
    <div className="container">
      <h4>Overdue Book Report</h4>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="text-left mb-3">
        <button
          className="btn btn-primary me-2"
          onClick={handleGenerateReport}
          disabled={isLoading}
        >
          {isLoading ? "Menghasilkan Laporan..." : "Lihat Laporan"}
        </button>

        {pdfFile && (
          <button className="btn btn-success" onClick={handleDownloadPDF}>
            Unduh PDF
          </button>
        )}
      </div>

      {/* Preview PDF */}

      {pdfFile && (
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            src={pdfFile}
            width="100%"
            height="500"
            className="embed-responsive-item"
          >
            Browser Anda tidak mendukung tampilan PDF.
          </iframe>
        </div>
      )}
    </div>
  );
};

export default ReportFormIFrame;
