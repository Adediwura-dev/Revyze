import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Small Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2">
            <Sparkles size={16} className="text-indigo-600" />

            <span className="text-sm font-medium text-indigo-700">
              Personalized academic support
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-google text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Study smarter.
            <br />
            <span className="text-indigo-600">
              Know what to study next.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            A personalized revision planner that helps university students
            organize their courses, focus on weak areas, practice what they
            have learned, and stay prepared for their exams.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
            >
              Start studying smarter
              <ArrowRight size={18} />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
            >
              See how it works
            </a>
          </div>

          {/* Supporting points */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-slate-500 sm:flex-row sm:gap-6">
            
            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-green-600" />
              Personalized revision
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-green-600" />
              Practice & progress tracking
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-green-600" />
              AI academic support
            </div>

          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/50">
            
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              
              {/* Fake Dashboard Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Good morning
                  </p>

                  <h2 className="font-google text-xl font-semibold text-slate-900">
                    Your study plan
                  </h2>
                </div>

                <div className="hidden rounded-lg bg-indigo-100 px-3 py-2 text-sm font-medium text-indigo-700 sm:block">
                  6 days until your next exam
                </div>
              </div>

              {/* Dashboard Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="text-sm text-slate-500">
                    Today's revision
                  </p>

                  <p className="mt-2 font-google text-2xl font-semibold text-slate-900">
                    2 topics
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    1h 30min planned
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="text-sm text-slate-500">
                    Focus area
                  </p>

                  <p className="mt-2 font-google text-2xl font-semibold text-slate-900">
                    Data Structures
                  </p>

                  <p className="mt-1 text-sm text-amber-600">
                    Needs attention
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="text-sm text-slate-500">
                    Progress
                  </p>

                  <p className="mt-2 font-google text-2xl font-semibold text-slate-900">
                    68%
                  </p>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[68%] rounded-full bg-indigo-600" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;