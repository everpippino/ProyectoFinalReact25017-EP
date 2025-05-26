// --- src/components/ProductCard.jsx ---
import React, { useContext } from 'react'; // Importa React y useContext
import { Link } from 'react-router-dom'; // Importa Link de React Router para la navegación
import { PlusCircle } from 'lucide-react'; // Importa el icono PlusCircle de Lucide React
import { CartContext } from '../context/CartContext'; // Importa el contexto del carrito
import { AuthContext } from '../context/AuthContext'; // Importa el contexto de autenticación
import Swal from 'sweetalert2'; // Importa SweetAlert2 para notificaciones

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext); // Obtiene la función addToCart del contexto del carrito
  const { isAuthenticated } = useContext(AuthContext); // Obtiene el estado de autenticación del contexto

  // Función para manejar el clic en el botón "Añadir al Carrito"
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
    // Tarjeta de Bootstrap para cada producto
    <div className="card h-100 shadow-sm border-0 transform-hover-scale"> {/* Custom class for hover effect */}
      {/* Enlace a la página de detalle del producto */}
      <Link to={`/productos/${product.id}`} className="d-block">
        <img
          src={product.image?.url || `https://placehold.co/300x200/ADD8E6/000000?text=${product.name}`}
          alt={product.name}
          className="card-img-top" // Clase de Bootstrap para la imagen superior de la tarjeta
          style={{ height: '180px', objectFit: 'cover' }} // Estilos inline para consistencia de imagen
          loading="lazy" // Añadimos el atributo loading="lazy" para carga perezosa
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x200/ADD8E6/000000?text=${product.name}`; }} // Fallback de imagen
        />
      </Link>
      <div className="card-body d-flex flex-column"> {/* Cuerpo de la tarjeta con Flexbox */}
        <h3 className="card-title h5 text-dark mb-2">
          {/* Enlace al nombre del producto en la página de detalle */}
          <Link to={`/productos/${product.id}`} className="text-decoration-none text-dark-emphasis">
            {product.name}
          </Link>
        </h3>
        <p className="card-text text-muted small flex-grow-1"> {/* Texto de la tarjeta con estilo de Bootstrap */}
          <strong>Origen:</strong> {product.origin || 'Desconocido'}
          <br />
          <strong>Esperanza de vida:</strong> {product.life_span || 'N/A'}
        </p>
        <button
          onClick={handleAddToCart} // Llama a la nueva función handleAddToCart
          className="btn btn-primary mt-auto d-flex align-items-center justify-content-center" // Estilos de botón de Bootstrap
        >
          <PlusCircle size={18} className="me-2" /> {/* Icono con margen derecho */}
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;