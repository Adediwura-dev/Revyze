import {
  TrendingUp,
  Target,
  Clock3,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

const ProgressPersonalization = () => {
  const topics = [
    {
      name: "Arrays",
      course: "Data Structures",
      progress: "82%",
      width: "82%",
    },
    {
      name: "Recursion",
      course: "Data Structures",
      progress: "48%",
      width: "48%",
    },
    {
      name: "Database Normalization",
      course: "Database Systems",
      progress: "71%",
      width: "71%",
    },
    {
      name: "Operating System Scheduling",
      course: "Operating Systems",
      progress: "63%",
      width: "63%",
    },
  ];

  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Progress & personalization
          </p>

          <h2 className="mt-3 font-google text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Your progress shapes what comes next.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Revyze learns from your revision activity and practice results to
            help you understand where you are improving and where you need to
            focus next.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">

          {/* Overall Progress */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100">
                <TrendingUp size={21} className="text-indigo-600" />
              </div>

              <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                <ArrowUpRight size={16} />
                12%
              </span>
            </div>

            <p className="mt-7 text-sm text-slate-500">
              Overall progress
            </p>

            <p className="mt-1 font-google text-4xl font-semibold text-slate-900">
              68%
            </p>

            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[68%] rounded-full bg-indigo-600" />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Your overall mastery has improved compared with your previous
              assessment period.
            </p>
          </div>

          {/* Study Time */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100">
              <Clock3 size={21} className="text-indigo-600" />
            </div>

            <p className="mt-7 text-sm text-slate-500">
              Study time this week
            </p>

            <p className="mt-1 font-google text-4xl font-semibold text-slate-900">
              6h 45m
            </p>

            {/* Simple Activity Bars */}
            <div className="mt-6 flex h-20 items-end gap-2">
              <div className="h-[35%] flex-1 rounded-t-md bg-indigo-100" />
              <div className="h-[55%] flex-1 rounded-t-md bg-indigo-200" />
              <div className="h-[45%] flex-1 rounded-t-md bg-indigo-200" />
              <div className="h-[75%] flex-1 rounded-t-md bg-indigo-400" />
              <div className="h-[90%] flex-1 rounded-t-md bg-indigo-500" />
              <div className="h-[60%] flex-1 rounded-t-md bg-indigo-300" />
              <div className="h-[30%] flex-1 rounded-t-md bg-indigo-100" />
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Your most active study day was Thursday.
            </p>
          </div>

          {/* Completed Sessions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
              <CheckCircle2 size={21} className="text-green-600" />
            </div>

            <p className="mt-7 text-sm text-slate-500">
              Completed sessions
            </p>

            <p className="mt-1 font-google text-4xl font-semibold text-slate-900">
              18
            </p>

            <div className="mt-5 flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[75%] rounded-full bg-green-500" />
              </div>

              <span className="text-sm font-semibold text-slate-700">
                75%
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              You've completed 18 of your 24 planned revision sessions.
            </p>
          </div>

        </div>

        {/* Topic Mastery */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">

          <div className="border-b border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <Target size={21} className="text-indigo-600" />

                  <h3 className="font-google text-xl font-semibold text-slate-900">
                    Topic mastery
                  </h3>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  See which topics are strong and which ones need more
                  attention.
                </p>
              </div>

              <span className="w-fit rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700">
                4 topics tracked
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">

            {topics.map((topic) => (
              <div
                key={topic.name}
                className="p-6 sm:px-8"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {topic.name}
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      {topic.course}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-slate-900">
                    {topic.progress}
                  </span>

                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{ width: topic.width }}
                  />
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default ProgressPersonalization;