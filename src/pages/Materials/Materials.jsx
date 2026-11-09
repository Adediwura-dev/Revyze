import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  FileText,
  Plus,
  Upload,
  X,
  File,
  Download,
  Trash2,
  Loader2,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";
import { Link } from "react-router-dom";
import { apiClient } from "../../api/client";

const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const formatDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getFileIcon = (filename) => {
  const ext = filename?.split(".").pop()?.toLowerCase();
  if (ext === "pdf") {
    return <FileText size={22} className="text-rose-600" />;
  }
  if (ext === "doc" || ext === "docx") {
    return <File size={22} className="text-blue-600" />;
  }
  if (ext === "ppt" || ext === "pptx") {
    return <FileSpreadsheet size={22} className="text-amber-600" />;
  }
  return <FileText size={22} className="text-indigo-600" />;
};

const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fileInputRef = useRef(null);

  const loadMaterials = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/materials");
      setMaterials(res.data || []);
    } catch (err) {
      setErrorMessage(err.message || "Failed to load study materials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  const handleOpenUpload = () => {
    setErrorMessage("");
    setSelectedFile(null);
    setIsUploadOpen(true);
  };

  const handleCloseUpload = () => {
    if (isUploading) return;
    setIsUploadOpen(false);
    setSelectedFile(null);
    setErrorMessage("");
  };

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setErrorMessage("");
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await apiClient.upload("/materials/upload", formData);
      if (response?.data) {
        setMaterials((prev) => [response.data, ...prev]);
        handleCloseUpload();
      }
    } catch (err) {
      setErrorMessage(err.message || "Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (material) => {
    try {
      const token = localStorage.getItem("revyze_token");
      const url = `${import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1"}/materials/${material.id}/download`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = material.originalFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      alert("Could not download file: " + err.message);
    }
  };

  const handleDelete = async (materialId) => {
    if (!window.confirm("Are you sure you want to delete this study material?")) {
      return;
    }

    setDeletingId(materialId);
    try {
      await apiClient.delete(`/materials/${materialId}`);
      setMaterials((prev) => prev.filter((m) => m.id !== materialId));
    } catch (err) {
      alert("Failed to delete study material: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to dashboard
          </Link>

          <Link
            to="/dashboard"
            className="font-google text-2xl font-semibold tracking-tight text-slate-900"
          >
            Revyze
          </Link>
        </header>

        {/* Page heading */}
        <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              Your study space
            </p>

            <h1 className="mt-2 font-google text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              My study materials
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
              Keep your notes, slides, PDFs, and other learning materials in
              one place.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenUpload}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add study material
          </button>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="mt-16 flex flex-col items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-indigo-600" />
            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading your study materials...
            </p>
          </div>
        ) : materials.length === 0 ? (
          /* Empty state */
          <section className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 sm:px-10">
            <div className="mx-auto flex max-w-xl flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
                <FileText size={30} className="text-indigo-600" />
              </div>

              <h2 className="mt-6 font-google text-2xl font-semibold tracking-tight text-slate-900">
                No study materials yet
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                Upload your first study material and let Revyze help you
                understand it, practice it, and turn it into a personalized
                revision experience.
              </p>

              <button
                type="button"
                onClick={handleOpenUpload}
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <Upload size={18} />
                Upload material
              </button>

              <p className="mt-4 text-xs text-slate-400">
                PDFs, PowerPoint (.ppt, .pptx), and Word documents (.doc, .docx) are supported.
              </p>
            </div>
          </section>
        ) : (
          /* Materials Grid */
          <section className="mt-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {materials.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                        {getFileIcon(item.originalFilename)}
                      </div>

                      <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        {item.status || "Ready"}
                      </span>
                    </div>

                    <h3
                      className="mt-4 font-semibold text-slate-900 truncate"
                      title={item.originalFilename}
                    >
                      {item.originalFilename}
                    </h3>

                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                      <span>{formatFileSize(item.fileSize)}</span>
                      <span>•</span>
                      <span>Added {formatDate(item.createdAt)}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => handleDownload(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 transition hover:text-indigo-800"
                    >
                      <Download size={14} />
                      Download
                    </button>

                    <button
                      type="button"
                      disabled={deletingId === item.id}
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 transition hover:text-red-600 disabled:opacity-50"
                      title="Delete material"
                    >
                      {deletingId === item.id ? (
                        <Loader2 size={14} className="animate-spin text-red-600" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            onClick={handleCloseUpload}
            className="absolute inset-0 bg-slate-900/40"
            aria-label="Close upload window"
          />

          <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-600">
                  Add material
                </p>

                <h2 className="mt-1 font-google text-2xl font-semibold text-slate-900">
                  Upload a study material
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Choose a lecture note, PDF, or slide deck to add to your study space.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseUpload}
                disabled={isUploading}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {errorMessage && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.ppt,.pptx,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />

            {!selectedFile ? (
              <button
                type="button"
                onClick={handleChooseFile}
                className="mt-6 flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 px-6 py-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <Upload size={22} className="text-indigo-600" />
                </div>

                <p className="mt-4 text-sm font-semibold text-slate-900">
                  Choose a file
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  PDF, PowerPoint, or Word document (max 25MB)
                </p>
              </button>
            ) : (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
                    {getFileIcon(selectedFile.name)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {selectedFile.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>

                  {!isUploading && (
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-slate-700"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCloseUpload}
                disabled={isUploading}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!selectedFile || isUploading}
                onClick={handleUploadSubmit}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isUploading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload material"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Materials;
