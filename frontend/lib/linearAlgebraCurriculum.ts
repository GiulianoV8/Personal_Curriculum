export type LearningPreferences = {
  topic: string;
  goal: string;
  currentLevel: "beginner" | "intermediate" | "advanced";
  weeklyHours: number;
  durationWeeks: number;
  depth: "overview" | "intermediate" | "advanced";
  learningStyle: "theory" | "practice" | "balanced";
};

export type CurriculumLesson = {
  slug: string;
  title: string;
  description: string;
  objective: string;
  estimatedMinutes: number;
  tags: string[];
};

export type CurriculumModule = {
  id: string;
  title: string;
  description: string;
  rationale: string;
  lessons: CurriculumLesson[];
};

export type CurriculumPlan = {
  curriculumTitle: string;
  curriculumDescription: string;
  goalDescription: string;
  totalEstimatedHours: number;
  durationWeeks: number;
  modules: CurriculumModule[];
  milestones: Array<{
    title: string;
    description: string;
    associatedLessonSlugs: string[];
  }>;
};

const baseLessons = [
  {
    slug: "scalars-vectors",
    title: "Scalars and vectors",
    description: "Build intuition for the basic objects of linear algebra.",
    objective: "Understand how scalars and vectors describe quantity and movement.",
    estimatedMinutes: 20,
    tags: ["theory", "practice"],
  },
  {
    slug: "vector-operations",
    title: "Vector operations",
    description: "Learn how vectors are added, scaled, and interpreted.",
    objective: "Apply vector addition and scaling with confidence.",
    estimatedMinutes: 25,
    tags: ["practice"],
  },
  {
    slug: "matrices-transformations",
    title: "Matrices and linear transformations",
    description: "See how matrices change vectors and space.",
    objective: "Recognize matrices as transformation rules.",
    estimatedMinutes: 30,
    tags: ["theory", "practice"],
  },
  {
    slug: "matrix-multiplication",
    title: "Matrix multiplication and systems",
    description: "Connect transformation composition to solving systems.",
    objective: "Understand how matrix multiplication combines rules.",
    estimatedMinutes: 25,
    tags: ["theory"],
  },
];

export function buildLinearAlgebraCurriculum(preferences: Partial<LearningPreferences> = {}): CurriculumPlan {
  const resolved: LearningPreferences = {
    topic: "linear algebra",
    goal: "Build a strong foundation",
    currentLevel: "beginner",
    weeklyHours: 4,
    durationWeeks: 4,
    depth: "intermediate",
    learningStyle: "balanced",
    ...preferences,
  } as LearningPreferences;

  const moduleCount = resolved.depth === "advanced" ? 4 : resolved.depth === "overview" ? 3 : 4;
  const lessonCount = resolved.depth === "advanced" ? 4 : 4;

  const moduleBase = [
    {
      id: "module-1",
      title: "Foundations",
      description: "Develop the core vocabulary and geometry behind vectors.",
      rationale: "You need to understand the basic objects before learning how they move and transform.",
    },
    {
      id: "module-2",
      title: "Operations and intuition",
      description: "Practice vector arithmetic and see how it behaves geometrically.",
      rationale: "Once the objects feel familiar, you can combine them and reason about their effects.",
    },
    {
      id: "module-3",
      title: "Matrices and transformations",
      description: "Use matrices to describe how vectors and space change.",
      rationale: "Matrices are the natural next step after vectors because they package transformations into a single structure.",
    },
    {
      id: "module-4",
      title: "Application and synthesis",
      description: "Tie the ideas together through systems, composition, and practice.",
      rationale: "The final step is to connect the concepts to larger problems and a more complete mental model.",
    },
  ].slice(0, moduleCount);

  const lessons = baseLessons.slice(0, lessonCount).map((lesson, index) => ({
    ...lesson,
    tags:
      resolved.learningStyle === "practice"
        ? lesson.tags.filter((tag) => tag !== "theory")
        : resolved.learningStyle === "theory"
          ? lesson.tags.filter((tag) => tag !== "practice")
          : lesson.tags,
  }));

  const modules = moduleBase.map((module, index) => {
    const lessonsForModule = lessons.slice(index * Math.ceil(lessons.length / moduleBase.length), (index + 1) * Math.ceil(lessons.length / moduleBase.length));
    return {
      ...module,
      lessons: lessonsForModule,
    };
  });

  const milestoneLessons = lessons.slice(0, 3).map((lesson) => lesson.slug);

  return {
    curriculumTitle: `${resolved.topic} roadmap`,
    curriculumDescription: `A ${resolved.currentLevel} friendly path for learning ${resolved.topic} with a ${resolved.depth} level of depth and a ${resolved.learningStyle} focus.`,
    goalDescription: resolved.goal,
    totalEstimatedHours: Math.max(4, resolved.weeklyHours * resolved.durationWeeks),
    durationWeeks: resolved.durationWeeks,
    modules,
    milestones: [
      {
        title: "Understand the key objects",
        description: "Explain what scalars and vectors represent and how they differ.",
        associatedLessonSlugs: milestoneLessons.slice(0, 1),
      },
      {
        title: "Work with vectors comfortably",
        description: "Add and scale vectors without getting confused by the geometry.",
        associatedLessonSlugs: milestoneLessons.slice(1, 2),
      },
      {
        title: "Use matrices to transform space",
        description: "Recognize and explain a simple linear transformation with a matrix.",
        associatedLessonSlugs: milestoneLessons.slice(2, 3),
      },
    ],
  };
}
