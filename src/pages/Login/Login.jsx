import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50">
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
              Welcome back
            </p>

            <h1 className="mt-4 font-google text-5xl font-semibold tracking-tight text-white">
              Pick up where you left off.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
              Continue your study journey, practice what you've learned, and
              let Revyze help you decide what to focus on next.
            </p>
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
            {/* Mobile logo */}
            <div className="mb-10 lg:hidden">
              <Link
                to="/"
                className="font-google text-2xl font-semibold tracking-tight text-slate-900"
              >
                Revyze
              </Link>
            </div>

            {/* Heading */}
            <div>
              <p className="text-sm font-semibold text-indigo-600">
                Welcome back
              </p>

              <h2 className="mt-2 font-google text-3xl font-semibold tracking-tight text-slate-900">
                Log in to Revyze
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Continue your personalized study experience.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Log in
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Register link */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 transition hover:text-indigo-700"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;