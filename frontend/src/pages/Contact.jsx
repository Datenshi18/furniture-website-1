import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', product: '', message: '' })
      setSubmitting(false)
    }, 1000)
  }

  return (
    <div style={{
      minHeight: '80vh',
      background: 'linear-gradient(135deg, #fafaf9 0%, #f5f5f4 100%)',
      padding: '4rem 0'
    }}>
      <div className="container">
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-heading)'
          }}>
            Contact Us
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--color-neutral-600)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Get personalized quotes and expert furniture advice from our team.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Contact Information */}
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '2rem',
              color: 'var(--color-primary)'
            }}>
              Visit Our Showroom
            </h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: 'var(--color-primary)'
              }}>
                📍 Our Location
              </h3>
              <p style={{ color: 'var(--color-neutral-600)' }}>
                Gate No 2, Venice Mall<br/>
                Greater Noida, Uttar Pradesh
              </p>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: 'var(--color-primary)'
              }}>
                📞 Call Us
              </h3>
              <p>
                <a href="tel:+917668287273" style={{
                  color: 'var(--color-accent-gold)',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>
                  +91 76682 87273
                </a>
              </p>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: 'var(--color-primary)'
              }}>
                ✉️ Email Us
              </h3>
              <p>
                <a href="mailto:shreejifurniture2024@gmail.com" style={{
                  color: 'var(--color-accent-gold)',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>
                  shreejifurniture2024@gmail.com
                </a>
              </p>
            </div>
            
            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: 'var(--color-primary)'
              }}>
                🕰️ Business Hours
              </h3>
              <div style={{ color: 'var(--color-neutral-600)' }}>
                <p><strong>Mon - Sat:</strong> 10:00 AM - 8:00 PM</p>
                <p><strong>Sunday:</strong> 11:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'var(--color-primary)'
            }}>
              Send us a Message
            </h2>
            
            {success && (
              <div style={{
                background: '#f0f9ff',
                color: '#0369a1',
                padding: '1rem',
                borderRadius: 'var(--border-radius)',
                marginBottom: '1rem',
                border: '1px solid #bae6fd'
              }}>
                Thank you! We'll get back to you within 24 hours.
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  disabled={submitting}
                />
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <input
                    type="email"
                    className="input"
                    placeholder="Email *"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    disabled={submitting}
                  />
                  <input
                    type="tel"
                    className="input"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    disabled={submitting}
                  />
                </div>
                
                <input
                  type="text"
                  className="input"
                  placeholder="Product of Interest (e.g., Sofa, Dining Table)"
                  value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                  disabled={submitting}
                />
                
                <textarea
                  className="input"
                  rows={4}
                  placeholder="Tell us about your requirements..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  disabled={submitting}
                  style={{ resize: 'vertical' }}
                />
                
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem'
                  }}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}