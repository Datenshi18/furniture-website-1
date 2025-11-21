import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div>
      <SiteHeader />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 16 }}>
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  )
}





