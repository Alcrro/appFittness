import { Dumbbell } from 'lucide-react'

export function AuthHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-2xl mb-4">
        <Dumbbell size={32} className="text-orange-500" />
      </div>
      <h1 className="text-3xl font-black text-white">AppFitness</h1>
      <p className="text-gray-400 mt-1">Trackează-ți progresul la sală</p>
    </div>
  )
}
