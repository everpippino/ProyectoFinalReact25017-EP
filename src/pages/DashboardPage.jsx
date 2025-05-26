import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const DashboardPage = () => {
  // Obtiene la información del usuario actual del AuthContext
  const { currentUser } = useContext(AuthContext)

  return (
    // Contenedor principal de la página del dashboard con estilos de Bootstrap
    <div className="text-center p-5 bg-white rounded shadow-sm">
      <h2 className="display-4 fw-bold text-dark mb-4">Bienvenido {currentUser?.username || 'Usuario'}!</h2>
      <p className="lead text-muted">Esta es una página protegida a la que solo los usuarios autenticados pueden acceder.</p>
      <div className="mt-5">
        {/* Imagen de ejemplo con clases de Bootstrap para responsive y sombra */}
        <img src="https://placehold.co/600x300/ADD8E6/000000?text=Dashboard+Seguro" alt="Dashboard Seguro" className="img-fluid rounded shadow" />
      </div>
    </div>
  )
}

export default DashboardPage