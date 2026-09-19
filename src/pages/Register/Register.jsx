import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/onboarding");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side */}
        <section className="hidden bg-slate-900 lg:flex lg:flex-col lg:justify-between">
          <div className="p-10">
            <Link
              to="/"
              className="font-google text-2xl font-semibold tracking-tight text-white"
            >
              Revyze
            </Link>
          </div>

          <div className="mx-auto w-full max-w-xl px-10 pb-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
              Your study journey starts here
            </p>

            <h1 className="mt-4 font-google text-5xl font-semibold tracking-tight text-white">
              Build a study plan that works for you.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
              Tell Revyze about your courses, exams, study habits, and
              learning goals. We'll use that information to help you focus on
              what matters most.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-indigo-400" />
                <span className="text-slate-300">
                  Personalized revision planning
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-indigo-400" />
                <span className="text-slate-300">
                  Track your progress and weak areas
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-indigo-400" />
                <span className="text-slate-300">
                  Get academic support when you need it
                </span>
              </div>
            </div>
          </div>

          <div className="px-10 py-6">
            <p className="text-sm text-slate-500">
              © 2026 Revyze. Built to help students study with purpose.
            </p>
          </div>
        </section>

        {/* Right side */}
        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Link
                to="/"
                className="font-google text-2xl font-semibold tracking-tight text-slate-900"
              >
                Revyze
              </Link>
            </div>

            <div>
              <p className="text-sm font-semibold text-indigo-600">
                Get started
              </p>

              <h2 className="mt-2 font-google text-3xl font-semibold tracking-tight text-slate-900">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Start building your personalized revision experience.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full name
                </label>

                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Create my account
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 transition hover:text-indigo-700"
              >
                Log in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;