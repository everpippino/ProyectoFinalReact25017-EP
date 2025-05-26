import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext) 
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso Denegado',
        text: 'Necesitas iniciar sesión para acceder a esta página.',
        willClose: () => {
          navigate('/login'); 
        }
      })
    }
  }, [isAuthenticated, navigate]) 

  if (!isAuthenticated) {
    return null
  }

  return children
}

export default ProtectedRoute