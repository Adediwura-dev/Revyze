import { ArrowRight, FileText, Plus } from "lucide-react";

const StudyMaterials = () => {
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

        <button
          type="button"
          className="hidden items-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 sm:flex"
        >
          View all
          <ArrowRight size={16} />
        </button>
      </div>

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

          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Plus size={17} />
            Add study material
          </button>
        </div>
      </div>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 sm:hidden"
      >
        View all
        <ArrowRight size={16} />
      </button>
    </section>
  );
};

export default StudyMaterials;