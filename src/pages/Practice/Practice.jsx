import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Brain,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  History,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { apiClient } from "../../api/client";

const TOPIC_PRESETS = [
  {
    name: "Recursion & Trees",
    topic: "Recursion",
    desc: "Base cases, call stack, recursive tree traversals",
    badge: "Computer Science",
  },
  {
    name: "Databases & SQL",
    topic: "Databases/SQL",
    desc: "ACID transactions, indexing, normalization, and joins",
    badge: "Data Systems",
  },
  {
    name: "Data Structures",
    topic: "Data Structures",
    desc: "Arrays, hash maps, heaps, and algorithmic time complexity",
    badge: "Algorithms",
  },
];

const Practice = () => {
  // Navigation / views: "setup" | "taking" | "results"
  const [view, setView] = useState("setup");
  const [activeTab, setActiveTab] = useState("new"); // "new" | "history"

  // Setup state
  const [selectedTopic, setSelectedTopic] = useState("Recursion");
  const [customTopic, setCustomTopic] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState("");

  // Active quiz state
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: "A" | "B" | "C" | "D" }
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Result state
  const [result, setResult] = useState(null);

  // History state
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // General error state
  const [errorMessage, setErrorMessage] = useState("");

  const timerRef = useRef(null);

  // Load study materials on mount for optional material-based quiz generation
  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const res = await apiClient.get("/materials");
        setMaterials(res.data || []);
      } catch (err) {
        // Soft fail - materials are optional for quiz generation
      }
    };
    loadMaterials();
  }, []);

  // Load history when switching to history tab
  useEffect(() => {
    if (activeTab === "history") {
      fetchHistory();
    }
  }, [activeTab]);

  // Quiz timer
  useEffect(() => {
    if (view === "taking") {
      setElapsedSeconds(0);
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [view]);

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await apiClient.get("/practice/history");
      setHistory(res.data || []);
    } catch (err) {
      setErrorMessage(err.message || "Failed to load practice history");
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleStartQuiz = async () => {
    setGenerating(true);
    setErrorMessage("");
    const topicToUse = customTopic.trim() || selectedTopic;

    try {
      const res = await apiClient.post("/practice/generate", {
        topic: topicToUse,
        questionCount: parseInt(questionCount, 10),
        materialId: selectedMaterialId ? selectedMaterialId : null,
      });

      if (res?.data) {
        setQuiz(res.data);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setResult(null);
        setView("taking");
      }
    } catch (err) {
      setErrorMessage(err.message || "Failed to generate practice quiz");
    } finally {
      setGenerating(false);
    }
  };

  const handleSelectOption = (questionId, optionKey) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!quiz) return;
    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await apiClient.post(`/practice/quizzes/${quiz.id}/submit`, {
        answers,
        timeSpentSeconds: elapsedSeconds,
      });

      if (res?.data) {
        setResult(res.data);
        setView("results");
        if (timerRef.current) clearInterval(timerRef.current);
      }
    } catch (err) {
      setErrorMessage(err.message || "Failed to submit quiz answers");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQuestion = quiz?.questions?.[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = quiz?.questions?.length || 0;
  const progressPercent = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-8">
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
            <button
              type="button"
              onClick={() => setErrorMessage("")}
              className="text-xs font-semibold uppercase hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* VIEW 1: SETUP / HUB */}
        {view === "setup" && (
          <main className="mt-10">
            <div>
              <p className="text-sm font-semibold text-indigo-600">Adaptive Revision</p>
              <h1 className="mt-2 font-google text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Practice & Flash Quizzes
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
                Reinforce your active recall with dynamically generated questions tailored to your coursework and study materials.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-8 flex gap-3 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab("new")}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${
                  activeTab === "new"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <Sparkles size={18} />
                Generate Quiz
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("history")}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${
                  activeTab === "history"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <History size={18} />
                Attempt History
              </button>
            </div>

            {/* Tab: Generate Quiz */}
            {activeTab === "new" && (
              <div className="mt-8 space-y-8">
                {/* Topic selection */}
                <section>
                  <label className="block text-sm font-semibold text-slate-900">
                    Choose a Topic
                  </label>
                  <p className="mt-1 text-xs text-slate-500">
                    Select a core academic focus or provide your own topic below
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {TOPIC_PRESETS.map((p) => {
                      const isSelected = selectedTopic === p.topic && !customTopic;
                      return (
                        <button
                          key={p.topic}
                          type="button"
                          onClick={() => {
                            setSelectedTopic(p.topic);
                            setCustomTopic("");
                          }}
                          className={`flex flex-col items-start rounded-2xl border p-5 text-left transition ${
                            isSelected
                              ? "border-indigo-600 bg-indigo-50/50 shadow-sm ring-2 ring-indigo-600"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                            {p.badge}
                          </span>
                          <h3 className="mt-3 font-google text-base font-semibold text-slate-900">
                            {p.name}
                          </h3>
                          <p className="mt-1 text-xs leading-5 text-slate-500">{p.desc}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Topic Input */}
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-slate-600">
                      Or enter custom topic:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Operating Systems Concurrency, Dynamic Programming"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </section>

                {/* Configuration Options */}
                <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900">
                      Question Count
                    </label>
                    <select
                      value={questionCount}
                      onChange={(e) => setQuestionCount(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="3">3 Questions (Quick flash)</option>
                      <option value="5">5 Questions (Recommended)</option>
                      <option value="10">10 Questions (Deep test)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900">
                      Link Study Material (Optional)
                    </label>
                    <select
                      value={selectedMaterialId}
                      onChange={(e) => setSelectedMaterialId(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="">No material linked (General academic)</option>
                      {materials.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.originalFilename}
                        </option>
                      ))}
                    </select>
                  </div>
                </section>

                {/* Action button */}
                <div className="pt-4">
                  <button
                    type="button"
                    disabled={generating}
                    onClick={handleStartQuiz}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-60 sm:w-auto"
                  >
                    {generating ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Generating Quiz...
                      </>
                    ) : (
                      <>
                        <Brain size={18} />
                        Start Practice Quiz
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Tab: History */}
            {activeTab === "history" && (
              <div className="mt-8">
                {loadingHistory ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Loader2 size={32} className="animate-spin text-indigo-600" />
                    <p className="mt-3 text-sm text-slate-500">Loading your history...</p>
                  </div>
                ) : history.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
                    <History size={32} className="mx-auto text-slate-400" />
                    <h3 className="mt-4 font-google text-lg font-semibold text-slate-900">
                      No quiz attempts yet
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Take your first practice quiz above to track your mastery progress over time.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {history.map((att) => {
                      const isPassing = att.scorePercentage >= 70;
                      return (
                        <div
                          key={att.id}
                          className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 sm:flex-row sm:items-center"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                                {att.topic}
                              </span>
                              <span className="text-xs text-slate-400">
                                {new Date(att.attemptedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <h4 className="mt-1 font-google text-base font-semibold text-slate-900">
                              {att.quizTitle}
                            </h4>
                            <p className="mt-1 text-xs text-slate-500">
                              Duration: {Math.floor(att.timeSpentSeconds / 60)}m {att.timeSpentSeconds % 60}s · {att.correctCount}/{att.totalQuestions} correct
                            </p>
                          </div>

                          <div className="mt-4 flex items-center gap-4 sm:mt-0">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold ${
                                isPassing ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {att.scorePercentage}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </main>
        )}

        {/* VIEW 2: ACTIVE QUIZ TAKING */}
        {view === "taking" && currentQuestion && (
          <main className="mt-10">
            {/* Top status bar */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                  {quiz.topic}
                </span>
                <h2 className="mt-1 font-google text-xl font-semibold text-slate-900">
                  {quiz.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">
                <Clock size={16} className="text-indigo-600" />
                <span>{formatTimer(elapsedSeconds)}</span>
              </div>
            </div>

            {/* Progress indicators */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <span>{answeredCount} of {totalQuestions} answered</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Quick jump question numbers */}
              <div className="mt-3 flex gap-2">
                {quiz.questions.map((q, idx) => {
                  const isAnswered = !!answers[q.id];
                  const isCurrent = idx === currentQuestionIndex;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
                        isCurrent
                          ? "bg-indigo-600 text-white"
                          : isAnswered
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question card */}
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Question {currentQuestionIndex + 1}
              </span>
              <h3 className="mt-2 text-lg font-medium leading-7 text-slate-900 sm:text-xl">
                {currentQuestion.questionText}
              </h3>

              {/* Options */}
              <div className="mt-6 space-y-3">
                {[
                  { key: "A", text: currentQuestion.optionA },
                  { key: "B", text: currentQuestion.optionB },
                  { key: "C", text: currentQuestion.optionC },
                  { key: "D", text: currentQuestion.optionD },
                ].map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleSelectOption(currentQuestion.id, opt.key)}
                      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50/60 shadow-sm ring-2 ring-indigo-600"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                          isSelected
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span className="text-sm font-medium text-slate-800 sm:text-base">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom action controls */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {currentQuestionIndex < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleSubmitQuiz}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Grading Quiz...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      Submit & Review
                    </>
                  )}
                </button>
              )}
            </div>
          </main>
        )}

        {/* VIEW 3: RESULTS & EXPLANATIONS */}
        {view === "results" && result && (
          <main className="mt-10">
            {/* Score Banner */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                <div>
                  <span className="rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                    {result.topic} Quiz Complete
                  </span>
                  <h2 className="mt-2 font-google text-2xl font-bold text-slate-900 sm:text-3xl">
                    {result.quizTitle}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Completed in {Math.floor(result.timeSpentSeconds / 60)}m {result.timeSpentSeconds % 60}s · Topic Mastery updated to {result.topicMasteryPercentage}%
                  </p>
                </div>

                <div className="mt-6 flex flex-col items-center sm:mt-0">
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-3xl text-2xl font-extrabold ${
                      result.scorePercentage >= 70
                        ? "bg-emerald-50 text-emerald-700 ring-4 ring-emerald-100"
                        : "bg-amber-50 text-amber-700 ring-4 ring-amber-100"
                    }`}
                  >
                    {result.scorePercentage}%
                  </div>
                  <span className="mt-2 text-xs font-semibold text-slate-500">
                    {result.correctAnswers} of {result.totalQuestions} correct
                  </span>
                </div>
              </div>

              {/* Quick actions */}
              <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setView("setup");
                    setActiveTab("new");
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <RotateCcw size={16} />
                  Practice Another Topic
                </button>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Dashboard Overview
                </Link>
              </div>
            </div>

            {/* Detailed Question Review */}
            <div className="mt-10">
              <h3 className="font-google text-xl font-semibold text-slate-900">
                Detailed Answer Review
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Inspect every answer with full academic rationale to solidify your understanding.
              </p>

              <div className="mt-6 space-y-6">
                {result.questionResults?.map((q, idx) => {
                  const isCorrect = q.isCorrect;
                  return (
                    <div
                      key={q.questionId}
                      className={`rounded-2xl border bg-white p-6 shadow-sm ${
                        isCorrect ? "border-emerald-200" : "border-rose-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-slate-400">
                          Question {idx + 1}
                        </span>
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                            <CheckCircle2 size={14} /> Correct
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
                            <XCircle size={14} /> Incorrect
                          </span>
                        )}
                      </div>

                      <h4 className="mt-2 text-base font-semibold text-slate-900">
                        {q.questionText}
                      </h4>

                      {/* Options breakdown */}
                      <div className="mt-4 space-y-2">
                        {[
                          { key: "A", text: q.optionA },
                          { key: "B", text: q.optionB },
                          { key: "C", text: q.optionC },
                          { key: "D", text: q.optionD },
                        ].map((opt) => {
                          const isSelectedByUser = q.selectedOption === opt.key;
                          const isTheCorrectOption = q.correctOption === opt.key;

                          let badgeStyle = "border-slate-100 bg-slate-50 text-slate-700";
                          if (isTheCorrectOption) {
                            badgeStyle = "border-emerald-300 bg-emerald-50 text-emerald-900 font-medium";
                          } else if (isSelectedByUser && !isCorrect) {
                            badgeStyle = "border-rose-300 bg-rose-50 text-rose-900 line-through";
                          }

                          return (
                            <div
                              key={opt.key}
                              className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm ${badgeStyle}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="font-bold">{opt.key}.</span>
                                <span>{opt.text}</span>
                              </div>
                              {isTheCorrectOption && (
                                <span className="text-xs font-bold text-emerald-700">
                                  Correct Answer
                                </span>
                              )}
                              {isSelectedByUser && !isTheCorrectOption && (
                                <span className="text-xs font-bold text-rose-700">
                                  Your Choice
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Academic explanation */}
                      {q.explanation && (
                        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-700 sm:text-sm">
                          <span className="font-bold text-indigo-700">Explanation: </span>
                          {q.explanation}
                        </div>
                      )}
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

export default Practice;
