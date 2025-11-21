import { useEffect, useState } from 'react'
import api from '../../lib/api'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loadingList, setLoadingList] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ title: '', description: '', category: '', condition: 'new', availability: true, image: null })
  const [editingId, setEditingId] = useState(null)

  const load = async () => {
    setLoadingList(true)
    setError('')
    try {
      const { data } = await api.get('/api/products')
      setProducts(data.products)
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load products')
    } finally {
      setLoadingList(false)
    }
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      console.log('Submitting form with data:', form)
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (v !== null && v !== undefined && v !== '') {
          console.log(`Adding to FormData: ${k} =`, v)
          fd.append(k, v)
        }
      })
      
      let response
      if (editingId) {
        console.log(`Making PUT request to /api/products/${editingId}`)
        response = await api.put(`/api/products/${editingId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      } else {
        console.log('Making POST request to /api/products')
        response = await api.post('/api/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      }
      console.log('Request successful:', response.data)
      
      setForm({ title: '', description: '', category: '', condition: 'new', availability: true, image: null })
      setEditingId(null)
      await load()
    } catch (e) {
      console.error('Request failed:', e)
      console.error('Error response:', e?.response)
      const msg = e?.response?.data?.message || 'Create/Update failed'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const onEdit = (p) => {
    setEditingId(p._id)
    setForm({ title: p.title, description: p.description, category: p.category, condition: p.condition, availability: p.availability, image: null })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onDelete = async (id) => {
    setError('')
    try {
      await api.delete(`/api/products/${id}`)
      await load()
    } catch (e) {
      setError(e?.response?.data?.message || 'Delete failed')
    }
  }

  return (
    <div>
      <h2>Admin: Products</h2>
      {error && (
        <div style={{ background: '#ffe1e1', color: '#900', padding: 8, marginBottom: 12, border: '1px solid #f5b5b5' }}>{error}</div>
      )}
      <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 520, opacity: submitting ? 0.7 : 1 }}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} disabled={submitting} />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} disabled={submitting} />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} disabled={submitting} />
        <select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} disabled={submitting}>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
        <label>
          <input type="checkbox" checked={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.checked })} disabled={submitting} />
          Available
        </label>
        <input type="file" onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })} disabled={submitting} />
        <button type="submit" disabled={submitting}>{submitting ? (editingId ? 'Updating…' : 'Creating…') : (editingId ? 'Update' : 'Create')} Product</button>
      </form>

      <div style={{ marginTop: 24 }}>
        <h3>Existing</h3>
        {loadingList ? (
          <div>Loading products…</div>
        ) : products.length === 0 ? (
          <div>No products yet.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {products.map(p => (
              <div key={p._id} style={{ border: '1px solid #ddd', padding: 12 }}>
                <img src={p.image} alt={p.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                <div style={{ fontWeight: 600 }}>{p.title}</div>
                <div style={{ fontSize: '0.875rem', color: '#666' }}>Contact for Price</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <button onClick={() => onEdit(p)} disabled={submitting}>Edit</button>
                  <button onClick={() => onDelete(p._id)} disabled={submitting}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

