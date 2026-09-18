import {
  MessageCircle,
  Sparkles,
  User,
  ArrowRight,
} from "lucide-react";

const AcademicSupport = () => {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left Content */}
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100">
              <MessageCircle size={24} className="text-indigo-600" />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Academic support
            </p>

            <h2 className="mt-3 font-google text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Get help when you get stuck.
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Understanding a difficult topic shouldn't mean leaving your
              study session to search through countless websites. Ask Revyze
              for an explanation and continue learning where you are.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <span className="text-xs font-bold text-green-700">✓</span>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Ask questions naturally
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Ask about concepts in the same way you would ask a
                    classmate or tutor.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <span className="text-xs font-bold text-green-700">✓</span>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Learn through explanations
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Get explanations that help you understand a concept
                    instead of simply giving you an answer.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <span className="text-xs font-bold text-green-700">✓</span>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Keep your study context
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Your academic assistant is part of the wider Revyze study
                    experience.
                  </p>
                </div>
              </div>

            </div>

            <a
              href="#features"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
            >
              Explore Revyze features
              <ArrowRight size={17} />
            </a>
          </div>

          {/* Chat Preview */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-6">

            {/* Chat Header */}
            <div className="flex items-center gap-3 border-b border-slate-200 px-2 pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
                <Sparkles size={20} className="text-white" />
              </div>

              <div>
                <h3 className="font-google font-semibold text-slate-900">
                  Revyze Assistant
                </h3>

                <p className="text-xs text-slate-500">
                  Academic support
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-5 py-6">

              {/* User Message */}
              <div className="flex justify-end">
                <div className="flex max-w-[85%] items-start gap-3">

                  <div className="rounded-2xl rounded-tr-md bg-indigo-600 px-4 py-3 text-sm leading-6 text-white">
                    Can you explain recursion in a simple way?
                  </div>

                  <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 sm:flex">
                    <User size={17} className="text-slate-600" />
                  </div>

                </div>
              </div>

              {/* AI Message */}
              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                  <Sparkles size={17} className="text-indigo-600" />
                </div>

                <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-600 shadow-sm">
                  <p>
                    Think of recursion as a function solving a problem by
                    asking a smaller version of the same problem to help.
                  </p>

                  <p className="mt-3">
                    For example, imagine standing between two mirrors. You
                    see the same image repeated again and again. Each
                    reflection is like another call to the function.
                  </p>

                  <div className="mt-4 rounded-xl bg-slate-50 p-3">
                    <p className="font-semibold text-slate-800">
                      A recursive function needs:
                    </p>

                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• A base case to stop</li>
                      <li>• A recursive case to continue</li>
                    </ul>
                  </div>
                </div>

              </div>

            </div>

            {/* Input Preview */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2">
              <div className="flex-1 px-3 py-2 text-sm text-slate-400">
                Ask Revyze anything...
              </div>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white transition hover:bg-indigo-700"
                aria-label="Send message"
              >
                <ArrowRight size={17} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AcademicSupport;