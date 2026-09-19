import { ArrowRight, Compass, Sparkles } from "lucide-react";

const RecommendedStudy = () => {
  return (
    <section className="mt-8">
      <div>
        <p className="text-sm font-semibold text-indigo-600">
          Personalized guidance
        </p>

        <h2 className="mt-1 font-google text-2xl font-semibold tracking-tight text-slate-900">
          What should I study now?
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Revyze will help you decide as it learns how you study.
        </p>
      </div>

      <div className="mt-5 overflow-hidden rounded-3xl bg-slate-900 p-6 sm:p-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20">
              <Compass size={24} className="text-indigo-300" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-indigo-300" />

                <p className="text-sm font-semibold text-indigo-300">
                  Your first recommendation
                </p>
              </div>

              <h3 className="mt-2 font-google text-xl font-semibold text-white sm:text-2xl">
                Add a study material to get started
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Once Revyze has something to work with, it can help you
                identify what to focus on, create practice sessions, and
                recommend what to study next.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Add material
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecommendedStudy;