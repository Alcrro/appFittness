-- Run this in the Supabase SQL Editor
-- Dashboard > SQL Editor > New query > Paste & Run

INSERT INTO exercises (name, muscle_group, equipment, is_custom, user_id)
SELECT v.name, v.muscle_group, v.equipment, false, null
FROM (VALUES
  -- Piept / Gantere
  ('Dumbbell Bench Press',            'Piept',    'Gantere'),
  ('Incline Dumbbell Press',          'Piept',    'Gantere'),
  ('Decline Dumbbell Press',          'Piept',    'Gantere'),
  ('Incline Dumbbell Fly',            'Piept',    'Gantere'),
  ('Decline Dumbbell Fly',            'Piept',    'Gantere'),
  ('Dumbbell Pullover',               'Piept',    'Gantere'),
  ('Around The Worlds',               'Piept',    'Gantere'),
  -- Piept / Masina
  ('Butterfly Machine',               'Piept',    'Masina'),
  ('Chest Press Machine',             'Piept',    'Masina'),
  ('Incline Chest Press Machine',     'Piept',    'Masina'),
  ('Decline Chest Press Machine',     'Piept',    'Masina'),
  ('Smith Machine Bench Press',       'Piept',    'Masina'),
  ('Smith Machine Incline Press',     'Piept',    'Masina'),
  ('Smith Machine Decline Press',     'Piept',    'Masina'),
  -- Spate / Gantere
  ('One-Arm Dumbbell Row',            'Spate',    'Gantere'),
  ('Bent Over Dumbbell Row',          'Spate',    'Gantere'),
  ('Dumbbell Incline Row',            'Spate',    'Gantere'),
  ('Dumbbell Shrug',                  'Spate',    'Gantere'),
  -- Spate / Masina
  ('Leverage High Row',               'Spate',    'Masina'),
  ('Leverage Iso Row',                'Spate',    'Masina'),
  ('Smith Machine Bent Over Row',     'Spate',    'Masina'),
  ('Lying T-Bar Row',                 'Spate',    'Masina'),
  -- Umeri / Gantere
  ('Seated Dumbbell Press',           'Umeri',    'Gantere'),
  ('Reverse Flyes',                   'Umeri',    'Gantere'),
  ('Rear Delt Raise',                 'Umeri',    'Gantere'),
  -- Umeri / Masina
  ('Shoulder Press Machine',          'Umeri',    'Masina'),
  ('Machine Shoulder Press',          'Umeri',    'Masina'),
  ('Reverse Machine Flyes',           'Umeri',    'Masina'),
  ('Smith Machine Shoulder Press',    'Umeri',    'Masina'),
  -- Biceps / Gantere
  ('Dumbbell Alternate Curl',         'Biceps',   'Gantere'),
  ('Incline Dumbbell Curl',           'Biceps',   'Gantere'),
  ('Seated Dumbbell Curl',            'Biceps',   'Gantere'),
  -- Biceps / Masina
  ('Machine Bicep Curl',              'Biceps',   'Masina'),
  ('Machine Preacher Curl',           'Biceps',   'Masina'),
  -- Triceps / Gantere
  ('Tricep Kickback',                 'Triceps',  'Gantere'),
  ('Lying Tricep Extension',          'Triceps',  'Gantere'),
  ('Seated Tricep Extension',         'Triceps',  'Gantere'),
  ('Standing Tricep Extension',       'Triceps',  'Gantere'),
  -- Triceps / Masina
  ('Machine Tricep Extension',        'Triceps',  'Masina'),
  ('Dip Machine',                     'Triceps',  'Masina'),
  -- Picioare / Gantere
  ('Dumbbell Lunges',                 'Picioare', 'Gantere'),
  ('Dumbbell Squat',                  'Picioare', 'Gantere'),
  ('Stiff-Legged Dumbbell Deadlift',  'Picioare', 'Gantere'),
  ('Split Squat',                     'Picioare', 'Gantere'),
  ('Dumbbell Calf Raise',             'Picioare', 'Gantere'),
  -- Picioare / Masina
  ('Hack Squat',                      'Picioare', 'Masina'),
  ('Seated Leg Curl',                 'Picioare', 'Masina'),
  ('Seated Calf Raise',               'Picioare', 'Masina'),
  ('Smith Machine Squat',             'Picioare', 'Masina'),
  ('Smith Machine Leg Press',         'Picioare', 'Masina'),
  -- Abdomen / Masina & Gantere
  ('Ab Crunch Machine',               'Abdomen',  'Masina'),
  ('Dumbbell Side Bend',              'Abdomen',  'Gantere')
) AS v(name, muscle_group, equipment)
WHERE NOT EXISTS (
  SELECT 1 FROM exercises e WHERE e.name = v.name AND e.is_custom = false
);
