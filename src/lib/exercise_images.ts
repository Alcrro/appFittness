const BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises'

export const EXERCISE_IMAGES: Record<string, string> = {
  // ── Piept / Bara ───────────────────────────────────────────────
  'Bench Press':                     `${BASE}/Barbell_Bench_Press_-_Medium_Grip/0.jpg`,
  'Incline Bench Press':             `${BASE}/Barbell_Incline_Bench_Press_-_Medium_Grip/0.jpg`,
  'Decline Bench Press':             `${BASE}/Decline_Barbell_Bench_Press/0.jpg`,
  // ── Piept / Gantere ───────────────────────────────────────────
  'Dumbbell Fly':                    `${BASE}/Dumbbell_Flyes/0.jpg`,
  'Dumbbell Bench Press':            `${BASE}/Dumbbell_Bench_Press/0.jpg`,
  'Incline Dumbbell Press':          `${BASE}/Incline_Dumbbell_Press/0.jpg`,
  'Decline Dumbbell Press':          `${BASE}/Decline_Dumbbell_Bench_Press/0.jpg`,
  'Incline Dumbbell Fly':            `${BASE}/Incline_Dumbbell_Flyes/0.jpg`,
  'Decline Dumbbell Fly':            `${BASE}/Decline_Dumbbell_Flyes/0.jpg`,
  'Dumbbell Pullover':               `${BASE}/Straight-Arm_Dumbbell_Pullover/0.jpg`,
  'Around The Worlds':               `${BASE}/Around_The_Worlds/0.jpg`,
  // ── Piept / Masina ────────────────────────────────────────────
  'Butterfly Machine':               `${BASE}/Butterfly/0.jpg`,
  'Chest Press Machine':             `${BASE}/Machine_Bench_Press/0.jpg`,
  'Incline Chest Press Machine':     `${BASE}/Leverage_Incline_Chest_Press/0.jpg`,
  'Decline Chest Press Machine':     `${BASE}/Leverage_Decline_Chest_Press/0.jpg`,
  'Smith Machine Bench Press':       `${BASE}/Smith_Machine_Bench_Press/0.jpg`,
  'Smith Machine Incline Press':     `${BASE}/Smith_Machine_Incline_Bench_Press/0.jpg`,
  'Smith Machine Decline Press':     `${BASE}/Smith_Machine_Decline_Press/0.jpg`,
  // ── Piept / Cablu & Greutate ──────────────────────────────────
  'Cable Crossover':                 `${BASE}/Cable_Crossover/0.jpg`,
  'Push-up':                         `${BASE}/Pushups/0.jpg`,
  'Chest Dip':                       `${BASE}/Dips_-_Chest_Version/0.jpg`,

  // ── Spate / Bara ──────────────────────────────────────────────
  'Deadlift':                        `${BASE}/Barbell_Deadlift/0.jpg`,
  'Barbell Row':                     `${BASE}/Bent_Over_Barbell_Row/0.jpg`,
  // ── Spate / Gantere ───────────────────────────────────────────
  'Dumbbell Row':                    `${BASE}/One-Arm_Dumbbell_Row/0.jpg`,
  'One-Arm Dumbbell Row':            `${BASE}/One-Arm_Dumbbell_Row/0.jpg`,
  'Bent Over Dumbbell Row':          `${BASE}/Bent_Over_Two-Dumbbell_Row/0.jpg`,
  'Dumbbell Incline Row':            `${BASE}/Dumbbell_Incline_Row/0.jpg`,
  'Dumbbell Shrug':                  `${BASE}/Dumbbell_Shrug/0.jpg`,
  // ── Spate / Masina ────────────────────────────────────────────
  'Leverage High Row':               `${BASE}/Leverage_High_Row/0.jpg`,
  'Leverage Iso Row':                `${BASE}/Leverage_Iso_Row/0.jpg`,
  'Smith Machine Bent Over Row':     `${BASE}/Smith_Machine_Bent_Over_Row/0.jpg`,
  'Lying T-Bar Row':                 `${BASE}/Lying_T-Bar_Row/0.jpg`,
  // ── Spate / Cablu & Greutate ──────────────────────────────────
  'Pull-up':                         `${BASE}/Wide-Grip_Rear_Pull-Up/0.jpg`,
  'Chin-up':                         `${BASE}/Chin-Up/0.jpg`,
  'Lat Pulldown':                    `${BASE}/Wide-Grip_Lat_Pulldown/0.jpg`,
  'Cable Row':                       `${BASE}/Seated_Cable_Rows/0.jpg`,
  'Face Pull':                       `${BASE}/Face_Pull/0.jpg`,

  // ── Umeri / Bara ──────────────────────────────────────────────
  'Overhead Press':                  `${BASE}/Barbell_Shoulder_Press/0.jpg`,
  'Upright Row':                     `${BASE}/Smith_Machine_Upright_Row/0.jpg`,
  // ── Umeri / Gantere ───────────────────────────────────────────
  'Dumbbell Shoulder Press':         `${BASE}/Dumbbell_Shoulder_Press/0.jpg`,
  'Lateral Raise':                   `${BASE}/Side_Lateral_Raise/0.jpg`,
  'Front Raise':                     `${BASE}/Front_Dumbbell_Raise/0.jpg`,
  'Arnold Press':                    `${BASE}/Arnold_Dumbbell_Press/0.jpg`,
  'Seated Dumbbell Press':           `${BASE}/Seated_Dumbbell_Press/0.jpg`,
  'Reverse Flyes':                   `${BASE}/Reverse_Flyes/0.jpg`,
  'Rear Delt Raise':                 `${BASE}/Seated_Bent-Over_Rear_Delt_Raise/0.jpg`,
  // ── Umeri / Masina ────────────────────────────────────────────
  'Shoulder Press Machine':          `${BASE}/Leverage_Shoulder_Press/0.jpg`,
  'Machine Shoulder Press':          `${BASE}/Machine_Shoulder_Military_Press/0.jpg`,
  'Reverse Machine Flyes':           `${BASE}/Reverse_Machine_Flyes/0.jpg`,
  'Smith Machine Shoulder Press':    `${BASE}/Smith_Machine_Overhead_Shoulder_Press/0.jpg`,

  // ── Biceps / Bara ─────────────────────────────────────────────
  'Barbell Curl':                    `${BASE}/Barbell_Curl/0.jpg`,
  'Preacher Curl':                   `${BASE}/Preacher_Curl/0.jpg`,
  // ── Biceps / Gantere ──────────────────────────────────────────
  'Dumbbell Curl':                   `${BASE}/Dumbbell_Bicep_Curl/0.jpg`,
  'Hammer Curl':                     `${BASE}/Hammer_Curls/0.jpg`,
  'Concentration Curl':              `${BASE}/Concentration_Curls/0.jpg`,
  'Dumbbell Alternate Curl':         `${BASE}/Dumbbell_Alternate_Bicep_Curl/0.jpg`,
  'Incline Dumbbell Curl':           `${BASE}/Incline_Dumbbell_Curl/0.jpg`,
  'Seated Dumbbell Curl':            `${BASE}/Seated_Dumbbell_Curl/0.jpg`,
  // ── Biceps / Masina & Cablu ───────────────────────────────────
  'Cable Curl':                      `${BASE}/Cable_Hammer_Curls_-_Rope_Attachment/0.jpg`,
  'Machine Bicep Curl':              `${BASE}/Machine_Bicep_Curl/0.jpg`,
  'Machine Preacher Curl':           `${BASE}/Machine_Preacher_Curls/0.jpg`,

  // ── Triceps / Bara ────────────────────────────────────────────
  'Skull Crusher':                   `${BASE}/EZ-Bar_Skullcrusher/0.jpg`,
  'Close Grip Bench Press':          `${BASE}/Close-Grip_Barbell_Bench_Press/0.jpg`,
  // ── Triceps / Gantere ─────────────────────────────────────────
  'Overhead Tricep Extension':       `${BASE}/Cable_Rope_Overhead_Triceps_Extension/0.jpg`,
  'Tricep Kickback':                 `${BASE}/Tricep_Dumbbell_Kickback/0.jpg`,
  'Lying Tricep Extension':          `${BASE}/Lying_Dumbbell_Tricep_Extension/0.jpg`,
  'Seated Tricep Extension':         `${BASE}/Seated_Triceps_Press/0.jpg`,
  'Standing Tricep Extension':       `${BASE}/Standing_Dumbbell_Triceps_Extension/0.jpg`,
  // ── Triceps / Masina & Cablu ──────────────────────────────────
  'Tricep Pushdown':                 `${BASE}/Triceps_Pushdown_-_Rope_Attachment/0.jpg`,
  'Tricep Dip':                      `${BASE}/Dips_-_Triceps_Version/0.jpg`,
  'Machine Tricep Extension':        `${BASE}/Machine_Triceps_Extension/0.jpg`,
  'Dip Machine':                     `${BASE}/Dip_Machine/0.jpg`,

  // ── Picioare / Bara ───────────────────────────────────────────
  'Squat':                           `${BASE}/Barbell_Full_Squat/0.jpg`,
  'Front Squat':                     `${BASE}/Front_Squat_Clean_Grip/0.jpg`,
  'Romanian Deadlift':               `${BASE}/Romanian_Deadlift/0.jpg`,
  'Lunges':                          `${BASE}/Barbell_Lunge/0.jpg`,
  'Hip Thrust':                      `${BASE}/Barbell_Hip_Thrust/0.jpg`,
  'Bulgarian Split Squat':           `${BASE}/Smith_Single-Leg_Split_Squat/0.jpg`,
  // ── Picioare / Gantere ────────────────────────────────────────
  'Dumbbell Lunges':                 `${BASE}/Dumbbell_Lunges/0.jpg`,
  'Dumbbell Squat':                  `${BASE}/Dumbbell_Squat/0.jpg`,
  'Stiff-Legged Dumbbell Deadlift':  `${BASE}/Stiff-Legged_Dumbbell_Deadlift/0.jpg`,
  'Split Squat':                     `${BASE}/Split_Squat_with_Dumbbells/0.jpg`,
  'Dumbbell Calf Raise':             `${BASE}/Standing_Dumbbell_Calf_Raise/0.jpg`,
  // ── Picioare / Masina ─────────────────────────────────────────
  'Leg Press':                       `${BASE}/Leg_Press/0.jpg`,
  'Leg Extension':                   `${BASE}/Leg_Extensions/0.jpg`,
  'Leg Curl':                        `${BASE}/Lying_Leg_Curls/0.jpg`,
  'Calf Raise':                      `${BASE}/Calf_Press/0.jpg`,
  'Hack Squat':                      `${BASE}/Hack_Squat/0.jpg`,
  'Seated Leg Curl':                 `${BASE}/Seated_Leg_Curl/0.jpg`,
  'Seated Calf Raise':               `${BASE}/Seated_Calf_Raise/0.jpg`,
  'Smith Machine Squat':             `${BASE}/Smith_Machine_Squat/0.jpg`,
  'Smith Machine Leg Press':         `${BASE}/Smith_Machine_Leg_Press/0.jpg`,

  // ── Abdomen / Greutate ────────────────────────────────────────
  'Plank':                           `${BASE}/Plank/0.jpg`,
  'Crunch':                          `${BASE}/Crunches/0.jpg`,
  'Leg Raise':                       `${BASE}/Hanging_Leg_Raise/0.jpg`,
  'Russian Twist':                   `${BASE}/Russian_Twist/0.jpg`,
  'Ab Wheel Rollout':                `${BASE}/Ab_Roller/0.jpg`,
  // ── Abdomen / Cablu & Masina ──────────────────────────────────
  'Cable Crunch':                    `${BASE}/Cable_Crunch/0.jpg`,
  'Ab Crunch Machine':               `${BASE}/Ab_Crunch_Machine/0.jpg`,
  // ── Abdomen / Gantere ─────────────────────────────────────────
  'Dumbbell Side Bend':              `${BASE}/Dumbbell_Side_Bend/0.jpg`,
}

export function getExerciseImage(name: string): string | undefined {
  return EXERCISE_IMAGES[name]
}
