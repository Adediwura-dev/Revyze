import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="bg-slate-900 py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500">
          <Sparkles size={24} className="text-white" />
        </div>

        <h2 className="mt-6 font-google text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ready to make your study time count?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Build a revision plan around what you actually need to learn,
          practice your weak areas, and keep track of your progress with
          Revyze.
        </p>

        <div className="mt-8">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Get started with Revyze
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FinalCTA;