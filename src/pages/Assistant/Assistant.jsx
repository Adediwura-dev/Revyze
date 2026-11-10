import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MessageCircle,
  Send,
  Sparkles,
  Bot,
  User,
  Loader2,
  Plus,
  Trash2,
  BookOpen,
  Brain,
  HelpCircle,
} from "lucide-react";
import { apiClient } from "../../api/client";

const SUGGESTIONS = [
  "Explain Recursion and how call stacks prevent overflow",
  "What are ACID transactions in relational databases?",
  "What is the difference between Array and Hash Map time complexities?",
  "How should I structure my Spaced Repetition study schedule?",
];

const Assistant = () => {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, sending]);

  const loadSessions = async () => {
    try {
      setLoadingSessions(true);
      const res = await apiClient.get("/assistant/sessions");
      const sessionList = res.data || [];
      setSessions(sessionList);
      if (sessionList.length > 0 && !currentSessionId) {
        loadSessionMessages(sessionList[0].id);
      }
    } catch (err) {
      // Soft fail
    } finally {
      setLoadingSessions(false);
    }
  };

  const loadSessionMessages = async (sessionId) => {
    try {
      setCurrentSessionId(sessionId);
      const res = await apiClient.get(`/assistant/sessions/${sessionId}`);
      setMessages(res.data?.messages || []);
    } catch (err) {
      setErrorMessage(err.message || "Failed to load session messages");
    }
  };

  const handleStartNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setErrorMessage("");
  };

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || sending) return;

    setInputValue("");
    setSending(true);
    setErrorMessage("");

    // Optimistically add user message
    const tempUserMsg = {
      id: "temp-" + Date.now(),
      sender: "USER",
      content: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      const res = await apiClient.post("/assistant/chat", {
        sessionId: currentSessionId,
        message: text,
      });

      if (res?.data) {
        const { sessionId, assistantMessage } = res.data;
        setCurrentSessionId(sessionId);
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== tempUserMsg.id),
          res.data.userMessage,
          assistantMessage,
        ]);
        // Refresh session list in background
        const sessionRes = await apiClient.get("/assistant/sessions");
        setSessions(sessionRes.data || []);
      }
    } catch (err) {
      setErrorMessage(err.message || "Failed to get response from AI tutor");
    } finally {
      setSending(false);
    }
  };

  const handleDeleteSession = async (sessionId, e) => {
    e.stopPropagation();
    try {
      await apiClient.delete(`/assistant/sessions/${sessionId}`);
      const updated = sessions.filter((s) => s.id !== sessionId);
      setSessions(updated);
      if (currentSessionId === sessionId) {
        if (updated.length > 0) {
          loadSessionMessages(updated[0].id);
        } else {
          handleStartNewChat();
        }
      }
    } catch (err) {
      setErrorMessage(err.message || "Failed to delete session");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      {/* Top Navbar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back to dashboard</span>
          </Link>
          <div className="h-4 w-px bg-slate-200" />
          <h1 className="flex items-center gap-2 font-google text-lg font-semibold text-slate-900">
            <Sparkles size={18} className="text-indigo-600" />
            AI Academic Assistant
          </h1>
        </div>

        <Link
          to="/dashboard"
          className="font-google text-xl font-semibold tracking-tight text-slate-900"
        >
          Revyze
        </Link>
      </header>

      {/* Main chat layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sessions Sidebar */}
        <aside className="hidden w-72 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
          <div className="p-4">
            <button
              type="button"
              onClick={handleStartNewChat}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
            >
              <Plus size={16} />
              New Conversation
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2">
            <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Conversations
            </p>

            {loadingSessions ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 size={20} className="animate-spin text-indigo-600" />
              </div>
            ) : sessions.length === 0 ? (
              <p className="px-3 py-6 text-xs text-slate-400">
                No past conversations yet.
              </p>
            ) : (
              <div className="mt-2 space-y-1">
                {sessions.map((s) => {
                  const isActive = s.id === currentSessionId;
                  return (
                    <div
                      key={s.id}
                      onClick={() => loadSessionMessages(s.id)}
                      className={`group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition ${
                        isActive
                          ? "bg-slate-100 font-semibold text-slate-900"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span className="truncate pr-2">{s.title}</span>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteSession(s.id, e)}
                        className="opacity-0 transition hover:text-rose-600 group-hover:opacity-100"
                        title="Delete chat"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Chat Pane */}
        <div className="flex flex-1 flex-col overflow-hidden bg-slate-50">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
            <div className="mx-auto max-w-3xl space-y-6">
              {messages.length === 0 ? (
                /* Welcome / Onboarding State */
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                    <Bot size={32} />
                  </div>
                  <h2 className="mt-4 font-google text-2xl font-bold text-slate-900">
                    What would you like to master today?
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                    Your personal academic tutor can explain concepts from your notes, analyze problem breakdowns, and quiz your active recall.
                  </p>

                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 text-left">
                    {SUGGESTIONS.map((sugg, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSendMessage(sugg)}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs font-medium text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-900"
                      >
                        <Sparkles size={16} className="shrink-0 text-indigo-600" />
                        <span>{sugg}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m, idx) => {
                  const isUser = m.sender === "USER";
                  return (
                    <div
                      key={m.id || idx}
                      className={`flex gap-3 sm:gap-4 ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isUser && (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
                          <Bot size={18} />
                        </div>
                      )}

                      <div
                        className={`max-w-xl rounded-2xl p-4 sm:p-5 text-sm leading-6 shadow-sm ${
                          isUser
                            ? "bg-indigo-600 text-white"
                            : "border border-slate-200 bg-white text-slate-800"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{m.content}</div>
                      </div>

                      {isUser && (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-white">
                          <User size={18} />
                        </div>
                      )}
                    </div>
                  );
                })
              )}

              {sending && (
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
                    <Bot size={18} />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <Loader2 size={16} className="animate-spin text-indigo-600" />
                    <span className="text-xs font-medium text-slate-600">
                      Tutor is thinking...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Input Bar */}
          <div className="border-t border-slate-200 bg-white p-4 sm:px-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="mx-auto flex max-w-3xl items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask your tutor any question or paste a concept..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={sending}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={sending || !inputValue.trim()}
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-40"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
