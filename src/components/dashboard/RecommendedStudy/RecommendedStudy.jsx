import { useEffect, useState } from "react";
import { ArrowRight, Compass, Sparkles, Loader2, BookOpen, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { apiClient } from "../../../api/client";

const RecommendedStudy = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const res = await apiClient.get("/recommendations/current");
        setRecommendation(res?.data || null);
      } catch {
        setRecommendation(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, []);

  return (
    <section className="mt-8">
      <div>
        <p className="text-sm font-semibold text-indigo-600">
          Personalized guidance
        </p>

        <h2 className="mt-1 font-google text-2xl font-semibold tracking-tight text-slate-900">
          What should I study now?
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Revyze combines your exams, mastery scores, and revision history to prioritize your study time.
        </p>
      </div>

      {loading ? (
        <div className="mt-5 flex items-center justify-center rounded-3xl bg-slate-900 p-8 sm:p-12">
          <Loader2 size={28} className="animate-spin text-indigo-400" />
        </div>
      ) : !recommendation || !recommendation.hasRecommendation ? (
        /* Onboarding Fallback State */
        <div className="mt-5 overflow-hidden rounded-3xl bg-slate-900 p-6 sm:p-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20">
                <Compass size={24} className="text-indigo-300" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-indigo-300" />
                  <p className="text-sm font-semibold text-indigo-300">
                    Your first recommendation
                  </p>
                </div>

                <h3 className="mt-2 font-google text-xl font-semibold text-white sm:text-2xl">
                  {recommendation?.title || "Add a study material to get started"}
                </h3>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                  {recommendation?.description ||
                    "Once Revyze has something to work with, it can help you identify what to focus on, create practice sessions, and recommend what to study next."}
                </p>
              </div>
            </div>

            <Link
              to="/materials"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Add material
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      ) : (
        /* Dynamic Intelligent Recommendation Card */
        <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column: Context & Overview */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-600" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    Recommended for your next session
                  </span>
                </div>

                <h3 className="mt-3 font-google text-2xl font-semibold text-slate-900 sm:text-3xl">
                  {recommendation.topic}
                </h3>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  {recommendation.course}
                </p>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {recommendation.reason || "High priority based on your syllabus and current mastery score."}
                </p>
              </div>

              {/* Recommended Session Pill */}
              <div className="mt-6 rounded-2xl bg-indigo-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  Recommended revision session
                </p>

                <div className="mt-1 flex items-center justify-between gap-4">
                  <span className="font-google font-semibold text-slate-900">
                    {recommendation.recommendedSessionTitle || `Revise ${recommendation.topic}`}
                  </span>

                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                    <Clock size={15} />
                    {recommendation.recommendedDurationMinutes || 30} min
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Mastery & Metrics Breakdown */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">
                  Topic mastery
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {recommendation.masteryPercentage}%
                </span>
              </div>

              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                  style={{ width: `${Math.min(100, recommendation.masteryPercentage)}%` }}
                />
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-xs">
                  <span className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar size={16} className="text-slate-400" />
                    Next exam
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {recommendation.nextExamInDays ? `${recommendation.nextExamInDays} days` : "Upcoming"}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-xs">
                  <span className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock size={16} className="text-slate-400" />
                    Last practiced
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {recommendation.lastPracticedDaysAgo ? `${recommendation.lastPracticedDaysAgo} days ago` : "Recently"}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-xs">
                  <span className="flex items-center gap-2 text-sm text-slate-500">
                    <CheckCircle2 size={16} className="text-slate-400" />
                    Previous quiz
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {recommendation.previousQuizScore || "Pending"}
                  </span>
                </div>
              </div>

              <Link
                to="/materials"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Start study session
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecommendedStudy;
