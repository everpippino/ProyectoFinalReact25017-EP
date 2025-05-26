
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import Swal from 'sweetalert2'

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext)
  const { isAuthenticated } = useContext(AuthContext)

  const handleAddToCart = () => {
    if (isAuthenticated) {
      // Si el usuario está autenticado, añade el producto al carrito
      addToCart(product);
    } else {
      // Si el usuario NO está autenticado, muestra una alerta
      Swal.fire({
        icon: 'warning',
        title: 'Necesitas iniciar sesión',
        text: 'Por favor, inicia sesión para añadir productos al carrito.',
        confirmButtonText: 'Entendido'
      });
    }
  };

  return (   
    <div className="card h-100 shadow-sm border-0 transform-hover-scale">      
      <Link to={`/productos/${product.id}`} className="d-block">
        <img
          src={product.image?.url || `https://placehold.co/300x200/ADD8E6/000000?text=${product.name}`}
          alt={product.name}
          className="card-img-top" 
          style={{ height: '180px', objectFit: 'cover' }}
          loading="lazy" 
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x200/ADD8E6/000000?text=${product.name}`; }} 
        />
      </Link>
      <div className="card-body d-flex flex-column"> 
        <h3 className="card-title h5 text-dark mb-2">
          <Link to={`/productos/${product.id}`} className="text-decoration-none text-dark-emphasis">
            {product.name}
          </Link>
        </h3>
        <p className="card-text text-muted small flex-grow-1">
          <strong>Origen:</strong> {product.origin || 'Desconocido'}
          <br />
          <strong>Esperanza de vida:</strong> {product.life_span || 'N/A'}
        </p>
        <button
          onClick={handleAddToCart} 
          className="btn btn-primary mt-auto d-flex align-items-center justify-content-center" 
        >
          <PlusCircle size={18} className="me-2" /> 
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;