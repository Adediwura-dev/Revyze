import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Brain,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Loader2,
  TrendingUp,
} from "lucide-react";
import { apiClient } from "../../api/client";

const Progress = () => {
  const [summary, setSummary] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const [sumRes, topRes] = await Promise.all([
          apiClient.get("/progress/summary"),
          apiClient.get("/progress/topics"),
        ]);
        setSummary(sumRes.data);
        setTopics(topRes.data || []);
      } catch (err) {
        setErrorMessage(err.message || "Failed to load progress analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const formatStudyTime = (minutes) => {
    if (!minutes || minutes === 0) return "0 mins";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} mins`;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8">
        {/* Navigation header */}
        <header className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to dashboard
          </Link>

          <Link
            to="/dashboard"
            className="font-google text-2xl font-semibold tracking-tight text-slate-900"
          >
            Revyze
          </Link>
        </header>

        {errorMessage && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-rose-50 px-5 py-4 text-sm text-rose-700">
            <AlertCircle size={20} className="shrink-0 text-rose-600" />
            <p className="flex-1">{errorMessage}</p>
          </div>
        )}

        {/* Heading */}
        <div className="mt-10">
          <p className="text-sm font-semibold text-indigo-600">Your Learning Analytics</p>
          <h1 className="mt-2 font-google text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Progress & Mastery
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Real-time insights on your revision consistency, topic retention, and practice milestones.
          </p>
        </div>

        {loading ? (
          <div className="mt-20 flex flex-col items-center justify-center py-16">
            <Loader2 size={36} className="animate-spin text-indigo-600" />
            <p className="mt-4 text-sm font-medium text-slate-500">
              Aggregating your study metrics...
            </p>
          </div>
        ) : (
          <main className="mt-8 space-y-8">
            {/* Summary Metrics Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Mastery % */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-400">
                    Average Mastery
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Award size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-google text-3xl font-bold text-slate-900">
                    {summary?.overallMasteryPercentage || 0}%
                  </span>
                  <span className="text-xs text-slate-500">curriculum retention</span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-500"
                    style={{ width: `${summary?.overallMasteryPercentage || 0}%` }}
                  />
                </div>
              </div>

              {/* Study Time */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-400">
                    Study Time Logged
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Clock size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-google text-3xl font-bold text-slate-900">
                    {formatStudyTime(summary?.totalStudyMinutes)}
                  </span>
                </div>
                <p className="mt-3 text-xs text-slate-400">
                  Across quiz sessions & active revisions
                </p>
              </div>

              {/* Quizzes Taken */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-400">
                    Quizzes Completed
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                    <Brain size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-google text-3xl font-bold text-slate-900">
                    {summary?.totalQuizzesTaken || 0}
                  </span>
                  <span className="text-xs text-slate-500">tests submitted</span>
                </div>
                <p className="mt-3 text-xs text-slate-400">
                  Active recall drills performed
                </p>
              </div>

              {/* Materials Uploaded */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-400">
                    Study Materials
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                    <BookOpen size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-google text-3xl font-bold text-slate-900">
                    {summary?.totalMaterials || 0}
                  </span>
                  <span className="text-xs text-slate-500">notes & slides</span>
                </div>
                <p className="mt-3 text-xs text-slate-400">
                  Stored in your revision library
                </p>
              </div>
            </div>

            {/* Topic Mastery Section */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-google text-xl font-bold text-slate-900">
                    Topic Breakdown & Mastery
                  </h2>
                  <p className="text-sm text-slate-500">
                    Spaced repetition tracking by subject
                  </p>
                </div>

                <Link
                  to="/practice"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  <Brain size={14} />
                  Take a Practice Quiz
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {topics.map((t) => {
                  let badgeStyle = "bg-amber-50 text-amber-700 border-amber-200";
                  let barColor = "bg-amber-500";
                  if (t.masteryPercentage >= 80) {
                    badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200";
                    barColor = "bg-emerald-500";
                  } else if (t.masteryPercentage >= 50) {
                    badgeStyle = "bg-indigo-50 text-indigo-700 border-indigo-200";
                    barColor = "bg-indigo-600";
                  }

                  return (
                    <div
                      key={t.topicId}
                      className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 transition hover:border-slate-200"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-400">
                              {t.courseName}
                            </span>
                            <span
                              className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${badgeStyle}`}
                            >
                              {t.status}
                            </span>
                          </div>
                          <h3 className="mt-1 text-base font-semibold text-slate-900">
                            {t.topicName}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-google text-lg font-bold text-slate-900">
                            {t.masteryPercentage}%
                          </span>
                          <Link
                            to="/practice"
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
                          >
                            Practice
                            <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                          className={`h-full transition-all duration-500 ${barColor}`}
                          style={{ width: `${t.masteryPercentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default Progress;
