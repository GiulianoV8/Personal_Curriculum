# Personal Curriculum Planner – Architecture Overview

## 1. Tech Stack

**Frontend**
- Next.js (React, TypeScript)
- UI: Tailwind CSS or similar

**Backend**
- Node.js with Express or NestJS (TypeScript)
  - Alternatively: Python FastAPI if preferred.

**Database**
- PostgreSQL
- ORM: Prisma (TypeScript) or equivalent

**AI Integration**
- LLM provider (e.g., Anthropic Claude, OpenAI, etc.) called via REST API.
- Two main prompts/pipelines:
  - Planner agent → curriculum JSON
  - Tutor agent → lesson content + Q&A

## 2. High-Level Architecture

- Next.js SPA/SSR frontend communicates with backend API via REST (JSON).
- Backend manages:
  - Authentication
  - CRUD for curricula, modules, lessons, progress
  - Calls to AI APIs (Planner/Tutor)
- Database persists:
  - Users
  - Curricula, modules, lessons
  - User preferences
  - Progress / feedback

## 3. Data Model (Initial)

### 3.1 User

```ts
User {
  id: string
  email: string
  password_hash: string
  created_at: Date
  updated_at: Date
}
```

### 3.2 PreferenceProfile

```ts
PreferenceProfile {
  id: string
  user_id: string (FK -> User)
  weekly_hours: number | null
  preferred_duration_weeks: number | null
  depth_level: 'overview' | 'intermediate' | 'advanced'
  learning_style: 'theory' | 'practice' | 'balanced'
  created_at: Date
  updated_at: Date
}
```

### 3.3 Curriculum

```ts
Curriculum {
  id: string
  user_id: string (FK -> User)
  topic: string
  title: string
  description: string
  goal_description: string
  total_estimated_hours: number | null
  duration_weeks: number | null
  created_at: Date
  updated_at: Date
}
```

### 3.4 Module

```ts
Module {
  id: string
  curriculum_id: string (FK -> Curriculum)
  title: string
  description: string
  order_index: number
  rationale: string | null // "Why this module here"
}
```

### 3.5 Lesson

```ts
Lesson {
  id: string
  module_id: string (FK -> Module)
  title: string
  description: string
  objective: string | null
  estimated_minutes: number | null
  content_generated: boolean
  content_json: jsonb | null // Explanation, examples, exercises
  order_index: number
}
```

### 3.6 ProgressEvent

```ts
ProgressEvent {
  id: string
  user_id: string (FK -> User)
  lesson_id: string (FK -> Lesson)
  status: 'not_started' | 'in_progress' | 'completed'
  difficulty_rating: 'too_easy' | 'just_right' | 'too_hard' | null
  time_spent_minutes: number | null
  created_at: Date
  updated_at: Date
}
```

### 3.7 FeedbackEntry

```ts
FeedbackEntry {
  id: string
  user_id: string (FK -> User)
  curriculum_id: string (FK -> Curriculum)
  rating: number | null // 1–5
  comment: string | null
  created_at: Date
}
```

## 4. API Endpoints (Draft)

### Authentication

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Preferences

- `GET /api/preferences`
- `POST /api/preferences`
- `PUT /api/preferences`

### Curricula

- `POST /api/curricula`  
  - Body: topic + onboarding answers  
  - Behavior: calls Planner, saves curriculum + modules + lessons.
- `GET /api/curricula`
- `GET /api/curricula/:id`
- `PUT /api/curricula/:id` (update timeline, depth)
- `POST /api/curricula/:id/regenerate` (re-run planner with new constraints)

### Lessons

- `GET /api/lessons/:id` (fetch lesson meta + content; triggers Tutor if content not yet generated)
- `POST /api/lessons/:id/generate` (explicit Tutor call, optional)

### Progress

- `POST /api/progress`
- `GET /api/progress/curriculum/:id`

## 5. Frontend Structure (Next.js)

Pages/components (suggestion):

- `pages/index.tsx` – Landing / topic input.
- `pages/curricula/index.tsx` – User’s curricula list.
- `pages/curricula/[id].tsx` – Curriculum detail view (modules + lessons).
- `pages/lessons/[id].tsx` – Lesson view + Tutor chat.

Components:
- `components/OnboardingForm`
- `components/CurriculumOverview`
- `components/ModuleList`
- `components/LessonList`
- `components/LessonContent`
- `components/TutorChat`
- `components/ProgressBar`

## 6. AI Integration Notes

- Create `ai/planner.ts` and `ai/tutor.ts` modules.
- Standardize JSON schema for planner output so it maps cleanly to DB entities.
- Use environment variables for API keys.
- Add guards and validation for AI responses (e.g., zod schema).

---