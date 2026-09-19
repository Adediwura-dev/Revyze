import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  FileText,
  MessageCircle,
  Sparkles,
} from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-8 sm:px-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link
            to="/"
            className="font-google text-2xl font-semibold tracking-tight text-slate-900"
          >
            Revyze
          </Link>

          <button
            type="button"
            onClick={handleContinue}
            className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            Skip for now
          </button>
        </header>

        {/* Main content */}
        <div className="flex flex-1 items-center justify-center py-16">
          <div className="w-full max-w-3xl">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
                <Sparkles size={28} className="text-indigo-600" />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Welcome to Revyze
              </p>

              <h1 className="mt-3 font-google text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Let's get you ready to study.
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Bring your study materials and Revyze will help you understand
                them, practice what you've learned, and keep track of your
                progress.
              </p>
            </div>

            {/* Quick start card */}
            <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-100">
                  <FileText size={27} className="text-indigo-600" />
                </div>

                <div className="flex-1">
                  <h2 className="font-google text-2xl font-semibold text-slate-900">
                    Start with your study material
                  </h2>

                  <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
                    Upload lecture notes, slides, PDFs, or other course
                    materials. Revyze can use them to help you study without
                    making you manually enter everything about your courses.
                  </p>

                  <button
                    type="button"
                    onClick={handleContinue}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Go to my study space
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* What Revyze can do */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <BookOpen size={20} className="text-indigo-600" />
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  Understand
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Get clear explanations and study from your materials.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <Sparkles size={20} className="text-indigo-600" />
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">Practice</h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Turn what you're learning into useful practice.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <MessageCircle size={20} className="text-indigo-600" />
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  Get support
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Ask questions whenever you get stuck.
                </p>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              You can add courses, exams, and other study details later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
