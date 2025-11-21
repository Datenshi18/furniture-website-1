import { useEffect, useState } from 'react'
import CategoryChips from '../components/CategoryChips'
import api from '../lib/api'
import { Link } from 'react-router-dom'

export default function Home() {
  const [category, setCategory] = useState('')
  const [data, setData] = useState({ products: [], total: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    api.get('/api/products', { params: { category: category || undefined } }).then(({ data }) => {
      if (mounted) setData(data)
    }).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [category])

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #fafaf9 0%, #f5f5f4 100%)',
        padding: '6rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div className="hero-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
            minHeight: '60vh'
          }}>
            <div style={{ zIndex: 2 }}>
              <h1 className="hero-title" style={{
                fontSize: '3.5rem',
                fontWeight: '600',
                lineHeight: '1.1',
                marginBottom: '1.5rem',
                color: 'var(--color-primary)',
                letterSpacing: '-0.02em'
              }}>
                Timeless Elegance,{' '}
                <span style={{ color: 'var(--color-accent-gold)' }}>Crafted to Perfection</span>
              </h1>
              <p style={{
                fontSize: '1.125rem',
                color: 'var(--color-neutral-600)',
                marginBottom: '2.5rem',
                lineHeight: '1.7',
                maxWidth: '500px'
              }}>
                Discover our curated collection of premium furniture that transforms spaces into sanctuaries of comfort and sophistication.
              </p>
              <div className="hero-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <a href="#collection" className="btn btn-primary" style={{
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}>
                  Explore Collection
                </a>
                <a href="#about" className="btn btn-secondary" style={{
                  padding: '1rem 2rem',
                  fontSize: '1rem'
                }}>
                  Our Story
                </a>
              </div>
            </div>
            
            <div style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{
                width: '400px',
                height: '400px',
                background: 'var(--color-accent-gold)',
                borderRadius: '50%',
                position: 'absolute',
                opacity: '0.1',
                animation: 'float 6s ease-in-out infinite'
              }}></div>
              {/* Premium Furniture Preview Image */}
              <div style={{
                width: '300px',
                height: '300px',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 2
              }}>
                <img 
                  src="/path/to/your/premium-furniture-image.jpg" 
                  alt="Premium Furniture Collection" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onError={(e) => {
                    e.target.style.opacity = '0.7';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Animation */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </section>

      {/* Category Filter */}
      <section style={{
        padding: '3rem 0',
        background: 'var(--color-white)',
        borderBottom: '1px solid var(--color-neutral-100)'
      }}>
        <div className="container">
          <CategoryChips onSelect={setCategory} />
        </div>
      </section>

      {/* Products Section */}
      <main id="collection" className="container" style={{ padding: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: 'var(--color-primary)'
          }}>
            {category ? `${category} Collection` : 'Featured Collection'}
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--color-neutral-600)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Each piece is carefully selected and crafted to bring luxury and comfort to your living spaces.
          </p>
        </div>
        
        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid var(--color-neutral-200)',
              borderTop: '3px solid var(--color-accent-gold)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : (
          <div className="products-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {data.products.map(p => (
              <Link 
                key={p._id} 
                to={`/products/${p._id}`} 
                className="card"
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  aspectRatio: '4/3'
                }}>
                  <img 
                    src={p.image || 'https://via.placeholder.com/400x300?text=Premium+Furniture'} 
                    alt={p.title} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'var(--transition)'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: 'var(--color-primary)'
                  }}>
                    {p.title}
                  </h3>
                  <button 
                    className="btn btn-accent"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/contact';
                    }}
                  >
                    Contact Us for Price
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {data.products.length === 0 && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 0',
            color: 'var(--color-neutral-500)'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>No products found</h3>
            <p>Try adjusting your search or browse our full collection.</p>
          </div>
        )}
      </main>
      
      {/* Features Section */}
      <section style={{
        background: 'var(--color-neutral-50)',
        padding: '4rem 0'
      }}>
        <div className="container">
          <div className="features-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--color-accent-gold)',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-white)',
                fontSize: '1.5rem'
              }}>✨</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Premium Quality</h3>
              <p style={{ color: 'var(--color-neutral-600)' }}>Handcrafted with the finest materials</p>
            </div>
            <div>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--color-accent-gold)',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-white)',
                fontSize: '1.5rem'
              }}>🚚</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Free Delivery</h3>
              <p style={{ color: 'var(--color-neutral-600)' }}>Complimentary delivery to your doorstep</p>
            </div>
            <div>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--color-accent-gold)',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-white)',
                fontSize: '1.5rem'
              }}>🛡️</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Warranty</h3>
              <p style={{ color: 'var(--color-neutral-600)' }}>Comprehensive protection for your investment</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

