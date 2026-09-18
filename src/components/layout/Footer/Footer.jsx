import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">

          {/* Brand */}
          <div className="max-w-sm">
            <Link
              to="/"
              className="font-google text-2xl font-semibold tracking-tight text-slate-900"
            >
              Revyze
            </Link>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Personalized revision planning and academic support for
              university students.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-2">

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Product
              </h3>

              <div className="mt-4 space-y-3">
                <a
                  href="#how-it-works"
                  className="block text-sm text-slate-500 transition hover:text-slate-900"
                >
                  How it works
                </a>

                <a
                  href="#features"
                  className="block text-sm text-slate-500 transition hover:text-slate-900"
                >
                  Features
                </a>

                <a
                  href="#"
                  className="block text-sm text-slate-500 transition hover:text-slate-900"
                >
                  Academic Support
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Account
              </h3>

              <div className="mt-4 space-y-3">
                <Link
                  to="/login"
                  className="block text-sm text-slate-500 transition hover:text-slate-900"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="block text-sm text-slate-500 transition hover:text-slate-900"
                >
                  Get started
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-500">
            © 2026 Revyze. Built to help students study with purpose.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;