import { useState } from 'react'

export default function SiteHeader() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header-inner">
          <div className="site-header-brand">
            Shreeji Furniture and Decors
          </div>
          
          <div className="site-header-search">
            <input 
              type="text"
              className="input"
              placeholder="Search for premium furniture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <nav className="site-header-nav">
            <a href="/">Home</a>
            <a href="/products">Collection</a>
            <a href="/admin/products">Admin</a>
            <a href="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
              Login
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

