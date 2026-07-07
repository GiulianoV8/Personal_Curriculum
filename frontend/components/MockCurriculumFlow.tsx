'use client';

import { FormEvent, useMemo, useState } from 'react';

type Lesson = {
  id: string;
  title: string;
  duration: string;
  summary: string;
  objective: string;
};

type Module = {
  id: string;
  title: string;
  description: string;
  milestone: string;
  lessons: Lesson[];
};

type Curriculum = {
  title: string;
  description: string;
  focus: string;
  weeks: string;
  modules: Module[];
};

const buildMockCurriculum = (topic: string): Curriculum => ({
  title: `${topic} roadmap`,
  description: `A practical, beginner-friendly path for learning ${topic} without getting overwhelmed.`,
  focus: 'Build momentum with clear checkpoints and guided practice.',
  weeks: '4 weeks',
  modules: [
    {
      id: 'foundations',
      title: 'Foundations',
      description: 'Learn the core vocabulary and mental model before moving deeper.',
      milestone: 'Explain the main ideas in your own words.',
      lessons: [
        {
          id: 'baseline',
          title: 'Get oriented',
          duration: '20 min',
          summary: 'What the topic is, why it matters, and how to structure your study.',
          objective: 'Understand the learning goal and set expectations.',
        },
        {
          id: 'vocab',
          title: 'Build the vocabulary',
          duration: '25 min',
          summary: 'Learn the terms you will see repeatedly in articles, tutorials, and practice.',
          objective: 'Recognize the foundation phrases and concepts.',
        },
      ],
    },
    {
      id: 'practice',
      title: 'Practice',
      description: 'Turn the ideas into repeated, low-friction exercises and examples.',
      milestone: 'Complete a guided exercise on your own.',
      lessons: [
        {
          id: 'example',
          title: 'Work through a simple example',
          duration: '30 min',
          summary: 'Follow a worked example and connect it to the concept you just learned.',
          objective: 'Apply the concept to a concrete situation.',
        },
        {
          id: 'review',
          title: 'Reflect and adjust',
          duration: '15 min',
          summary: 'Note what felt easy, what felt confusing, and what to revisit next.',
          objective: 'Improve your understanding through reflection.',
        },
      ],
    },
    {
      id: 'project',
      title: 'Project',
      description: 'Use your knowledge in a small, tangible outcome so the path feels real.',
      milestone: 'Finish a mini project or practice challenge.',
      lessons: [
        {
          id: 'build',
          title: 'Create a mini project',
          duration: '45 min',
          summary: 'Combine the ideas into a lightweight output you can actually show or use.',
          objective: 'Make the learning tangible and memorable.',
        },
      ],
    },
  ],
});

export function MockCurriculumFlow() {
  const [topicInput, setTopicInput] = useState('linear algebra');
  const [topic, setTopic] = useState('linear algebra');
  const [selectedLessonId, setSelectedLessonId] = useState('baseline');

  const curriculum = useMemo(() => buildMockCurriculum(topic), [topic]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = topicInput.trim();
    if (!value) {
      return;
    }
    setTopic(value);
    setSelectedLessonId('baseline');
  };

  const selectedLesson = useMemo(() => {
    for (const module of curriculum.modules) {
      const lesson = module.lessons.find((item) => item.id === selectedLessonId);
      if (lesson) {
        return { moduleTitle: module.title, lesson };
      }
    }
    return { moduleTitle: curriculum.modules[0].title, lesson: curriculum.modules[0].lessons[0] };
  }, [curriculum.modules, selectedLessonId]);

  const completedLessons = 1;
  const progress = Math.round((completedLessons / curriculum.modules.flatMap((module) => module.lessons).length) * 100);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-ink-900/70 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8 lg:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sage-400">
              End-to-end mock flow
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Try the learning experience from idea to lesson preview.
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-300">
              Enter any topic and the preview will generate a mock curriculum, surface the next lesson, and show a progress snapshot that feels close to the real product.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-xl rounded-3xl border border-white/10 bg-ink-950/80 p-4 sm:p-5">
            <label className="text-sm font-medium text-ink-200" htmlFor="topic-input">
              What do you want to learn?
            </label>
            <input
              id="topic-input"
              value={topicInput}
              onChange={(event) => setTopicInput(event.target.value)}
              placeholder="e.g. jazz guitar improvisation"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-ink-900 px-4 py-3 text-base text-white outline-none transition focus:border-sage-400"
            />
            <button
              type="submit"
              className="mt-4 inline-flex rounded-full bg-sage-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-400"
            >
              Generate mock plan
            </button>
          </form>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-ink-950/70 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-sage-400">Generated curriculum</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{curriculum.title}</h3>
              </div>
              <span className="rounded-full border border-sage-500/30 bg-sage-500/10 px-3 py-1 text-sm font-medium text-sage-300">
                {curriculum.weeks}
              </span>
            </div>

            <p className="mt-4 text-sm leading-7 text-ink-300">{curriculum.description}</p>
            <p className="mt-3 text-sm text-ink-400">{curriculum.focus}</p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-ink-900/70 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Progress</p>
                <p className="text-sm text-ink-400">{progress}% complete</p>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-sage-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {curriculum.modules.map((module) => (
                <div key={module.id} className="rounded-2xl border border-white/10 bg-ink-900/70 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{module.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-ink-400">{module.description}</p>
                    </div>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-ink-400">
                      {module.lessons.length} lessons
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedLessonId(lesson.id)}
                          className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition ${selectedLessonId === lesson.id ? 'border-sage-400/50 bg-sage-500/10' : 'border-white/10 bg-ink-950/70 hover:border-white/20'}`}
                        >
                          <span>
                            <span className="block text-sm font-medium text-white">{lesson.title}</span>
                            <span className="mt-1 block text-sm text-ink-400">{lesson.summary}</span>
                          </span>
                          <span className="text-sm text-ink-400">{lesson.duration}</span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 rounded-xl border border-sage-500/20 bg-sage-500/10 p-3 text-sm text-sage-200">
                    <span className="font-semibold text-white">Milestone:</span> {module.milestone}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-ink-950/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sage-400">Selected lesson</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{selectedLesson.lesson.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink-300">{selectedLesson.lesson.summary}</p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-ink-900/70 p-4">
                <p className="text-sm font-semibold text-white">Module</p>
                <p className="mt-2 text-sm text-ink-400">{selectedLesson.moduleTitle}</p>
                <p className="mt-3 text-sm font-semibold text-white">Objective</p>
                <p className="mt-2 text-sm text-ink-400">{selectedLesson.lesson.objective}</p>
                <p className="mt-3 text-sm font-semibold text-white">Estimated time</p>
                <p className="mt-2 text-sm text-ink-400">{selectedLesson.lesson.duration}</p>
              </div>

              <button
                type="button"
                className="mt-5 rounded-full border border-sage-400/30 bg-sage-500/10 px-4 py-2 text-sm font-semibold text-sage-200 transition hover:bg-sage-500/20"
              >
                Mark lesson complete
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-ink-900/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-400">What this preview shows</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-300">
                <li>• A topic intake experience that feels like the first step in the product.</li>
                <li>• A generated curriculum with modules, lessons, and milestones.</li>
                <li>• A lesson detail panel that can later host tutor content.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
