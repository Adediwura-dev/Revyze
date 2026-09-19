import { useRef, useState } from "react";
import {
  ArrowLeft,
  FileText,
  Plus,
  Upload,
  X,
  File,
} from "lucide-react";
import { Link } from "react-router-dom";

const Materials = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleOpenUpload = () => {
    setIsUploadOpen(true);
  };

  const handleCloseUpload = () => {
    setIsUploadOpen(false);
    setSelectedFile(null);
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
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

        {/* Empty state */}
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
              PDFs, lecture notes, and slides will be supported.
            </p>
          </div>
        </section>
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Overlay */}
          <button
            type="button"
            onClick={handleCloseUpload}
            className="absolute inset-0 bg-slate-900/40"
            aria-label="Close upload window"
          />

          {/* Modal */}
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
                  Choose a lecture note, PDF, or slide deck to add to your
                  study space.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseUpload}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

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
                className="mt-7 flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 px-6 py-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <Upload size={22} className="text-indigo-600" />
                </div>

                <p className="mt-4 text-sm font-semibold text-slate-900">
                  Choose a file
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  PDF, PowerPoint, or Word document
                </p>
              </button>
            ) : (
              <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
                    <File size={21} className="text-indigo-600" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {selectedFile.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-slate-700"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            )}

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCloseUpload}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!selectedFile}
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Materials;