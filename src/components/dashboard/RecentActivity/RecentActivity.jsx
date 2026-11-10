import { useEffect, useState } from "react";
import { Activity, ArrowRight, FileText, BookOpen, Sparkles, Loader2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { apiClient } from "../../../api/client";

const formatRelativeTime = (isoString) => {
  if (!isoString) return "";
  const now = new Date();
  const date = new Date(isoString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const getActivityIcon = (type) => {
  if (type === "MATERIAL_UPLOAD") {
    return <FileText size={18} className="text-indigo-600" />;
  }
  if (type === "STUDY_SESSION") {
    return <BookOpen size={18} className="text-emerald-600" />;
  }
  if (type === "QUIZ_COMPLETED") {
    return <Sparkles size={18} className="text-amber-600" />;
  }
  return <Activity size={18} className="text-indigo-600" />;
};

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await apiClient.get("/activity/recent?limit=5");
        setActivities(res?.data || []);
      } catch {
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-google text-2xl font-semibold tracking-tight text-slate-900">
            Recent activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Keep track of what you've been working on.
          </p>
        </div>

        <Link
          to="/materials"
          className="hidden items-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 sm:flex"
        >
          View materials
          <ArrowRight size={16} />
        </Link>
      </div>

      {loading ? (
        <div className="mt-5 flex items-center justify-center rounded-3xl border border-slate-200 bg-white p-8">
          <Loader2 size={24} className="animate-spin text-indigo-600" />
        </div>
      ) : activities.length === 0 ? (
        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10">
          <div className="mx-auto flex max-w-lg flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <Activity size={25} className="text-slate-500" />
            </div>

            <h3 className="mt-5 font-google text-xl font-semibold text-slate-900">
              Your activity will appear here
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Study sessions, practice attempts, and uploaded notes will show up here as you use Revyze.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-5 divide-y divide-slate-100 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
          {activities.map((item) => (
            <div key={item.id} className="flex items-start gap-4 p-5 transition hover:bg-slate-50/70">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                {getActivityIcon(item.activityType)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {item.title}
                </p>

                {item.description && (
                  <p className="mt-0.5 text-xs text-slate-500">
                    {item.description}
                  </p>
                )}
              </div>

              <span className="flex items-center gap-1 text-xs text-slate-400 shrink-0">
                <Clock size={13} />
                {formatRelativeTime(item.createdAt)}
              </span>
            </div>
          ))}
        </div>
      )}

      <Link
        to="/materials"
        className="mt-4 flex w-full items-center justify-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 sm:hidden"
      >
        View materials
        <ArrowRight size={16} />
      </Link>
    </section>
  );
};

export default RecentActivity;
