"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { linearAlgebraLessons } from "@/lib/linearAlgebraLessons";

const storageKey = "pathway-lesson-progress";

export default function LearnPage() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem(storageKey);
      setCompleted(raw ? JSON.parse(raw) : []);
    } catch {
      setCompleted([]);
    }
  }, []);

  const progress = Math.round((completed.length / linearAlgebraLessons.length) * 100);

  return (
    <main className="min-h-screen bg-ink-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-ink-900/70 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sage-400">Linear algebra curriculum</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Choose a lesson and begin learning.</h1>
            <p className="mt-4 text-lg leading-8 text-ink-300">
              Each lesson is designed as a complete learning experience with explanations, intuition, and practice.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-ink-950/80 p-4 min-w-[240px]">
            <p className="text-sm font-semibold text-sage-400">Your progress</p>
            <p className="mt-2 text-3xl font-semibold text-white">{progress}%</p>
            <div className="mt-3 h-2 rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-sage-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-3 text-sm text-ink-400">{completed.length} of {linearAlgebraLessons.length} lessons completed</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {linearAlgebraLessons.map((lesson) => {
            const isComplete = completed.includes(lesson.slug);
            return (
              <div key={lesson.slug} className="rounded-3xl border border-white/10 bg-ink-950/70 p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${isComplete ? "bg-sage-500/15 text-sage-200" : "bg-white/10 text-ink-400"}`}>
                    {isComplete ? "Completed" : "Ready to start"}
                  </span>
                  <span className="text-sm text-ink-400">{lesson.duration}</span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold text-white">{lesson.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-300">{lesson.summary}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/learn/${lesson.slug}`}
                    className="rounded-full bg-sage-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sage-400"
                  >
                    Start lesson
                  </Link>
                  <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-ink-400">
                    {lesson.objective}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
