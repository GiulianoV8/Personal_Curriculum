"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type QuizItem = {
  prompt: string;
  acceptedTerms: string[][];
  answer: string;
  explanation: string;
  resourceLabel: string;
  resourceHref: string;
};

type QuizResult = {
  correct: boolean;
  feedback: string;
};

const LESSON_STEPS = [
  {
    title: "1. Read the concept",
    body: "A vector describes direction and magnitude. In this lesson, the vector [2, 1] is used to show how a matrix can change where it points.",
  },
  {
    title: "2. See the transformation",
    body: "Multiplying by a matrix changes the vector into a new one. That is the core idea behind linear transformations.",
  },
  {
    title: "3. Check your understanding",
    body: "Each question below gives you immediate feedback, a model answer, and a short resource so the sample lesson feels real.",
  },
];

const QUIZ_ITEMS: QuizItem[] = [
  {
    prompt: "What does the dot product tell you about two vectors?",
    acceptedTerms: [["aligned"], ["angle"], ["similar"], ["direction"], ["orthogonal"]],
    answer: "It tells you how aligned the vectors are, and it becomes zero when they are orthogonal.",
    explanation:
      "The dot product measures how much one vector points in the same direction as another. It is also the key to understanding perpendicularity.",
    resourceLabel: "Khan Academy: Dot products",
    resourceHref: "https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces/dot-cross-products/v/dot-product",
  },
  {
    prompt: "What happens when a matrix multiplies a vector?",
    acceptedTerms: [["transforms"], ["changes"], ["new"], ["maps"], ["moves"]],
    answer: "It transforms the vector into a new vector by applying a linear rule.",
    explanation:
      "A matrix acts like a machine that takes a vector in and gives back a new vector. That is how linear transformations are represented.",
    resourceLabel: "3Blue1Brown: Linear transformations",
    resourceHref: "https://www.youtube.com/watch?v=kYB8IZa5AuE",
  },
  {
    prompt: "Why does a transformation matter in linear algebra?",
    acceptedTerms: [["model"], ["systems"], ["structure"], ["preserve"], ["understand"]],
    answer: "It helps us model change and understand how systems behave in a structured way.",
    explanation:
      "Transformations let us study how objects move, scale, rotate, and change while keeping the underlying structure understandable.",
    resourceLabel: "Khan Academy: Linear transformations",
    resourceHref: "https://www.khanacademy.org/math/linear-algebra/matrix-transformations/linear-transformations/v/linear-transformations",
  },
];

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const isAnswerCorrect = (value: string, acceptedTerms: string[][]) => {
  const normalized = normalize(value);
  return acceptedTerms.some((terms) => terms.some((term) => normalized.includes(term)));
};

export default function LinearAlgebraDemoPage() {
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, QuizResult | null>>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>, index: number) => {
    event.preventDefault();
    const value = responses[index] ?? "";

    if (!value.trim()) {
      return;
    }

    const correct = isAnswerCorrect(value, QUIZ_ITEMS[index].acceptedTerms);
    const feedback = correct
      ? "Nice work — that is the right idea."
      : "That is a solid start. Review the model answer and the suggested resource below.";

    setResults((current) => ({
      ...current,
      [index]: { correct, feedback },
    }));
  };

  return (
    <main className="min-h-screen bg-ink-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 lg:px-8">
        <div className="rounded-3xl border border-ink-800/70 bg-ink-900/70 p-8 shadow-2xl shadow-black/30">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sage-400">
                Linear algebra demo lesson
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Vectors, transformations, and intuition
              </h1>
            </div>
            <Link
              href="/"
              className="rounded-full border border-ink-700 px-4 py-2 text-sm text-ink-300 transition hover:border-sage-500/40 hover:text-white"
            >
              Back to home
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-3xl border border-ink-800/70 bg-ink-900/70 p-8">
            <p className="text-sm font-semibold text-sage-400">Sample lesson</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              A vector is an arrow with direction and magnitude, and a matrix can move it.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-400">
              In this sample lesson, the learner sees a concrete vector, watches how it changes under a simple transformation, and then answers a few guided questions.
            </p>

            <div className="mt-8 space-y-4">
              {LESSON_STEPS.map((step) => (
                <div key={step.title} className="rounded-2xl border border-ink-800/60 bg-ink-950/70 p-4">
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">{step.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-ink-800/60 bg-ink-950/70 p-4">
              <p className="text-sm font-semibold text-amber-400">Worked example</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">
                Start with the vector [2, 1]. If a matrix doubles the x-value and leaves the y-value unchanged, the new vector becomes [4, 1]. This is a simple example of a transformation in action.
              </p>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-ink-800/70 bg-ink-900/70 p-8">
              <p className="text-sm font-semibold text-sage-400">Quick self-check</p>
              <div className="mt-4 space-y-5">
                {QUIZ_ITEMS.map((item, index) => {
                  const result = results[index];

                  return (
                    <form key={item.prompt} onSubmit={(event) => handleSubmit(event, index)} className="rounded-2xl border border-ink-800/60 bg-ink-950/70 p-4">
                      <p className="text-sm font-medium text-white">{item.prompt}</p>
                      <input
                        value={responses[index] ?? ""}
                        onChange={(event) =>
                          setResponses((current) => ({
                            ...current,
                            [index]: event.target.value,
                          }))
                        }
                        placeholder="Type your answer"
                        className="mt-3 w-full rounded-xl border border-ink-700 bg-ink-900 px-3 py-2 text-sm text-white outline-none ring-0 focus:border-sage-500/50"
                      />
                      <button
                        type="submit"
                        className="mt-3 rounded-full bg-sage-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-sage-400"
                      >
                        Check answer
                      </button>

                      {result ? (
                        <div className={`mt-3 rounded-xl border px-3 py-3 text-sm ${result.correct ? "border-sage-500/30 bg-sage-500/10 text-sage-200" : "border-amber-500/30 bg-amber-500/10 text-amber-200"}`}>
                          <p>{result.feedback}</p>
                          <p className="mt-2 font-medium text-white">Model answer:</p>
                          <p className="mt-1 text-ink-100">{item.answer}</p>
                          <p className="mt-3 text-sm text-ink-200">Why it matters:</p>
                          <p className="mt-1 text-ink-300">{item.explanation}</p>
                          <a
                            href={item.resourceHref}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-flex text-sm font-medium text-sage-300 underline underline-offset-4"
                          >
                            {item.resourceLabel}
                          </a>
                        </div>
                      ) : null}
                    </form>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
