import {
  CalendarDays,
  BookOpen,
  Brain,
  BarChart3,
  RefreshCw,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: CalendarDays,
      title: "Plan",
      description:
        "Add your courses, topics, exams, and available study time. The system builds a revision plan around your academic schedule.",
    },
    {
      number: "02",
      icon: BookOpen,
      title: "Study",
      description:
        "Follow focused revision sessions based on what you need to learn and how much time you have available.",
    },
    {
      number: "03",
      icon: Brain,
      title: "Practice",
      description:
        "Test your understanding with quizzes and practice activities instead of simply reading through your notes.",
    },
    {
      number: "04",
      icon: BarChart3,
      title: "Measure",
      description:
        "Track your scores, completed sessions, topic mastery, and overall academic progress.",
    },
    {
      number: "05",
      icon: RefreshCw,
      title: "Adapt",
      description:
        "Your results influence what you should revise next, helping the system continuously adjust your priorities.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            How it works
          </p>

          <h2 className="mt-3 font-google text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Your study plan gets smarter as you study.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            The system uses your academic information and study activity to
            help you decide what deserves your attention next.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-200/50"
              >
                {/* Number */}
                <span className="text-sm font-semibold text-indigo-600">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100">
                  <Icon size={21} className="text-indigo-600" />
                </div>

                {/* Content */}
                <h3 className="mt-5 font-google text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;