import { Activity, ArrowRight } from "lucide-react";

const RecentActivity = () => {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-google text-2xl font-semibold tracking-tight text-slate-900">
            Recent activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Keep track of what you've been working on.
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

      <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10">
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <Activity size={25} className="text-slate-500" />
          </div>

          <h3 className="mt-5 font-google text-xl font-semibold text-slate-900">
            Your activity will appear here
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Study sessions, practice attempts, and other learning activity
            will show up here as you use Revyze.
          </p>
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

export default RecentActivity;