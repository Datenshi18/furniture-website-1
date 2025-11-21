import { useRecoilValue } from 'recoil'
import { authState } from '../state/auth'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { token, user } = useRecoilValue(authState)
  if (!token) return <Navigate to="/login" replace />
  if (requireAdmin && user?.role !== 'admin') return <Navigate to="/" replace />
  return children
}





