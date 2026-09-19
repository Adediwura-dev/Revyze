import { ArrowRight, Sparkles } from "lucide-react";

const WelcomeSection = () => {
  return (
    <section>
      <p className="text-sm font-semibold text-indigo-600">
        Your study space
      </p>

      <h1 className="mt-2 font-google text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Good morning, Bushra 👋
      </h1>

      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
        Let's make your next study session count.
      </p>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100">
              <Sparkles size={23} className="text-indigo-600" />
            </div>

            <div>
              <h2 className="font-google text-xl font-semibold text-slate-900 sm:text-2xl">
                Start with your study materials
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Upload your lecture notes, slides, or PDFs and Revyze will
                help you understand them, practice what you've learned, and
                keep track of your progress.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Add study material
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;