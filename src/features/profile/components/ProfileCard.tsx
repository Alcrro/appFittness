import { Card } from '../../../shared/components/atoms/Card'
import { User } from 'lucide-react'

interface ProfileCardProps {
  name: string
  email: string
}

export function ProfileCard({ name, email }: ProfileCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center">
          <User size={28} className="text-orange-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{name}</h2>
          <p className="text-gray-400 text-sm">{email}</p>
        </div>
      </div>
    </Card>
  )
}
