import { useEffect, useState } from "react";
import { ArrowRight, FileText, Plus, File, FileSpreadsheet, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { apiClient } from "../../../api/client";

const formatFileSize = (bytes) => {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const getFileIcon = (filename) => {
  const ext = filename?.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return <FileText size={20} className="text-rose-600" />;
  if (ext === "doc" || ext === "docx") return <File size={20} className="text-blue-600" />;
  if (ext === "ppt" || ext === "pptx") return <FileSpreadsheet size={20} className="text-amber-600" />;
  return <FileText size={20} className="text-indigo-600" />;
};

const StudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentMaterials = async () => {
      try {
        const res = await apiClient.get("/materials");
        setMaterials((res.data || []).slice(0, 3));
      } catch {
        setMaterials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMaterials();
  }, []);

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-google text-2xl font-semibold tracking-tight text-slate-900">
            My study materials
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your notes and learning materials in one place.
          </p>
        </div>

        <Link
          to="/materials"
          className="hidden items-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 sm:flex"
        >
          View all
          <ArrowRight size={16} />
        </Link>
      </div>

      {loading ? (
        <div className="mt-5 flex items-center justify-center rounded-3xl border border-slate-200 bg-white p-8">
          <Loader2 size={24} className="animate-spin text-indigo-600" />
        </div>
      ) : materials.length === 0 ? (
        <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-8 sm:p-10">
          <div className="mx-auto flex max-w-lg flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <FileText size={26} className="text-slate-500" />
            </div>

            <h3 className="mt-5 font-google text-xl font-semibold text-slate-900">
              No study materials yet
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Add your lecture notes, slides, or PDFs and start building your
              personalized study experience.
            </p>

            <Link
              to="/materials"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Plus size={17} />
              Add study material
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {materials.map((item) => (
            <Link
              key={item.id}
              to="/materials"
              className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-sm"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50">
                {getFileIcon(item.originalFilename)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {item.originalFilename}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  {formatFileSize(item.fileSize)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Link
        to="/materials"
        className="mt-4 flex w-full items-center justify-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 sm:hidden"
      >
        View all
        <ArrowRight size={16} />
      </Link>
    </section>
  );
};

export default StudyMaterials;
