import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../lib/api'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    api.get(`/api/products/${id}`).then(({ data }) => {
      if (mounted) setProduct(data)
    }).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!product) return <div>Not found</div>

  return (
    <div style={{
      minHeight: '80vh',
      background: 'linear-gradient(135deg, #fafaf9 0%, #f5f5f4 100%)',
      padding: '4rem 0'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div>
            <img 
              src={product.image} 
              alt={product.title} 
              style={{ 
                width: '100%', 
                aspectRatio: '4/3',
                objectFit: 'cover',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: 'var(--shadow-lg)'
              }} 
            />
          </div>
          
          <div style={{ padding: '2rem 0' }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-heading)'
            }}>
              {product.title}
            </h1>
            
            <div style={{
              background: 'var(--color-accent-gold)',
              color: 'var(--color-white)',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--border-radius)',
              display: 'inline-block',
              marginBottom: '2rem',
              fontSize: '1.125rem',
              fontWeight: '500'
            }}>
              Contact Us for Price
            </div>
            
            <div style={{
              marginBottom: '2rem',
              padding: '1rem 0',
              borderTop: '1px solid var(--color-neutral-200)',
              borderBottom: '1px solid var(--color-neutral-200)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <span style={{ fontWeight: '600' }}>Category:</span>
                <span style={{ color: 'var(--color-neutral-600)' }}>{product.category}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <span style={{ fontWeight: '600' }}>Condition:</span>
                <span style={{ 
                  color: 'var(--color-neutral-600)',
                  textTransform: 'capitalize'
                }}>{product.condition}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between'
              }}>
                <span style={{ fontWeight: '600' }}>Availability:</span>
                <span style={{ 
                  color: product.availability ? 'var(--color-accent-gold)' : 'var(--color-neutral-400)'
                }}>
                  {product.availability ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
            
            <p style={{
              fontSize: '1.125rem',
              lineHeight: '1.7',
              color: 'var(--color-neutral-600)',
              marginBottom: '2rem'
            }}>
              {product.description}
            </p>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/contact')}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                Get Quote
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => window.history.back()}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1rem'
                }}
              >
                Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}





