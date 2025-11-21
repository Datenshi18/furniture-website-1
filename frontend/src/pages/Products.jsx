import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'

export default function Products() {
  const [data, setData] = useState({ products: [], total: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    api.get('/api/products').then(({ data }) => {
      if (mounted) setData(data)
    }).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  if (loading) return <div>Loading...</div>
  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {data.products.map(p => (
          <Link key={p._id} to={`/products/${p._id}`} style={{ border: '1px solid #ddd', padding: 12, textDecoration: 'none', color: 'inherit' }}>
            <img src={p.image} alt={p.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
            <div style={{ marginTop: 8, fontWeight: 600 }}>{p.title}</div>
            <div>₹ {p.price}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}





