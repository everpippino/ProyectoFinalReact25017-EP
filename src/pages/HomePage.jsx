import { Link } from 'react-router-dom'
import { Dog } from 'lucide-react'

const HomePage = () => (
  <div className="text-center p-5 bg-white rounded shadow-sm">
    <h2 className="display-4 fw-bold text-dark mb-4">¡Bienvenido a DoggyShop!</h2>
    <p className="lead text-muted mb-5">Explora nuestra increíble colección de razas de perros.</p> 
    <Link to="/productos" className="btn btn-primary btn-lg shadow">
      Ver Productos <Dog className="ms-2" size={24} />
    </Link>
    <div className="mt-5">
     
      <img src="https://placehold.co/800x400/ADD8E6/000000?text=Perros+Felices" alt="Perros Felices" className="img-fluid rounded shadow" />
    </div>
  </div>
)

export default HomePage