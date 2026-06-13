const RPE_OPTIONS = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]

interface RpeSelectorProps {
  value: string
  onSelect: (value: string) => void
  onClose: () => void
}

export function RpeSelector({ value, onSelect, onClose }: RpeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {RPE_OPTIONS.map(r => (
        <button
          key={r}
          onClick={() => { onSelect(String(r)); onClose() }}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
            Number(value) === r ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          {r}
        </button>
      ))}
      <button
        onClick={() => { onSelect(''); onClose() }}
        className="px-2.5 py-1 rounded-lg text-xs text-gray-500 hover:bg-gray-800"
      >
        Șterge
      </button>
    </div>
  )
}
