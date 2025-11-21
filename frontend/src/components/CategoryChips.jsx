import { useState } from 'react'

const CATEGORIES = [
  { key: '', label: 'All' },
  { key: 'bedroom', label: 'Bedroom' },
  { key: 'living room', label: 'Living Room' },
  { key: 'dining room', label: 'Dining Room' },
  { key: 'office', label: 'Office' },
  { key: 'outdoor', label: 'Outdoor' },
  { key: 'decor', label: 'Decor' },
]

export default function CategoryChips({ onSelect }) {
  const [activeCategory, setActiveCategory] = useState('')

  const handleCategorySelect = (category) => {
    setActiveCategory(category)
    onSelect?.(category)
  }

  return (
    <div style={{
      background: 'var(--color-white)',
      borderBottom: '1px solid var(--color-neutral-100)',
      padding: '1rem 0'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem'
        }}>
          {CATEGORIES.map(c => (
            <button 
              key={c.key} 
              onClick={() => handleCategorySelect(c.key)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--border-radius)',
                border: activeCategory === c.key 
                  ? '1px solid var(--color-accent-gold)' 
                  : '1px solid var(--color-neutral-200)',
                background: activeCategory === c.key 
                  ? 'var(--color-accent-gold)' 
                  : 'var(--color-white)',
                color: activeCategory === c.key 
                  ? 'var(--color-white)' 
                  : 'var(--color-neutral-600)',
                whiteSpace: 'nowrap',
                fontSize: '0.875rem',
                fontWeight: '500',
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                transition: 'var(--transition)',
                boxShadow: activeCategory === c.key 
                  ? 'var(--shadow-sm)' 
                  : 'none'
              }}
              onMouseOver={(e) => {
                if (activeCategory !== c.key) {
                  e.target.style.borderColor = 'var(--color-neutral-300)'
                  e.target.style.background = 'var(--color-neutral-50)'
                }
              }}
              onMouseOut={(e) => {
                if (activeCategory !== c.key) {
                  e.target.style.borderColor = 'var(--color-neutral-200)'
                  e.target.style.background = 'var(--color-white)'
                }
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}





