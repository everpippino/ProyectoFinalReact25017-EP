import { Link } from 'react-router-dom'

const NotFoundPage = () => (  
  <div className="text-center p-5 bg-white rounded shadow-sm">
    <h2 className="display-4 fw-bold text-dark mb-4">404 - Página No Encontrada</h2>
    <p className="lead text-muted mb-5">Lo sentimos, la página que buscas no existe.</p>    
    <Link to="/" className="btn btn-primary btn-lg">
      Volver al Inicio
    </Link>
  </div>
)

export default NotFoundPage