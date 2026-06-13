import { useLocation } from 'react-router-dom'

const PAGE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/antrenamente': 'Antrenamente',
  '/istoric': 'Istoric',
  '/progres': 'Progres',
  '/profil': 'Profil',
}

export function Header() {
  const location = useLocation()
  const title = PAGE_TITLES[location.pathname] ?? 'AppFitness'

  return (
    <header className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-orange-500 font-black text-xl">AF</span>
          <h1 className="text-white font-bold text-lg">{title}</h1>
        </div>
      </div>
    </header>
  )
}
