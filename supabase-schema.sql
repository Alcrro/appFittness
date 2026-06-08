-- AppFitness - Schema Supabase
-- Rulează acest script în SQL Editor din Supabase Dashboard

-- ============================================================
-- 1. EXERCISES (biblioteca globală + exerciții custom)
-- ============================================================
create table if not exists exercises (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  muscle_group text not null,
  equipment   text,
  is_custom   boolean not null default false,
  user_id     uuid references auth.users(id) on delete cascade,
  created_at  timestamptz default now()
);

-- RLS
alter table exercises enable row level security;

create policy "Exercitii globale vizibile de toti" on exercises
  for select using (is_custom = false);

create policy "Exercitii custom vizibile doar de owner" on exercises
  for select using (is_custom = true and auth.uid() = user_id);

create policy "Userii pot crea exercitii custom" on exercises
  for insert with check (is_custom = true and auth.uid() = user_id);

create policy "Userii pot sterge exercitii custom proprii" on exercises
  for delete using (is_custom = true and auth.uid() = user_id);

-- ============================================================
-- 2. WORKOUT PLANS
-- ============================================================
create table if not exists workout_plans (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  description text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table workout_plans enable row level security;

create policy "Userii vad doar planurile lor" on workout_plans
  for all using (auth.uid() = user_id);

-- ============================================================
-- 3. WORKOUT EXERCISES (exerciții dintr-un plan)
-- ============================================================
create table if not exists workout_exercises (
  id               uuid primary key default gen_random_uuid(),
  workout_plan_id  uuid not null references workout_plans(id) on delete cascade,
  exercise_id      uuid not null references exercises(id) on delete cascade,
  sets             int not null default 3,
  reps             int not null default 10,
  rest_seconds     int not null default 90,
  order_index      int not null default 0,
  created_at       timestamptz default now()
);

alter table workout_exercises enable row level security;

create policy "Userii vad exercitiile din planurile lor" on workout_exercises
  for all using (
    exists (
      select 1 from workout_plans
      where workout_plans.id = workout_exercises.workout_plan_id
        and workout_plans.user_id = auth.uid()
    )
  );

-- ============================================================
-- 4. SESSIONS (antrenamente efectuate)
-- ============================================================
create table if not exists sessions (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  workout_plan_id  uuid references workout_plans(id) on delete set null,
  started_at       timestamptz not null default now(),
  finished_at      timestamptz,
  notes            text,
  created_at       timestamptz default now()
);

alter table sessions enable row level security;

create policy "Userii vad doar sesiunile lor" on sessions
  for all using (auth.uid() = user_id);

-- ============================================================
-- 5. SESSION LOGS (seturi loguite per sesiune)
-- ============================================================
create table if not exists session_logs (
  id                    uuid primary key default gen_random_uuid(),
  session_id            uuid not null references sessions(id) on delete cascade,
  exercise_id           uuid not null references exercises(id) on delete cascade,
  workout_exercise_id   uuid references workout_exercises(id) on delete set null,
  weight                numeric(6,2),
  reps                  int not null,
  rpe                   numeric(3,1),
  notes                 text,
  logged_at             timestamptz not null default now()
);

alter table session_logs enable row level security;

create policy "Userii vad doar log-urile lor" on session_logs
  for all using (
    exists (
      select 1 from sessions
      where sessions.id = session_logs.session_id
        and sessions.user_id = auth.uid()
    )
  );

-- ============================================================
-- 6. BODY WEIGHT (greutate corporala)
-- ============================================================
create table if not exists body_weight (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  weight       numeric(5,2) not null,
  recorded_at  date not null default current_date,
  created_at   timestamptz default now()
);

alter table body_weight enable row level security;

create policy "Userii vad doar greutatea lor" on body_weight
  for all using (auth.uid() = user_id);

-- ============================================================
-- 7. PRE-POPULATE cu exerciții default
-- ============================================================
insert into exercises (name, muscle_group, equipment, is_custom) values
  -- Piept
  ('Bench Press', 'Piept', 'Bara', false),
  ('Incline Bench Press', 'Piept', 'Bara', false),
  ('Decline Bench Press', 'Piept', 'Bara', false),
  ('Dumbbell Fly', 'Piept', 'Gantere', false),
  ('Cable Crossover', 'Piept', 'Cablu', false),
  ('Push-up', 'Piept', 'Greutate corporala', false),
  ('Chest Dip', 'Piept', 'Greutate corporala', false),
  -- Spate
  ('Deadlift', 'Spate', 'Bara', false),
  ('Pull-up', 'Spate', 'Greutate corporala', false),
  ('Chin-up', 'Spate', 'Greutate corporala', false),
  ('Barbell Row', 'Spate', 'Bara', false),
  ('Dumbbell Row', 'Spate', 'Gantere', false),
  ('Lat Pulldown', 'Spate', 'Cablu', false),
  ('Cable Row', 'Spate', 'Cablu', false),
  ('Face Pull', 'Spate', 'Cablu', false),
  -- Umeri
  ('Overhead Press', 'Umeri', 'Bara', false),
  ('Dumbbell Shoulder Press', 'Umeri', 'Gantere', false),
  ('Lateral Raise', 'Umeri', 'Gantere', false),
  ('Front Raise', 'Umeri', 'Gantere', false),
  ('Arnold Press', 'Umeri', 'Gantere', false),
  ('Upright Row', 'Umeri', 'Bara', false),
  -- Biceps
  ('Barbell Curl', 'Biceps', 'Bara', false),
  ('Dumbbell Curl', 'Biceps', 'Gantere', false),
  ('Hammer Curl', 'Biceps', 'Gantere', false),
  ('Preacher Curl', 'Biceps', 'Bara', false),
  ('Cable Curl', 'Biceps', 'Cablu', false),
  ('Concentration Curl', 'Biceps', 'Gantere', false),
  -- Triceps
  ('Tricep Pushdown', 'Triceps', 'Cablu', false),
  ('Skull Crusher', 'Triceps', 'Bara', false),
  ('Overhead Tricep Extension', 'Triceps', 'Gantere', false),
  ('Close Grip Bench Press', 'Triceps', 'Bara', false),
  ('Tricep Dip', 'Triceps', 'Greutate corporala', false),
  -- Picioare
  ('Squat', 'Picioare', 'Bara', false),
  ('Front Squat', 'Picioare', 'Bara', false),
  ('Romanian Deadlift', 'Picioare', 'Bara', false),
  ('Leg Press', 'Picioare', 'Masina', false),
  ('Leg Extension', 'Picioare', 'Masina', false),
  ('Leg Curl', 'Picioare', 'Masina', false),
  ('Calf Raise', 'Picioare', 'Masina', false),
  ('Lunges', 'Picioare', 'Gantere', false),
  ('Bulgarian Split Squat', 'Picioare', 'Gantere', false),
  ('Hip Thrust', 'Picioare', 'Bara', false),
  -- Abdomen
  ('Plank', 'Abdomen', 'Greutate corporala', false),
  ('Crunch', 'Abdomen', 'Greutate corporala', false),
  ('Cable Crunch', 'Abdomen', 'Cablu', false),
  ('Leg Raise', 'Abdomen', 'Greutate corporala', false),
  ('Russian Twist', 'Abdomen', 'Greutate corporala', false),
  ('Ab Wheel Rollout', 'Abdomen', 'Alt echipament', false)
on conflict do nothing;
