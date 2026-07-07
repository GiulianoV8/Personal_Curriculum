"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { linearAlgebraLessons } from "@/lib/linearAlgebraLessons";

const storageKey = "pathway-lesson-progress";

type QuizResult = {
  correct: boolean;
  feedback: string;
};

function getStoredProgress() {
  if (typeof window === "undefined") {
    return [] as string[];
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [] as string[];
  }
}

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const isAnswerCorrect = (value: string, acceptedTerms: string[][]) => {
  const normalized = normalize(value);
  return acceptedTerms.some((terms) => terms.some((term) => normalized.includes(normalize(term))));
};

function Diagram({ kind }: { kind?: string }) {
  switch (kind) {
    case "vector-arrow":
      return (
        <div className="rounded-2xl border border-sage-500/20 bg-sage-500/10 p-4">
          <svg viewBox="0 0 220 160" className="h-48 w-full">
            <line x1="20" y1="140" x2="200" y2="140" stroke="#5eead4" strokeWidth="2" />
            <line x1="20" y1="140" x2="20" y2="20" stroke="#5eead4" strokeWidth="2" />
            <line x1="20" y1="140" x2="150" y2="70" stroke="#f8fafc" strokeWidth="3" />
            <circle cx="150" cy="70" r="5" fill="#f59e0b" />
            <text x="24" y="30" fill="#e2e8f0" fontSize="12">y</text>
            <text x="190" y="156" fill="#e2e8f0" fontSize="12">x</text>
            <text x="110" y="90" fill="#f8fafc" fontSize="12">vector [3, 2]</text>
          </svg>
        </div>
      );
    case "vector-addition":
      return (
        <div className="rounded-2xl border border-sage-500/20 bg-sage-500/10 p-4">
          <svg viewBox="0 0 220 160" className="h-48 w-full">
            <line x1="20" y1="140" x2="200" y2="140" stroke="#5eead4" strokeWidth="2" />
            <line x1="20" y1="140" x2="20" y2="20" stroke="#5eead4" strokeWidth="2" />
            <line x1="20" y1="140" x2="120" y2="90" stroke="#f8fafc" strokeWidth="3" />
            <line x1="120" y1="90" x2="170" y2="50" stroke="#f59e0b" strokeWidth="3" />
            <line x1="20" y1="140" x2="170" y2="50" stroke="#5eead4" strokeWidth="3" />
            <circle cx="170" cy="50" r="5" fill="#f8fafc" />
            <text x="86" y="82" fill="#f8fafc" fontSize="11">[2, 1]</text>
            <text x="132" y="70" fill="#f8fafc" fontSize="11">[1, 3]</text>
            <text x="118" y="30" fill="#f8fafc" fontSize="11">sum [3, 4]</text>
          </svg>
        </div>
      );
    case "transform-grid":
      return (
        <div className="rounded-2xl border border-sage-500/20 bg-sage-500/10 p-4">
          <svg viewBox="0 0 240 180" className="h-56 w-full">
            <rect x="20" y="20" width="90" height="90" fill="none" stroke="#5eead4" strokeWidth="1.5" />
            <line x1="20" y1="65" x2="110" y2="65" stroke="#5eead4" strokeWidth="1.2" />
            <line x1="65" y1="20" x2="65" y2="110" stroke="#5eead4" strokeWidth="1.2" />
            <line x1="20" y1="110" x2="110" y2="20" stroke="#f59e0b" strokeWidth="2.5" />
            <line x1="20" y1="20" x2="110" y2="110" stroke="#f59e0b" strokeWidth="2.5" />
            <polygon points="130,20 220,20 220,110 130,110" fill="none" stroke="#f8fafc" strokeWidth="1.5" />
            <line x1="130" y1="65" x2="220" y2="38" stroke="#f8fafc" strokeWidth="1.2" />
            <line x1="175" y1="20" x2="145" y2="110" stroke="#f8fafc" strokeWidth="1.2" />
            <path d="M130 65 L220 38" stroke="#5eead4" strokeWidth="2" />
            <path d="M175 20 L145 110" stroke="#5eead4" strokeWidth="2" />
            <text x="34" y="16" fill="#e2e8f0" fontSize="11">original grid</text>
            <text x="130" y="16" fill="#e2e8f0" fontSize="11">transformed grid</text>
            <text x="0" y="132" fill="#f8fafc" fontSize="11">A matrix stretches and tilts the basis vectors</text>
          </svg>
        </div>
      );
    case "matrix-grid":
      return (
        <div className="rounded-2xl border border-sage-500/20 bg-sage-500/10 p-4">
          <svg viewBox="0 0 220 160" className="h-48 w-full">
            <rect x="40" y="30" width="140" height="90" stroke="#5eead4" fill="none" />
            <line x1="80" y1="30" x2="80" y2="120" stroke="#5eead4" strokeWidth="2" />
            <line x1="120" y1="30" x2="120" y2="120" stroke="#5eead4" strokeWidth="2" />
            <line x1="40" y1="70" x2="180" y2="70" stroke="#f59e0b" strokeWidth="2" />
            <text x="58" y="58" fill="#f8fafc" fontSize="11">a b</text>
            <text x="98" y="58" fill="#f8fafc" fontSize="11">c d</text>
            <text x="70" y="132" fill="#f8fafc" fontSize="11">matrix acts like a rule</text>
          </svg>
        </div>
      );
    default:
      return null;
  }
}

export function LessonPageContent({ slug }: { slug: string }) {
  const [completed, setCompleted] = useState<string[]>(() => getStoredProgress());
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, QuizResult | null>>({});

  const lesson = useMemo(() => linearAlgebraLessons.find((item) => item.slug === slug), [slug]);

  if (!lesson) {
    return (
      <main className="min-h-screen bg-ink-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-ink-900/70 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sage-400">Lesson not found</p>
          <h1 className="mt-3 text-3xl font-semibold">That lesson does not exist yet.</h1>
          <Link href="/learn" className="mt-6 inline-flex rounded-full bg-sage-500 px-4 py-2 text-sm font-semibold text-white">
            Back to lessons
          </Link>
        </div>
      </main>
    );
  }

  const isComplete = completed.includes(lesson.slug);

  const toggleComplete = () => {
    const next = isComplete
      ? completed.filter((item) => item !== lesson.slug)
      : [...completed, lesson.slug];

    setCompleted(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const progress = Math.round((completed.length / linearAlgebraLessons.length) * 100);

  const handleSubmit = (event: FormEvent<HTMLFormElement>, index: number) => {
    event.preventDefault();
    const value = responses[index] ?? "";

    if (!value.trim()) {
      return;
    }

    const correct = isAnswerCorrect(value, lesson.practice[index].acceptedTerms);
    const feedback = correct
      ? "Nice work — that is the right idea."
      : "That is a solid start. Review the model answer and explanation below.";

    setResults((current) => ({
      ...current,
      [index]: { correct, feedback },
    }));
  };

  return (
    <main className="min-h-screen bg-ink-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-ink-900/70 p-5 shadow-2xl shadow-black/20">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sage-400">Linear algebra curriculum</p>
              <h1 className="mt-2 text-2xl font-semibold">{lesson.title}</h1>
            </div>
            <div className="rounded-full border border-sage-500/30 bg-sage-500/10 px-3 py-1 text-sm font-medium text-sage-200">
              {progress}% complete
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-sage-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-3xl border border-white/10 bg-ink-900/70 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sage-400">{lesson.duration}</p>
            <h2 className="mt-3 text-3xl font-semibold">{lesson.subtitle}</h2>
            <p className="mt-4 text-lg leading-8 text-ink-300">{lesson.summary}</p>
            <div className="mt-6 rounded-2xl border border-sage-500/20 bg-sage-500/10 p-4 text-sm text-sage-100">
              <p className="font-semibold text-white">Objective</p>
              <p className="mt-2">{lesson.objective}</p>
            </div>

            <div className="mt-8 space-y-5">
              {lesson.sections.map((section) => (
                <div key={section.title} className="rounded-2xl border border-white/10 bg-ink-950/70 p-4">
                  <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-300">{section.body}</p>
                  {section.bullets ? (
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-300">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.diagram ? (
                    <div className="mt-4">
                      <Diagram kind={section.diagram} />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            {lesson.videoUrl ? (
              <div className="mt-8 rounded-2xl border border-white/10 bg-ink-950/70 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-400">Related video</p>
                <p className="mt-2 text-sm text-ink-300">{lesson.videoTitle}</p>
                <div className="mt-4 aspect-video overflow-hidden rounded-2xl border border-white/10">
                  <iframe
                    className="h-full w-full"
                    src={lesson.videoUrl}
                    title={lesson.videoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : null}
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-ink-900/70 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-sage-400">Lesson control</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Track your progress</h3>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${isComplete ? "bg-sage-500/15 text-sage-200" : "bg-white/10 text-ink-300"}`}>
                  {isComplete ? "Completed" : "In progress"}
                </span>
              </div>

              <button
                type="button"
                onClick={toggleComplete}
                className="mt-5 rounded-full bg-sage-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sage-400"
              >
                {isComplete ? "Mark as not done" : "Mark lesson complete"}
              </button>

              <div className="mt-5 rounded-2xl border border-white/10 bg-ink-950/70 p-4 text-sm text-ink-300">
                <p className="font-semibold text-white">Next up</p>
                <p className="mt-2">Continue through the curriculum and build a stronger mental model with each lesson.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-ink-900/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-400">Practice</p>
              <div className="mt-4 space-y-4">
                {lesson.practice.map((item, index) => {
                  const result = results[index];

                  return (
                    <form key={item.prompt} onSubmit={(event) => handleSubmit(event, index)} className="rounded-2xl border border-white/10 bg-ink-950/70 p-4">
                      <p className="text-sm font-semibold text-white">{item.prompt}</p>
                      <input
                        value={responses[index] ?? ""}
                        onChange={(event) =>
                          setResponses((current) => ({
                            ...current,
                            [index]: event.target.value,
                          }))
                        }
                        placeholder="Type your answer"
                        className="mt-3 w-full rounded-xl border border-white/10 bg-ink-900 px-3 py-2 text-sm text-white outline-none focus:border-sage-500/50"
                      />
                      <button
                        type="submit"
                        className="mt-3 rounded-full bg-sage-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sage-400"
                      >
                        Check answer
                      </button>

                      {result ? (
                        <div className={`mt-3 rounded-xl border px-3 py-3 text-sm ${result.correct ? "border-sage-500/30 bg-sage-500/10 text-sage-200" : "border-amber-500/30 bg-amber-500/10 text-amber-200"}`}>
                          <p>{result.feedback}</p>
                          <p className="mt-2 font-semibold text-white">Model answer:</p>
                          <p className="mt-1 text-ink-100">{item.answer}</p>
                          <p className="mt-3 text-sm text-ink-200">Why it matters:</p>
                          <p className="mt-1 text-ink-300">{item.explanation}</p>
                        </div>
                      ) : null}
                    </form>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-ink-900/70 p-6">
              <Link href="/learn" className="text-sm font-semibold text-sage-300 transition hover:text-white">
                ← Back to curriculum overview
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
