export default function SiteFooter() {
  return (
    <footer style={{
      background: 'var(--color-primary)',
      color: 'var(--color-white)',
      padding: '3rem 0 1.5rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '2rem'
        }}>
          {/* Brand Section */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              marginBottom: '1rem',
              color: 'var(--color-accent-gold)'
            }}>
              Shreeji Furniture
            </h3>
            <p style={{
              color: 'var(--color-neutral-300)',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              Creating timeless furniture pieces that transform your living spaces into sanctuaries of elegance and comfort.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                background: 'var(--color-neutral-700)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-white)',
                transition: 'var(--transition)'
              }}>
                📘
              </a>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                background: 'var(--color-neutral-700)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-white)',
                transition: 'var(--transition)'
              }}>
                📷
              </a>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                background: 'var(--color-neutral-700)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-white)',
                transition: 'var(--transition)'
              }}>
                🐦
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'var(--color-white)'
            }}>
              Quick Links
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {['Home', 'Collection', 'About Us', 'Contact', 'Blog'].map(link => (
                <li key={link} style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{
                    color: 'var(--color-neutral-300)',
                    textDecoration: 'none',
                    transition: 'var(--transition)'
                  }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'var(--color-white)'
            }}>
              Categories
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {['Living Room', 'Bedroom', 'Dining Room', 'Office', 'Outdoor'].map(category => (
                <li key={category} style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{
                    color: 'var(--color-neutral-300)',
                    textDecoration: 'none',
                    transition: 'var(--transition)'
                  }}>
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'var(--color-white)'
            }}>
              Get in Touch
            </h4>
            <div style={{
              color: 'var(--color-neutral-300)',
              lineHeight: '1.6'
            }}>
              <p style={{ marginBottom: '0.5rem' }}>📍F-17 , opp.venice mall , gate no 2 , site 4 , greater noida</p>
              <p style={{ marginBottom: '0.5rem' }}>📞 +91 9258795324</p>
              <p style={{ marginBottom: '0.5rem' }}>✉️ shreejifurniture2024@gmail.com</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--color-neutral-700)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{
            color: 'var(--color-neutral-400)',
            fontSize: '0.875rem',
            margin: 0
          }}>
            © {new Date().getFullYear()} Shreeji Furniture. All rights reserved.
          </p>
          <div style={{
            display: 'flex',
            gap: '2rem',
            fontSize: '0.875rem'
          }}>
            <a href="#" style={{
              color: 'var(--color-neutral-400)',
              textDecoration: 'none'
            }}>Privacy Policy</a>
            <a href="#" style={{
              color: 'var(--color-neutral-400)',
              textDecoration: 'none'
            }}>Terms of Service</a>
            <a href="#" style={{
              color: 'var(--color-neutral-400)',
              textDecoration: 'none'
            }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}





