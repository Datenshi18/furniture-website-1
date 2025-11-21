import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { authState } from '../state/auth'
import api from '../lib/api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const setAuth = useSetRecoilState(authState)
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@tirthfurniture.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data } = await api.post('/api/auth/login', { email, password })
      setAuth({ token: data.token, user: data.user })
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fafaf9 0%, #f5f5f4 100%)'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: 'var(--color-primary)'
          }}>
            Welcome Back
          </h1>
          <p style={{
            color: 'var(--color-neutral-600)',
            fontSize: '0.9rem'
          }}>
            Sign in to access your account
          </p>
        </div>
        
        <form onSubmit={onSubmit}>
          {error && (
            <div style={{
              background: '#fef2f2',
              color: '#dc2626',
              padding: '0.75rem',
              borderRadius: 'var(--border-radius)',
              fontSize: '0.875rem',
              marginBottom: '1rem',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--color-neutral-700)',
                marginBottom: '0.5rem'
              }}>
                Email Address
              </label>
              <input 
                type="email"
                className="input"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--color-neutral-700)',
                marginBottom: '0.5rem'
              }}>
                Password
              </label>
              <input 
                type="password" 
                className="input"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button 
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{
                width: '100%',
                marginTop: '1rem',
                padding: '0.875rem'
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
        
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--color-neutral-200)'
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--color-neutral-600)'
          }}>
            Don't have an account?{' '}
            <a href="#" style={{
              color: 'var(--color-accent-gold)',
              fontWeight: '500'
            }}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}





