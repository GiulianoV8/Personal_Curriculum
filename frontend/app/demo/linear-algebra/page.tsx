"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { FormEvent, useState } from "react";

const VectorViz = dynamic(() => import("../../../components/VectorViz"), { ssr: false });

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

const LESSON_SECTIONS = [
  {
    title: "1. Warm up with vectors",
    duration: "5 min",
    body:
      "Start by imagining vectors as arrows. A vector like [2, 1] points right and up. This section helps learners connect the numbers to direction and length.",
  },
  {
    title: "2. Draw the picture",
    duration: "7 min",
    body:
      "Sketch the vector on graph paper or in your head. Notice how the x coordinate moves right and the y coordinate moves up. This visual habit makes transformations easier to understand.",
  },
  {
    title: "3. Meet the matrix",
    duration: "7 min",
    body:
      "A matrix is a compact rule that tells us how to move a vector. In this lesson, the matrix doubles the x component and leaves the y component unchanged.",
  },
  {
    title: "4. Explore the example",
    duration: "6 min",
    body:
      "Apply the matrix to [2, 1] and compare the before-and-after vectors. This worked example reinforces what it means to transform a vector using a matrix.",
  },
  {
    title: "5. Practice and reflect",
    duration: "5 min",
    body:
      "Answer the short questions and compare your reasoning with the model answers. Reflection is the final step that turns a sample lesson into a learning experience.",
  },
];

const QUIZ_ITEMS: QuizItem[] = [
  {
    prompt: "How would you describe the vector [2, 1] in words?",
    acceptedTerms: [["right"], ["up"], ["length"], ["magnitude"], ["direction"]],
    answer: "It is an arrow that moves 2 units to the right and 1 unit up, with both direction and magnitude.",
    explanation:
      "Vectors are better understood as movements in space, not just pairs of numbers. The numbers describe where the arrow points and how long it is.",
    resourceLabel: "Khan Academy: Vectors and scalars",
    resourceHref: "https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces/vectors/vectors-introduction",
  },
  {
    prompt: "What change does the matrix [[2, 0], [0, 1]] make to [2, 1]?",
    acceptedTerms: [["doubles x"], ["stretches x"], ["becomes [4,1]"], ["scales x"]],
    answer: "It stretches the vector horizontally, turning [2, 1] into [4, 1].",
    explanation:
      "The matrix multiplies the x coordinate by 2 and leaves the y coordinate alone. That is a simple linear transformation.",
    resourceLabel: "3Blue1Brown: Linear transformations",
    resourceHref: "https://www.youtube.com/watch?v=kYB8IZa5AuE",
  },
  {
    prompt: "What does the dot product reveal about two vectors in this lesson?",
    acceptedTerms: [["aligned"], ["orthogonal"], ["angle"], ["projection"]],
    answer: "It reveals how aligned the vectors are and becomes zero when they are orthogonal.",
    explanation:
      "The dot product connects the algebraic formula to the geometric angle between vectors, helping learners see why perpendicular vectors are special.",
    resourceLabel: "Khan Academy: Dot products",
    resourceHref: "https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces/dot-cross-products/v/dot-product",
  },
  {
    prompt: "Why is this transformation still a linear map?",
    acceptedTerms: [["linear"], ["origin"], ["combination"], ["scale"], ["add"]],
    answer: "Because it preserves the origin and scales the x and y components separately in a consistent way.",
    explanation:
      "Linear maps preserve the basic structure of space: scaling and adding vectors still behaves predictably after transformation.",
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
              {LESSON_SECTIONS.map((section) => (
                <div key={section.title} className="rounded-2xl border border-ink-800/60 bg-ink-950/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                    <span className="rounded-full bg-ink-800/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-ink-300">
                      {section.duration}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">{section.body}</p>
                </div>
              ))}

              {/* Vector visualization component (client-only) */}
              <div className="mt-4">
                {/* dynamically import VectorViz to avoid SSR issues */}
                <VectorViz />
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-ink-800/60 bg-ink-950/70 p-4">
              <p className="text-sm font-semibold text-amber-400">Worked example</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">
                Start with the vector [2, 1]. If a matrix doubles the x-value and leaves the y-value unchanged, the new vector becomes [4, 1]. This is a simple example of a transformation in action.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-300">
                Notice how the arrow gets wider but still moves up the same amount. This shows how linear algebra can stretch one direction without changing the other.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-ink-800/60 bg-ink-900/70 p-4">
              <p className="text-sm font-semibold text-white">Lesson summary</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <div className="text-sm text-ink-300">
                  <p className="font-medium text-ink-100">What you learned</p>
                  <ul className="mt-2 list-inside list-disc text-ink-300">
                    <li>Vectors have direction and magnitude (e.g. [2, 1]).</li>
                    <li>Matrices apply linear rules to transform vectors.</li>
                    <li>Simple matrices can stretch, compress, or rotate space.</li>
                  </ul>
                </div>

                <div className="text-sm text-ink-300">
                  <p className="font-medium text-ink-100">Next steps</p>
                  <ul className="mt-2 list-inside list-disc text-ink-300">
                    <li>Try different vector values in the diagram.</li>
                    <li>Apply a different matrix to see rotation or compression.</li>
                    <li>Watch the linked videos to deepen intuition.</li>
                  </ul>
                </div>
              </div>
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
