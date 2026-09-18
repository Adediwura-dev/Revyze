import {
  Brain,
  BookOpenCheck,
  BarChart3,
  MessageCircle,
  CalendarClock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Personalized Revision",
      description:
        "Get revision recommendations based on your exams, weak topics, study history, and available study time.",
    },
    {
      icon: BookOpenCheck,
      title: "Smart Practice",
      description:
        "Practice what you have learned with quizzes designed to help you identify what you understand and what needs more work.",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description:
        "Monitor your topic mastery, quiz performance, completed revision sessions, and overall academic progress.",
    },
    {
      icon: MessageCircle,
      title: "AI Academic Support",
      description:
        "Ask questions, request explanations, and get conversational support while working through difficult academic concepts.",
    },
    {
      icon: CalendarClock,
      title: "Exam & Deadline Awareness",
      description:
        "Keep upcoming exams and academic deadlines connected to your revision priorities so important dates don't get overlooked.",
    },
  ];

  return (
    <section id="features" className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Features
          </p>

          <h2 className="mt-3 font-google text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Everything you need to study with a clear plan.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Revyze brings planning, practice, progress tracking, and academic
            support together in one personalized study experience.
          </p>
        </div>

        {/* Main Recommendation Feature */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">

            {/* Left Content */}
            <div className="p-8 sm:p-10 lg:p-14">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100">
                <Sparkles size={24} className="text-indigo-600" />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Your next best study session
              </p>

              <h3 className="mt-3 font-google text-3xl font-semibold tracking-tight text-slate-900">
                What should I study now?
              </h3>

              <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
                Revyze combines your exam schedule, topic mastery, practice
                results, and revision history to help you decide what deserves
                your attention next.
              </p>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
                Study based on what matters most
                <ArrowRight size={17} />
              </div>
            </div>

            {/* Recommendation Preview */}
            <div className="bg-slate-100 p-6 sm:p-10 lg:p-12">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">
                      Recommended for you
                    </p>

                    <h4 className="mt-1 font-google text-xl font-semibold text-slate-900">
                      Recursion
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      Data Structures
                    </p>
                  </div>

                  <div className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                    Needs attention
                  </div>
                </div>

                {/* Mastery */}
                <div className="mt-7">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">
                      Topic mastery
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      48%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[48%] rounded-full bg-indigo-600" />
                  </div>
                </div>

                {/* Reasons */}
                <div className="mt-7 space-y-3">

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="text-sm text-slate-500">
                      Next exam
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      6 days
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="text-sm text-slate-500">
                      Last practiced
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      4 days ago
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="text-sm text-slate-500">
                      Previous quiz
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      5 / 10
                    </span>
                  </div>

                </div>

                {/* Recommendation */}
                <div className="mt-6 rounded-xl bg-indigo-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                    Recommended session
                  </p>

                  <div className="mt-1 flex items-center justify-between gap-4">
                    <span className="font-google font-semibold text-slate-900">
                      Revise Recursion
                    </span>

                    <span className="text-sm font-semibold text-indigo-600">
                      30 min
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-200/50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                  <Icon size={21} className="text-indigo-600" />
                </div>

                <h3 className="mt-5 font-google text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;