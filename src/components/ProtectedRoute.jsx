import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  // Obtiene el estado de autenticación del AuthContext
  const { isAuthenticated } = useContext(AuthContext)
  // Hook para la navegación programática de React Router
  const navigate = useNavigate()

  // useEffect para manejar la lógica de redirección si el usuario no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      // Si el usuario no está autenticado, muestra una alerta y luego redirige
      Swal.fire({
        icon: 'warning',
        title: 'Acceso Denegado',
        text: 'Necesitas iniciar sesión para acceder a esta página.',
        willClose: () => {
          // Esta función se ejecuta cuando la alerta se cierra
          navigate('/login'); // Redirige al usuario a la página de login
        }
      })
    }
  }, [isAuthenticated, navigate]) // Dependencias del useEffect: se ejecuta cuando cambia isAuthenticated o navigate

  // Si el usuario no está autenticado, no renderizamos nada (la redirección se maneja en el useEffect)
  if (!isAuthenticated) {
    return null
  }

  // Si el usuario está autenticado, renderizamos los componentes hijos (la página protegida)
  return children
}

export default ProtectedRoute