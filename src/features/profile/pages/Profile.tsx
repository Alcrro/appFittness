import { useState } from 'react'
import { useAuth } from '../../../shared/context/AuthContext'
import { useSessions } from '../../session/hooks/useSessions'
import { useWorkouts } from '../../workouts/hooks/useWorkouts'
import { ProfileCard } from '../components/ProfileCard'
import { ProfileStats } from '../components/ProfileStats'
import { Button } from '../../../shared/components/atoms/Button'
import { getTotalMins, formatTotalTime, getWeeklyCount } from '../utils/statsUtils'
import { LogOut } from 'lucide-react'

export function ProfilePage() {
  const { user, signOut } = useAuth()
  const { sessions } = useSessions()
  const { workouts } = useWorkouts()
  const [signingOut, setSigningOut] = useState(false)

  const finished = sessions.filter(s => s.finished_at)

  async function handleSignOut() {
    setSigningOut(true)
    await signOut()
  }

  return (
    <div className="space-y-6 pt-2">
      <ProfileCard
        name={(user?.user_metadata?.full_name as string | undefined) ?? 'Utilizator'}
        email={user?.email ?? ''}
      />

      <ProfileStats
        totalSessions={finished.length}
        weeklyCount={getWeeklyCount(finished)}
        totalTime={formatTotalTime(getTotalMins(finished))}
        plansCount={workouts.length}
      />

      <Button variant="secondary" className="w-full" onClick={handleSignOut} disabled={signingOut}>
        <LogOut size={16} />
        {signingOut ? 'Se deconectează...' : 'Deconectare'}
      </Button>
    </div>
  )
}
