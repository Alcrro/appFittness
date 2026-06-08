import type { Exercise } from '../types'

export const DEFAULT_EXERCISES: Omit<Exercise, 'id' | 'user_id' | 'created_at'>[] = [
  // Piept - Bara
  { name: 'Bench Press', muscle_group: 'Piept', equipment: 'Bara', is_custom: false },
  { name: 'Incline Bench Press', muscle_group: 'Piept', equipment: 'Bara', is_custom: false },
  { name: 'Decline Bench Press', muscle_group: 'Piept', equipment: 'Bara', is_custom: false },
  // Piept - Gantere
  { name: 'Dumbbell Fly', muscle_group: 'Piept', equipment: 'Gantere', is_custom: false },
  { name: 'Dumbbell Bench Press', muscle_group: 'Piept', equipment: 'Gantere', is_custom: false },
  { name: 'Incline Dumbbell Press', muscle_group: 'Piept', equipment: 'Gantere', is_custom: false },
  { name: 'Decline Dumbbell Press', muscle_group: 'Piept', equipment: 'Gantere', is_custom: false },
  { name: 'Incline Dumbbell Fly', muscle_group: 'Piept', equipment: 'Gantere', is_custom: false },
  { name: 'Decline Dumbbell Fly', muscle_group: 'Piept', equipment: 'Gantere', is_custom: false },
  { name: 'Dumbbell Pullover', muscle_group: 'Piept', equipment: 'Gantere', is_custom: false },
  { name: 'Around The Worlds', muscle_group: 'Piept', equipment: 'Gantere', is_custom: false },
  // Piept - Masina
  { name: 'Butterfly Machine', muscle_group: 'Piept', equipment: 'Masina', is_custom: false },
  { name: 'Chest Press Machine', muscle_group: 'Piept', equipment: 'Masina', is_custom: false },
  { name: 'Incline Chest Press Machine', muscle_group: 'Piept', equipment: 'Masina', is_custom: false },
  { name: 'Decline Chest Press Machine', muscle_group: 'Piept', equipment: 'Masina', is_custom: false },
  { name: 'Smith Machine Bench Press', muscle_group: 'Piept', equipment: 'Masina', is_custom: false },
  { name: 'Smith Machine Incline Press', muscle_group: 'Piept', equipment: 'Masina', is_custom: false },
  { name: 'Smith Machine Decline Press', muscle_group: 'Piept', equipment: 'Masina', is_custom: false },
  // Piept - Cablu & Greutate corporala
  { name: 'Cable Crossover', muscle_group: 'Piept', equipment: 'Cablu', is_custom: false },
  { name: 'Push-up', muscle_group: 'Piept', equipment: 'Greutate corporala', is_custom: false },
  { name: 'Chest Dip', muscle_group: 'Piept', equipment: 'Greutate corporala', is_custom: false },
  // Spate - Bara
  { name: 'Deadlift', muscle_group: 'Spate', equipment: 'Bara', is_custom: false },
  { name: 'Barbell Row', muscle_group: 'Spate', equipment: 'Bara', is_custom: false },
  // Spate - Gantere
  { name: 'Dumbbell Row', muscle_group: 'Spate', equipment: 'Gantere', is_custom: false },
  { name: 'One-Arm Dumbbell Row', muscle_group: 'Spate', equipment: 'Gantere', is_custom: false },
  { name: 'Bent Over Dumbbell Row', muscle_group: 'Spate', equipment: 'Gantere', is_custom: false },
  { name: 'Dumbbell Incline Row', muscle_group: 'Spate', equipment: 'Gantere', is_custom: false },
  { name: 'Dumbbell Shrug', muscle_group: 'Spate', equipment: 'Gantere', is_custom: false },
  // Spate - Masina
  { name: 'Leverage High Row', muscle_group: 'Spate', equipment: 'Masina', is_custom: false },
  { name: 'Leverage Iso Row', muscle_group: 'Spate', equipment: 'Masina', is_custom: false },
  { name: 'Smith Machine Bent Over Row', muscle_group: 'Spate', equipment: 'Masina', is_custom: false },
  { name: 'Lying T-Bar Row', muscle_group: 'Spate', equipment: 'Masina', is_custom: false },
  // Spate - Cablu & Greutate
  { name: 'Pull-up', muscle_group: 'Spate', equipment: 'Greutate corporala', is_custom: false },
  { name: 'Chin-up', muscle_group: 'Spate', equipment: 'Greutate corporala', is_custom: false },
  { name: 'Lat Pulldown', muscle_group: 'Spate', equipment: 'Cablu', is_custom: false },
  { name: 'Cable Row', muscle_group: 'Spate', equipment: 'Cablu', is_custom: false },
  { name: 'Face Pull', muscle_group: 'Spate', equipment: 'Cablu', is_custom: false },
  // Umeri - Bara
  { name: 'Overhead Press', muscle_group: 'Umeri', equipment: 'Bara', is_custom: false },
  { name: 'Upright Row', muscle_group: 'Umeri', equipment: 'Bara', is_custom: false },
  // Umeri - Gantere
  { name: 'Dumbbell Shoulder Press', muscle_group: 'Umeri', equipment: 'Gantere', is_custom: false },
  { name: 'Lateral Raise', muscle_group: 'Umeri', equipment: 'Gantere', is_custom: false },
  { name: 'Front Raise', muscle_group: 'Umeri', equipment: 'Gantere', is_custom: false },
  { name: 'Arnold Press', muscle_group: 'Umeri', equipment: 'Gantere', is_custom: false },
  { name: 'Seated Dumbbell Press', muscle_group: 'Umeri', equipment: 'Gantere', is_custom: false },
  { name: 'Reverse Flyes', muscle_group: 'Umeri', equipment: 'Gantere', is_custom: false },
  { name: 'Rear Delt Raise', muscle_group: 'Umeri', equipment: 'Gantere', is_custom: false },
  // Umeri - Masina
  { name: 'Shoulder Press Machine', muscle_group: 'Umeri', equipment: 'Masina', is_custom: false },
  { name: 'Machine Shoulder Press', muscle_group: 'Umeri', equipment: 'Masina', is_custom: false },
  { name: 'Reverse Machine Flyes', muscle_group: 'Umeri', equipment: 'Masina', is_custom: false },
  { name: 'Smith Machine Shoulder Press', muscle_group: 'Umeri', equipment: 'Masina', is_custom: false },
  // Biceps - Bara
  { name: 'Barbell Curl', muscle_group: 'Biceps', equipment: 'Bara', is_custom: false },
  { name: 'Preacher Curl', muscle_group: 'Biceps', equipment: 'Bara', is_custom: false },
  // Biceps - Gantere
  { name: 'Dumbbell Curl', muscle_group: 'Biceps', equipment: 'Gantere', is_custom: false },
  { name: 'Hammer Curl', muscle_group: 'Biceps', equipment: 'Gantere', is_custom: false },
  { name: 'Concentration Curl', muscle_group: 'Biceps', equipment: 'Gantere', is_custom: false },
  { name: 'Dumbbell Alternate Curl', muscle_group: 'Biceps', equipment: 'Gantere', is_custom: false },
  { name: 'Incline Dumbbell Curl', muscle_group: 'Biceps', equipment: 'Gantere', is_custom: false },
  { name: 'Seated Dumbbell Curl', muscle_group: 'Biceps', equipment: 'Gantere', is_custom: false },
  // Biceps - Masina & Cablu
  { name: 'Cable Curl', muscle_group: 'Biceps', equipment: 'Cablu', is_custom: false },
  { name: 'Machine Bicep Curl', muscle_group: 'Biceps', equipment: 'Masina', is_custom: false },
  { name: 'Machine Preacher Curl', muscle_group: 'Biceps', equipment: 'Masina', is_custom: false },
  // Triceps - Bara
  { name: 'Skull Crusher', muscle_group: 'Triceps', equipment: 'Bara', is_custom: false },
  { name: 'Close Grip Bench Press', muscle_group: 'Triceps', equipment: 'Bara', is_custom: false },
  // Triceps - Gantere
  { name: 'Overhead Tricep Extension', muscle_group: 'Triceps', equipment: 'Gantere', is_custom: false },
  { name: 'Tricep Kickback', muscle_group: 'Triceps', equipment: 'Gantere', is_custom: false },
  { name: 'Lying Tricep Extension', muscle_group: 'Triceps', equipment: 'Gantere', is_custom: false },
  { name: 'Seated Tricep Extension', muscle_group: 'Triceps', equipment: 'Gantere', is_custom: false },
  { name: 'Standing Tricep Extension', muscle_group: 'Triceps', equipment: 'Gantere', is_custom: false },
  // Triceps - Masina & Cablu
  { name: 'Tricep Pushdown', muscle_group: 'Triceps', equipment: 'Cablu', is_custom: false },
  { name: 'Tricep Dip', muscle_group: 'Triceps', equipment: 'Greutate corporala', is_custom: false },
  { name: 'Machine Tricep Extension', muscle_group: 'Triceps', equipment: 'Masina', is_custom: false },
  { name: 'Dip Machine', muscle_group: 'Triceps', equipment: 'Masina', is_custom: false },
  // Picioare - Bara
  { name: 'Squat', muscle_group: 'Picioare', equipment: 'Bara', is_custom: false },
  { name: 'Front Squat', muscle_group: 'Picioare', equipment: 'Bara', is_custom: false },
  { name: 'Romanian Deadlift', muscle_group: 'Picioare', equipment: 'Bara', is_custom: false },
  { name: 'Lunges', muscle_group: 'Picioare', equipment: 'Bara', is_custom: false },
  { name: 'Hip Thrust', muscle_group: 'Picioare', equipment: 'Bara', is_custom: false },
  { name: 'Bulgarian Split Squat', muscle_group: 'Picioare', equipment: 'Gantere', is_custom: false },
  // Picioare - Gantere
  { name: 'Dumbbell Lunges', muscle_group: 'Picioare', equipment: 'Gantere', is_custom: false },
  { name: 'Dumbbell Squat', muscle_group: 'Picioare', equipment: 'Gantere', is_custom: false },
  { name: 'Stiff-Legged Dumbbell Deadlift', muscle_group: 'Picioare', equipment: 'Gantere', is_custom: false },
  { name: 'Split Squat', muscle_group: 'Picioare', equipment: 'Gantere', is_custom: false },
  { name: 'Dumbbell Calf Raise', muscle_group: 'Picioare', equipment: 'Gantere', is_custom: false },
  // Picioare - Masina
  { name: 'Leg Press', muscle_group: 'Picioare', equipment: 'Masina', is_custom: false },
  { name: 'Leg Extension', muscle_group: 'Picioare', equipment: 'Masina', is_custom: false },
  { name: 'Leg Curl', muscle_group: 'Picioare', equipment: 'Masina', is_custom: false },
  { name: 'Calf Raise', muscle_group: 'Picioare', equipment: 'Masina', is_custom: false },
  { name: 'Hack Squat', muscle_group: 'Picioare', equipment: 'Masina', is_custom: false },
  { name: 'Seated Leg Curl', muscle_group: 'Picioare', equipment: 'Masina', is_custom: false },
  { name: 'Seated Calf Raise', muscle_group: 'Picioare', equipment: 'Masina', is_custom: false },
  { name: 'Smith Machine Squat', muscle_group: 'Picioare', equipment: 'Masina', is_custom: false },
  { name: 'Smith Machine Leg Press', muscle_group: 'Picioare', equipment: 'Masina', is_custom: false },
  // Abdomen - Greutate corporala
  { name: 'Plank', muscle_group: 'Abdomen', equipment: 'Greutate corporala', is_custom: false },
  { name: 'Crunch', muscle_group: 'Abdomen', equipment: 'Greutate corporala', is_custom: false },
  { name: 'Leg Raise', muscle_group: 'Abdomen', equipment: 'Greutate corporala', is_custom: false },
  { name: 'Russian Twist', muscle_group: 'Abdomen', equipment: 'Greutate corporala', is_custom: false },
  { name: 'Ab Wheel Rollout', muscle_group: 'Abdomen', equipment: 'Alt echipament', is_custom: false },
  // Abdomen - Masina & Cablu
  { name: 'Cable Crunch', muscle_group: 'Abdomen', equipment: 'Cablu', is_custom: false },
  { name: 'Ab Crunch Machine', muscle_group: 'Abdomen', equipment: 'Masina', is_custom: false },
  // Abdomen - Gantere
  { name: 'Dumbbell Side Bend', muscle_group: 'Abdomen', equipment: 'Gantere', is_custom: false },
]

export const MUSCLE_GROUPS = ['Piept', 'Spate', 'Umeri', 'Biceps', 'Triceps', 'Picioare', 'Abdomen'] as const
export type MuscleGroup = typeof MUSCLE_GROUPS[number]

export const EQUIPMENT_TYPES = [
  'Bara', 'Gantere', 'Cablu', 'Masina', 'Greutate corporala', 'Alt echipament',
] as const

export function calculate1RM(weight: number, reps: number): number {
  if (reps === 1) return weight
  return Math.round(weight * (1 + reps / 30))
}
