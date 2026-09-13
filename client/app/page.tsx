"use client";

import { useState, useCallback } from "react";

/* ─────────────────────── Types ─────────────────────── */

interface ResearchResponse {
  topic: string;
  search_result: string;
  scrape_result: string;
  report: string;
  feedback: string;
}

/* ─────────────────────── Icons (inline SVGs) ─────────────────────── */

function SearchIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function SparklesIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function DocumentIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function ChatBubbleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  );
}

function GlobeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function CodeBracketIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}

function BeakerIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  );
}

/* ─────────────────────── Loading Spinner ─────────────────────── */

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6 animate-fade-in">
      {/* Animated orbiting dots */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-2 border-caramel-200 border-t-caramel-500 animate-spin-slow" />
        <div className="absolute inset-2 rounded-full border-2 border-caramel-100 border-b-caramel-400 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "2s" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <SparklesIcon className="w-7 h-7 text-caramel-500" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-chocolate">Agents are researching…</p>
        <div className="flex items-center gap-1.5 justify-center">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="inline-block w-2 h-2 rounded-full bg-caramel-400"
              style={{
                animation: "pulse-warm 1.4s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        <p className="text-sm text-caramel-600/70">Searching, scraping, and synthesizing your topic</p>
      </div>
    </div>
  );
}

/* ─────────────────────── Empty State ─────────────────────── */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-8 animate-fade-in">
      {/* Hero illustration */}
      <div className="relative">
        <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-caramel-100 to-caramel-200 flex items-center justify-center shadow-lg shadow-caramel-200/50">
          <BeakerIcon className="w-14 h-14 text-caramel-600" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-gradient-to-br from-caramel-400 to-caramel-500 flex items-center justify-center shadow-md animate-pulse-warm">
          <SparklesIcon className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="text-center space-y-3 max-w-md">
        <h2 className="text-2xl font-serif font-semibold text-chocolate">
          Start Your Research
        </h2>
        <p className="text-caramel-700/70 leading-relaxed">
          Enter any topic above and our AI agents will search the web, scrape relevant sources, and synthesize a comprehensive research report for you.
        </p>
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-3">
        {[
          { icon: <GlobeIcon className="w-4 h-4" />, label: "Web Search" },
          { icon: <CodeBracketIcon className="w-4 h-4" />, label: "Smart Scraping" },
          { icon: <DocumentIcon className="w-4 h-4" />, label: "Report Synthesis" },
          { icon: <ChatBubbleIcon className="w-4 h-4" />, label: "AI Feedback" },
        ].map((feat) => (
          <span
            key={feat.label}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-caramel-100/80 text-caramel-700 text-sm font-medium border border-caramel-200/60 backdrop-blur-sm"
          >
            {feat.icon}
            {feat.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── Research Accordion ─────────────────────── */

function ResearchAccordion({
  title,
  icon,
  content,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ReactNode;
  content: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-caramel-200/60 bg-white/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-caramel-300/80 hover:shadow-md hover:shadow-caramel-100/50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left group cursor-pointer"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-caramel-100 to-caramel-200 flex items-center justify-center text-caramel-600 group-hover:from-caramel-200 group-hover:to-caramel-300 transition-all duration-300">
            {icon}
          </div>
          <span className="font-semibold text-chocolate">{title}</span>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-caramel-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-5 pt-1">
          <div className="rounded-xl bg-linen/80 border border-caramel-100 p-5">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed text-caramel-800 font-sans">
              {content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Main Page ─────────────────────── */

export default function Home() {
  const [topic, setTopic] = useState("");
  const [data, setData] = useState<ResearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResearch, setShowResearch] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = topic.trim();
      if (!trimmed) return;

      setLoading(true);
      setError(null);
      setData(null);
      setShowResearch(false);

      try {
        const res = await fetch("http://localhost:8000/research", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: trimmed }),
        });

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const json: ResearchResponse = await res.json();
        setData(json);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [topic]
  );

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      {/* ──── Navbar ──── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-espresso/95 shadow-xl shadow-black/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-caramel-400 to-caramel-600 flex items-center justify-center shadow-lg shadow-caramel-700/30">
              <BeakerIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-caramel-100 tracking-tight">
                ResearchPoint
              </h1>
              <p className="text-[11px] text-caramel-400/70 font-medium tracking-wider uppercase">
                Multi-Agent System
              </p>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-caramel-900/40 border border-caramel-700/30">
            <span className={`w-2 h-2 rounded-full ${loading ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
            <span className="text-xs text-caramel-300 font-medium">
              {loading ? "Researching" : "Ready"}
            </span>
          </div>
        </div>
      </header>

      {/* ──── Main Content ──── */}
      <main className="flex-1 flex flex-col">
        {/* Search Section */}
        <section className="bg-gradient-to-b from-espresso/5 to-transparent pt-10 pb-8">
          <div className="max-w-3xl mx-auto px-6">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="flex items-center gap-3 rounded-2xl bg-white border-2 border-caramel-200 px-5 py-3 shadow-lg shadow-caramel-200/30 transition-all duration-300 focus-within:border-caramel-400 focus-within:shadow-xl focus-within:shadow-caramel-300/30">
                <SearchIcon className="w-5 h-5 text-caramel-400 shrink-0" />
                <input
                  id="topic-input"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a research topic…  e.g. Nepal flood, Quantum computing"
                  className="flex-1 bg-transparent outline-none text-chocolate placeholder:text-caramel-400/60 text-base font-medium"
                  disabled={loading}
                />
                <button
                  id="research-submit"
                  type="submit"
                  disabled={loading || !topic.trim()}
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-caramel-500 to-caramel-600 text-white font-semibold text-sm shadow-md shadow-caramel-500/30 transition-all duration-300 hover:from-caramel-600 hover:to-caramel-700 hover:shadow-lg hover:shadow-caramel-500/40 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-md cursor-pointer"
                >
                  <SparklesIcon className="w-4 h-4" />
                  Research
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Results Section */}
        <section className="flex-1 max-w-4xl w-full mx-auto px-6 pb-16">
          {/* Error */}
          {error && (
            <div className="mb-8 rounded-2xl bg-red-50 border border-red-200 px-6 py-4 text-red-700 text-sm animate-fade-in">
              <p className="font-semibold">Error</p>
              <p className="mt-1">{error}</p>
            </div>
          )}

          {/* Loading */}
          {loading && <LoadingSpinner />}

          {/* Empty State */}
          {!loading && !data && !error && <EmptyState />}

          {/* ──── Results ──── */}
          {data && !loading && (
            <div className="space-y-8 animate-fade-in">
              {/* Topic badge */}
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-caramel-500 to-caramel-600 text-white text-sm font-semibold shadow-md shadow-caramel-400/20">
                  <SparklesIcon className="w-4 h-4" />
                  {data.topic}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-caramel-300/50 to-transparent" />
              </div>

              {/* ── Report Card ── */}
              <article className="group rounded-3xl bg-white border border-caramel-200/60 shadow-xl shadow-caramel-200/20 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-caramel-200/30">
                {/* Card header */}
                <div className="flex items-center gap-3 px-8 pt-7 pb-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-caramel-400 to-caramel-600 flex items-center justify-center shadow-lg shadow-caramel-400/30">
                    <DocumentIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif font-bold text-chocolate">
                      Research Report
                    </h2>
                    <p className="text-xs text-caramel-500 font-medium">
                      Synthesized by AI agents
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-8">
                  <div className="h-px bg-gradient-to-r from-caramel-200 via-caramel-300/50 to-transparent" />
                </div>

                {/* Report body */}
                <div className="px-8 py-6">
                  <div className="prose prose-stone max-w-none">
                    <div className="text-[15px] leading-[1.85] text-caramel-900/90 whitespace-pre-wrap font-[400]">
                      {data.report}
                    </div>
                  </div>
                </div>
              </article>

              {/* ── Feedback Card ── */}
              <article className="group rounded-3xl bg-gradient-to-br from-white to-caramel-50/50 border border-caramel-200/60 shadow-lg shadow-caramel-100/20 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-caramel-200/30">
                {/* Card header */}
                <div className="flex items-center gap-3 px-8 pt-7 pb-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-400/30">
                    <ChatBubbleIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif font-bold text-chocolate">
                      Agent Feedback
                    </h2>
                    <p className="text-xs text-caramel-500 font-medium">
                      Quality review & recommendations
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-8">
                  <div className="h-px bg-gradient-to-r from-amber-200 via-amber-300/50 to-transparent" />
                </div>

                {/* Feedback body */}
                <div className="px-8 py-6">
                  <div className="text-[15px] leading-[1.85] text-caramel-900/90 whitespace-pre-wrap">
                    {data.feedback}
                  </div>
                </div>
              </article>

              {/* ── Research Data Toggle ── */}
              <div className="pt-2">
                <button
                  id="toggle-research"
                  onClick={() => setShowResearch((prev) => !prev)}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-caramel-100/80 to-caramel-200/60 border border-caramel-200/70 text-caramel-700 font-semibold text-sm transition-all duration-300 hover:from-caramel-200/80 hover:to-caramel-300/60 hover:border-caramel-300/80 hover:shadow-lg hover:shadow-caramel-200/30 backdrop-blur-sm cursor-pointer group"
                >
                  <BeakerIcon className="w-5 h-5 text-caramel-500 group-hover:text-caramel-600 transition-colors" />
                  {showResearch
                    ? "Hide Background Research"
                    : "Show Background Research"}
                  <ChevronDownIcon
                    className={`w-4 h-4 text-caramel-500 transition-transform duration-300 ${
                      showResearch ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Research accordion content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    showResearch
                      ? "max-h-[4000px] opacity-100 mt-5"
                      : "max-h-0 opacity-0 mt-0"
                  }`}
                >
                  <div className="space-y-4">
                    <ResearchAccordion
                      title="Search Results"
                      icon={<GlobeIcon className="w-5 h-5" />}
                      content={data.search_result}
                      defaultOpen={true}
                    />
                    <ResearchAccordion
                      title="Scraped Data"
                      icon={<CodeBracketIcon className="w-5 h-5" />}
                      content={data.scrape_result}
                      defaultOpen={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* ──── Footer ──── */}
      <footer className="border-t border-caramel-200/60 bg-parchment/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <p className="text-xs text-caramel-500/70">
            © 2026 ResearchHub — Multi-Agent Research System
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-caramel-400/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-caramel-500/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-caramel-600/50" />
          </div>
        </div>
      </footer>
    </div>
  );
}
