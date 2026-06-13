import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../shared/context/AuthContext'
import { useWorkouts } from '../../workouts/hooks/useWorkouts'
import { useSessions } from '../../session/hooks/useSessions'
import { getWeeklyCount } from '../utils/formatters'
import { DashboardGreeting } from '../components/DashboardGreeting'
import { StatsGrid } from '../components/StatsGrid'
import { WorkoutQuickStart } from '../components/WorkoutQuickStart'
import { LastSessionCard } from '../components/LastSessionCard'
import { ProgressBanner } from '../components/ProgressBanner'

export function DashboardPage() {
  const { user } = useAuth()
  const { workouts } = useWorkouts()
  const { sessions } = useSessions()
  const navigate = useNavigate()

  const name = (user?.user_metadata?.full_name as string | undefined)?.split(' ')[0] ?? 'Sportiv'
  const lastSession = sessions.find(s => s.finished_at)

  return (
    <div className="space-y-6 pt-2">
      <DashboardGreeting name={name} />

      <StatsGrid
        weeklyCount={getWeeklyCount(sessions)}
        totalCount={sessions.filter(s => s.finished_at).length}
        plansCount={workouts.length}
      />

      <WorkoutQuickStart
        workouts={workouts}
        onStart={id => navigate(`/sesiune/${id}`)}
        onViewAll={() => navigate('/antrenamente')}
        onCreatePlan={() => navigate('/antrenamente')}
      />

      {lastSession && <LastSessionCard session={lastSession} />}

      <ProgressBanner onClick={() => navigate('/progres')} />
    </div>
  )
}
