export type LessonSection = {
  title: string;
  body: string;
  bullets?: string[];
  diagram?: 'vector-arrow' | 'vector-addition' | 'transform-grid' | 'matrix-grid';
};

export type PracticeItem = {
  prompt: string;
  answer: string;
  explanation: string;
  acceptedTerms: string[][];
};

export type LessonDefinition = {
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  summary: string;
  objective: string;
  sections: LessonSection[];
  practice: PracticeItem[];
  videoUrl?: string;
  videoTitle?: string;
};

export const linearAlgebraLessons: LessonDefinition[] = [
  {
    slug: 'scalars-vectors',
    title: 'Scalars and vectors',
    subtitle: 'Learn what the building blocks of linear algebra are and why they matter.',
    duration: '20 min',
    summary:
      'This first lesson introduces the difference between a scalar, a vector, and the coordinate plane. You will build an intuition for how numbers can describe direction and magnitude.',
    objective: 'Understand how scalars and vectors represent quantity and movement.',
    sections: [
      {
        title: 'A scalar is a single quantity',
        body:
          'A scalar is just one number, like 3 or -2. It tells us how much, but not in which direction. If you say the temperature is 3 degrees, that is a scalar. It does not tell you which way the temperature is moving.',
        bullets: ['Scalars describe magnitude only.', 'They are often used for distance, size, and amount.'],
      },
      {
        title: 'A vector is a quantity with direction',
        body:
          'A vector is different because it carries both size and direction. A vector like [3, 2] means move 3 units right and 2 units up. That gives you a specific arrow in space.',
        bullets: ['Vectors often appear as arrows on a coordinate plane.', 'They are useful for motion, force, and displacement.'],
        diagram: 'vector-arrow',
      },
      {
        title: 'Why this matters',
        body:
          'When you learn linear algebra, you are learning to describe how objects move and change. Vectors make that possible because they hold both direction and size in one compact object.',
      },
    ],
    practice: [
      {
        prompt: 'Is temperature a scalar or a vector?',
        answer: 'It is a scalar.',
        explanation: 'Temperature tells us how much heat there is, but not a direction in space.',
        acceptedTerms: [['scalar'], ['temperature']],
      },
      {
        prompt: 'What does the vector [3, 2] mean?',
        answer: 'Move 3 units right and 2 units up.',
        explanation: 'The two components describe movement along the horizontal and vertical axes.',
        acceptedTerms: [['3 units right'], ['2 units up'], ['right and up']],
      },
    ],
    videoUrl: 'https://www.youtube.com/embed/fNk_zzaMoSs',
    videoTitle: '3Blue1Brown: Vectors | Chapter 1, Essence of linear algebra',
  },
  {
    slug: 'vector-operations',
    title: 'Vector operations',
    subtitle: 'See how vectors can be added, scaled, and interpreted geometrically.',
    duration: '25 min',
    summary:
      'In this lesson, you will explore how vectors combine. You will build intuition for addition, scaling, and the idea that vectors can be transformed without losing their structure.',
    objective: 'Understand basic vector operations and the geometry behind them.',
    sections: [
      {
        title: 'Adding vectors',
        body:
          'Vector addition means placing one vector after another. If you add [2, 1] and [1, 3], you get [3, 4]. Geometrically, the result is the new endpoint after following both movements.',
        bullets: ['Addition combines movement.', 'The result is a new vector that captures the total effect.'],
        diagram: 'vector-addition',
      },
      {
        title: 'Scaling a vector',
        body:
          'Multiplying a vector by a scalar stretches or shrinks it. For example, 2 × [2, 1] gives [4, 2]. The direction stays the same, but the size changes.',
        bullets: ['Scalars change magnitude.', 'They can also reverse direction if the scalar is negative.'],
      },
      {
        title: 'Why this helps',
        body:
          'The ability to add and scale vectors is one of the core ideas in linear algebra. It lets you build complex movements from simple ones.',
      },
    ],
    practice: [
      {
        prompt: 'What is [2, 1] + [1, 3]?',
        answer: '[3, 4]',
        explanation: 'Add the x-components and y-components separately.',
        acceptedTerms: [['3, 4'], ['3 4'], ['[3, 4]']],
      },
      {
        prompt: 'What happens to a vector when it is multiplied by 2?',
        answer: 'It doubles in length and keeps the same direction.',
        explanation: 'Scaling by a positive factor preserves direction and changes magnitude.',
        acceptedTerms: [['doubles in length'], ['same direction'], ['stretches']],
      },
    ],
    videoUrl: 'https://www.youtube.com/embed/fNk_zzaMoSs',
    videoTitle: '3Blue1Brown: Vectors | Chapter 1, Essence of linear algebra',
  },
  {
    slug: 'matrices-transformations',
    title: 'Matrices and linear transformations',
    subtitle: 'See how a matrix can act like a rule that changes space.',
    duration: '30 min',
    summary:
      'This lesson introduces matrices as compact rules that transform vectors. You will see that a matrix can stretch, rotate, and shear space in a predictable way.',
    objective: 'Recognize matrices as functions that transform vectors.',
    sections: [
      {
        title: 'A matrix stores a transformation rule',
        body:
          'A matrix is a rectangular grid of numbers. A 2×2 matrix can take a vector and produce another vector. In that sense, it acts like a machine that maps one point or arrow to another.',
        bullets: ['Matrices are organized rules.', 'They are especially useful for repeated transformations.'],
        diagram: 'transform-grid',
      },
      {
        title: 'What a linear transformation does',
        body:
          'A linear transformation preserves the structure of vector addition and scaling. It means that transforming a sum is the same as summing the transformations. This is why linear algebra feels so structured and predictable.',
        bullets: ['Lines stay lines under a linear transformation.', 'The origin stays fixed.'],
      },
      {
        title: 'Intuition',
        body:
          'Think of a matrix as a lens for space. It can stretch one direction, compress another, or rotate the whole coordinate system. The important part is that it does so in an organized, repeatable way.',
      },
    ],
    practice: [
      {
        prompt: 'What does a matrix do to a vector?',
        answer: 'It transforms the vector according to a rule encoded by the matrix.',
        explanation: 'The matrix defines how the input vector is changed into an output vector.',
        acceptedTerms: [['transforms'], ['changes'], ['maps']],
      },
      {
        prompt: 'What makes a transformation linear?',
        answer: 'It preserves addition and scaling.',
        explanation: 'A linear transformation behaves consistently when vectors are added or scaled.',
        acceptedTerms: [['preserves addition'], ['preserves scaling'], ['linear']],
      },
    ],
    videoUrl: 'https://www.youtube.com/embed/kYB8IZa5AuE',
    videoTitle: '3Blue1Brown: Linear transformations',
  },
  {
    slug: 'matrix-multiplication',
    title: 'Matrix multiplication and systems',
    subtitle: 'Connect matrix operations to solving systems and combining transformations.',
    duration: '25 min',
    summary:
      'In this final lesson, you will see how matrices can be combined and how they relate to systems of equations. This gives the algebra a practical payoff.',
    objective: 'Understand how matrix multiplication connects transformations and solving problems.',
    sections: [
      {
        title: 'Matrix multiplication combines rules',
        body:
          'When you multiply two matrices, you are composing transformations. The result is a new transformation that applies the first rule and then the second. This is how complex movement can be built out of simple pieces.',
        bullets: ['Multiplication is about composition.', 'The order matters in general.'],
        diagram: 'matrix-grid',
      },
      {
        title: 'Why systems of equations matter',
        body:
          'Matrices are also used to express systems of equations. Each row can represent a constraint, and the solution is the point that satisfies all of them at once.',
        bullets: ['Matrices let you solve many equations together.', 'They are central to engineering, statistics, and machine learning.'],
      },
      {
        title: 'The big picture',
        body:
          'You now have a first-pass intuition for the main objects in linear algebra: scalars, vectors, and matrices. These ideas become more powerful as you connect them to geometry and computation.',
      },
    ],
    practice: [
      {
        prompt: 'What does matrix multiplication usually represent?',
        answer: 'It represents composing transformations or combining rules.',
        explanation: 'The output matrix captures the effect of applying one transformation after another.',
        acceptedTerms: [['composing'], ['combining rules'], ['composition']],
      },
      {
        prompt: 'Why are matrices useful for systems of equations?',
        answer: 'They package many equations into one structured object.',
        explanation: 'This makes solving and reasoning about the system much more manageable.',
        acceptedTerms: [['package'], ['structured object'], ['solve many equations']],
      },
    ],
    videoUrl: 'https://www.youtube.com/embed/XkY2DOUCWMU?si=kcFnrD_oMmixbBBk',
    videoTitle: 'Matrix multiplication as composition | Chapter 4, Essence of linear algebra',
  },
];
