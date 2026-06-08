# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AppFitness** is a Romanian-language fitness tracking web application built with React, TypeScript, and Vite. It allows users to create workout plans, track exercise sessions, log sets with weight/reps/RPE, and view progress through charts.

## NPM Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Compile TypeScript and bundle with Vite for production
- `npm run preview` - Preview production build locally

## Technology Stack

### Frontend
- **React** 18.3.1 - UI framework
- **TypeScript** 5.5.3 - Type safety
- **Vite** 5.4.2 - Build tool and dev server
- **React Router DOM** 6.26.0 - Client-side routing
- **Tailwind CSS** 3.4.10 - Utility-first styling with custom orange theme
- **Lucide React** 0.441.0 - Icon library
- **Recharts** 2.12.7 - Chart/graph visualization

### Backend
- **Supabase** (PostgreSQL database) - Data persistence and authentication
- **Supabase Auth** - User authentication (email/password signup and login)

### Build & Development
- **Vite React Plugin** 4.3.1 - React fast refresh
- **PostCSS** 8.4.41 with Autoprefixer - CSS processing for Tailwind

## Architecture

### Auth & State Management
- **AuthContext** (`src/context/AuthContext.tsx`) - Provides user authentication state and methods globally
  - Uses Supabase Auth for email/password sign-up and login
  - Manages session state with `useAuth()` hook
  - Automatically persists and restores sessions

### Routing Structure
- **App.tsx** - Main routing configuration with React Router
  - Public route: `/auth` (Auth page - redirects to home if already logged in)
  - Protected routes (require auth):
    - `/` - Dashboard (home page with stats and quick start)
    - `/antrenamente` - Workout plans list
    - `/antrenamente/:id` - Workout plan detail/edit
    - `/istoric` - Session history
    - `/progres` - Progress charts and stats
    - `/profil` - User profile
    - `/sesiune/:workoutId` - Active workout session (full-screen)
  - PrivateRoute component protects routes and shows spinner during auth check

### Data Layer (Hooks)
Custom hooks manage data fetching and mutations via Supabase:

- **useWorkouts()** - Fetch all workout plans for user, create/delete/update plans
- **useWorkoutDetail(workoutId)** - Fetch single workout with exercises, add/remove/update exercises
- **useSessions()** - Fetch user sessions, start/finish sessions
- **useActiveSession(sessionId)** - Fetch current session with full data, log sets, delete logs
- **useExercises()** - Fetch global exercises + user's custom exercises, create custom exercises
- **useExerciseHistory(exerciseId)** - Fetch all logs for an exercise across sessions

All hooks depend on AuthContext and trigger Supabase queries. Data is stored in local component state.

### UI Components
- **Layout** - Master layout with header, main outlet, and fixed bottom navigation
- **BottomNav** - Navigation tabs: Home, Workouts (Planuri), History (Istoric), Progress (Progres), Profile (Profil)
- **Card** - Reusable container with dark gray background and border
- **Button** - Supports variants (primary, secondary, ghost, danger, success) and sizes (sm, md, lg, icon)
- **Input** - Form input with label
- **Modal** - Dialog/modal component
- **ExerciseSelector** - Workout-specific component for selecting exercises
- **RestTimer** - Session-specific component for rest period timer

### Database Schema
Tables in Supabase PostgreSQL (RLS enabled on all):
- **exercises** - Global exercise library + user custom exercises (is_custom flag)
- **workout_plans** - User's workout plans with name/description
- **workout_exercises** - Exercise entries in a plan (sets, reps, rest_seconds, order_index)
- **sessions** - Workout sessions started/finished with optional workout_plan reference
- **session_logs** - Individual set logs within a session (weight, reps, RPE, notes)
- **body_weight** - User body weight tracking by date

All tables have user_id foreign key with cascading deletes. RLS policies enforce user isolation.

Pre-populated with ~46 global exercises across 7 muscle groups: Piept (Chest), Spate (Back), Umeri (Shoulders), Biceps, Triceps, Picioare (Legs), Abdomen.

### Types
All domain types in `src/types/index.ts`: Exercise, WorkoutPlan, WorkoutExercise, Session, SessionLog, BodyWeight. Each includes Supabase metadata (id, user_id, created_at, timestamps).

### Utilities & Constants
- **src/lib/exercises.ts** - Exercise list constants, muscle groups, equipment types, and 1RM calculator
- **src/lib/supabase.ts** - Supabase client initialization from environment variables

## Configuration

### Environment Variables
Required in `.env`:
```
VITE_SUPABASE_URL=<your_supabase_project_url>
VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

### Build Configuration
- **Vite** - Basic React setup, no custom aliases or plugins
- **TypeScript** - Strict mode enabled, target ES2020
- **Tailwind** - Dark mode via media query, custom orange colors (400, 500, 600)
- **PostCSS** - Autoprefixer for vendor prefixes

### Styling Approach
- Tailwind utility classes throughout components
- Dark theme: bg-gray-950 (base), bg-gray-900 (cards), orange-500 for accent
- Component design uses rounded-2xl and rounded-xl for consistency
- Shadow effects for elevation (e.g., `shadow-lg shadow-orange-500/20`)

## Language & Localization
UI is in Romanian. All UI strings, route names (antrenamente, istoric, progres, profil), and muscle group/equipment names are Romanian.

## Development Notes

### Database Access Patterns
- Always check `user` from `useAuth()` before querying
- Use `.eq('user_id', user.id)` in queries or rely on RLS policies
- For related data, use `.select('*, related_table(*)')` syntax
- RLS ensures users see only their own data even if policies aren't specified in queries

### Performance Considerations
- Hooks re-fetch on component mount or dependency changes
- No caching layer - each hook manages its own state
- Large session lists are limited to 50 most recent
- No pagination implemented

## File Structure
```
src/
  App.tsx                    # Main routing
  main.tsx                   # React entry point
  types/index.ts             # Domain types
  context/AuthContext.tsx    # Auth provider and hook
  hooks/                     # Data fetching hooks
  lib/
    supabase.ts              # Supabase client
    exercises.ts             # Exercise constants and utilities
  components/
    layout/                  # Layout, Header, BottomNav
    ui/                      # Reusable UI components
    workout/                 # Workout-related components
    session/                 # Active session components
  pages/                     # Route page components
```

