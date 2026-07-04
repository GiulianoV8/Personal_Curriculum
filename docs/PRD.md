# Personal Curriculum Planner – Product Requirements Document (PRD)

## 1. Product Vision

Create an AI-powered learning app that turns any user-entered topic into a personalized curriculum, pacing plan, and lesson sequence.

The app should feel like a **flexible learning coach**: it plans the path first, then teaches inside each lesson when the user is ready. The primary value is helping hobby learners answer the question: *“What should I do next to learn this thing?”* without forcing them into a rigid, one-size-fits-all course.

## 2. Problem Statement

Hobby learners who want to learn new skills (e.g., guitar, Korean, machine learning basics, photography) face two main problems:

- It is hard to know which concepts to learn, in what order, and at what depth.
- Existing courses are either too rigid or too scattered (YouTube, blogs, etc.), making self-study feel chaotic.

This product solves that by generating a **tailored roadmap** for any topic, then adapting it based on the learner’s schedule, preferences, and feedback.

## 3. Target User

**Primary persona: Hobby learner**

Characteristics:
- Motivated by curiosity and personal growth rather than exams or degrees.
- Often has irregular time availability (nights, weekends, breaks).
- Comfortable with web apps and AI tools.
- Wants guidance and structure, but prefers to keep control over pace and style.

Examples:
- A guitarist who wants to learn music theory “properly”.
- A language learner who wants a structured path for Korean.
- A tech-curious student who wants to understand ML fundamentals.

## 4. Goals and Non-Goals

### 4.1 Goals

- Allow a user to enter **any topic** and get a usable curriculum within minutes.
- Ask only key planning questions needed to shape the roadmap.
- Convert time availability into a realistic pacing schedule.
- Support **asynchronous learning** (no live sessions required).
- Keep the user progressing with simple progress tracking and easy plan revisions.
- Provide basic AI tutoring inside lessons (explanations, questions, exercises).

### 4.2 Non-Goals (for V1)

- Live classes, coaching marketplace, or multi-user classrooms.
- Social/community features (forums, group chats, profiles).
- Certificates, grades, or formal accreditation.
- Mobile app at launch (mobile comes later after web).
- Deep domain-specific content libraries (we rely on the model to generate content, not pre-authored courses).

## 5. Core User Flows

### 5.1 Create a Curriculum

1. User lands on the homepage.
2. User enters a topic (e.g., “Learn jazz guitar improvisation”).
3. App asks onboarding questions:
   - What’s your goal with this topic?
   - What is your current level (beginner, intermediate, advanced)?
   - How many hours per week can you realistically study?
   - How long do you want this learning plan to last? (e.g., 4 weeks, 3 months, “no deadline”)
   - How deep do you want to go? (surface-level overview vs deep mastery)
   - Preferred learning style: theory-heavy, practice-heavy, balanced.
4. AI planner generates a **curriculum JSON** with:
   - Overview
   - Suggested prerequisites
   - Modules (sections)
   - Lessons (items inside modules)
   - Estimated time per lesson
   - Milestones (e.g., “Play a simple solo”, “Hold a basic conversation”, etc.)
5. User reviews the plan:
   - Can rename the curriculum.
   - Can adjust duration or weekly hours.
   - Can regenerate or tweak (e.g., “shorter plan”, “more exercises”).
6. User saves the curriculum.

### 5.2 Follow the Plan

1. From the dashboard, the user selects a saved curriculum.
2. User sees modules and lessons, with progress indicators.
3. Clicking a lesson opens the **Lesson view**:
   - Objective
   - High-level explanation
   - Examples
   - Suggested activities (exercises, practice tasks)
4. User can:
   - Mark lesson as “Completed”.
   - Record time spent.
   - Rate difficulty (“Too easy”, “Just right”, “Too hard”).
5. The system updates progress and may offer suggested next steps (e.g., repeat, move on, or add optional enrichment).

### 5.3 Ask Questions / Tutor Mode (inside a lesson)

1. In the Lesson view, user opens a chat-like section.
2. User asks questions (“can you explain this differently?”, “give me more examples”, etc.).
3. AI responds with tailored explanations, alternative examples, or additional exercises.
4. Tutor uses context from the current lesson and user profile (learning style, difficulty ratings).

### 5.4 Adjust Plan

1. User changes weekly hours or timeline (e.g., from 3h/week to 1h/week).
2. Planner recalculates and suggests:
   - Compressing or expanding modules.
   - Moving some lessons to “optional” or “advanced” sections.
3. User accepts or rejects the updated plan.

## 6. Functional Requirements

### 6.1 Topic Intake

- System must accept a free-text topic string of arbitrary length.
- It should support broad topics (“photography”, “machine learning basics”) and narrow topics (“Bayesian statistics for data science”, “jazz blues improvisation”).

### 6.2 Onboarding Questionnaire

- Minimal but high-value questions to parameterize the curriculum.
- Must be configurable (so we can add/remove questions later).

### 6.3 Curriculum Generation

- AI planner must output a **structured JSON** that represents:
  - `curriculum`: title, description, target outcome.
  - `modules`: name, description, order index.
  - `lessons`: name, description, module ID, estimated duration, tags (e.g., theory, practice).
  - `milestones`: name, description, associated lessons.

### 6.4 Lesson Generation

- For V1, we can:
  - Generate lesson content on demand when the user opens a lesson for the first time (lazy generation), OR
  - Generate simple content at curriculum creation time (eager generation).
- Minimum lesson content:
  - Short objective.
  - Explanation (1–3 paragraphs).
  - 2–5 examples or exercises.
  - A quick “self-check” section (short quiz or reflection questions).

### 6.5 Progress Tracking

- System must track:
  - Lesson completion state.
  - Completion timestamp.
  - Time spent (self-reported).
  - Difficulty rating (3-point scale).
- Display progress on:
  - Curriculum dashboard.
  - Inside each module.

### 6.6 Planner vs Tutor Separation

- Planner agent: responsible for generating curriculum structure and schedule.
- Tutor agent: responsible for lesson-level explanations, examples, and Q&A.
- The system must treat them as separate prompt pipelines to avoid entangling long-term plan with transient chat.

## 7. Non-functional Requirements

- Web-first: desktop and mobile browser support.
- Response time: initial curriculum generation should feel fast enough (target < 10–15 seconds).
- Data persistence: user’s curricula, lessons, and progress must be stored in a database (e.g., Postgres).
- Privacy: do not expose one user’s plans or data to other users in V1.

## 8. Data Model (High-Level)

Core entities:
- User
- LearningGoal
- Curriculum
- Module
- Lesson
- ProgressEvent
- PreferenceProfile
- FeedbackEntry
- Reminder (simple “soft reminder” for now, not required in MVP)

See `docs/architecture.md` for more detail.

## 9. MVP Scope

### 9.1 Must-Have

- User sign-up / sign-in (basic auth).
- Topic input + onboarding questionnaire.
- AI-based curriculum generation (Planner).
- Curriculum viewer (modules + lessons list).
- Basic lesson generation (Tutor).
- Progress tracking (lesson completion + difficulty rating).
- Ability to regenerate curriculum with adjusted time/depth.

### 9.2 Nice-to-Have (Post-MVP)

- Quizzes with machine-graded answers.
- Spaced repetition reminders.
- Calendar integration.
- Multiple curriculum styles (e.g., “project-based path”, “exam prep path”).

### 9.3 Future (After validation)

- Native mobile app (Android/iOS).
- Community sharing of curricula templates.
- Collaborative learning cohorts.
- Advanced analytics for user engagement.

## 10. Success Metrics

Product-level:
- % of users who complete onboarding and get a curriculum.
- % of users who start lesson 1.
- Average number of lessons completed per user in first week.
- % of users who regenerate or adjust their curriculum (engagement with planner).
- Self-reported usefulness of the plan (e.g., 1–5 rating after some usage).

## 11. Risks & Mitigations

Risks:
- Curriculum quality: AI may produce plans that look good but are pedagogically weak.
- Over-generalization: very broad topics may lead to vague curricula.
- User trust: if the plan feels arbitrary or repetitive, users may not return.

Mitigations:
- Add “Why this order?” notes to modules (short justification snippets).
- Allow users to quickly regenerate with different constraints (shorter, deeper, more practice).
- Start with clearer domains (e.g., language learning, music, programming) when testing with users.

---