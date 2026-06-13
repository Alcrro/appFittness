import { ExerciseProgressSection } from '../components/ExerciseProgressSection'
import { BodyWeightSection } from '../components/BodyWeightSection'

export function ProgressPage() {
  return (
    <div className="space-y-6 pt-2">
      <ExerciseProgressSection />
      <BodyWeightSection />
    </div>
  )
}
