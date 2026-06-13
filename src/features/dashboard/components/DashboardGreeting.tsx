interface DashboardGreetingProps {
  name: string
}

export function DashboardGreeting({ name }: DashboardGreetingProps) {
  return (
    <div>
      <p className="text-gray-400 text-sm">Bună ziua,</p>
      <h2 className="text-2xl font-black text-white">{name} 👋</h2>
    </div>
  )
}
