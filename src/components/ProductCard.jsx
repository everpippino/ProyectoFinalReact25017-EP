
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'; 

const MOCKAPI_PRODUCTS_URL = 'https://687c555ab4bc7cfbda88b971.mockapi.io/api/v1/products';

const ProductCard = ({ product, onProductChange }) => {
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCart(product);
    } else {
      toast.warn('Por favor, inicia sesión para añadir productos al carrito.', { 
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleDelete = async () => {
    Swal.fire({ 
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar "${product.name}". ¡Esta acción no se puede deshacer!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const [typePrefix, originalId] = product.id.split('-');
          if (typePrefix !== 'mockapi') {
            toast.info('Solo se pueden eliminar productos de MockAPI.', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return;
          }

          const response = await fetch(`${MOCKAPI_PRODUCTS_URL}/${originalId}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error(`Error al eliminar el producto: ${response.statusText}`);
          }

          toast.success(`${product.name} ha sido eliminado.`, { 
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          if (onProductChange) {
            onProductChange();
          }

        } catch (error) {
          console.error('Error al eliminar producto:', error);
          toast.error(error.message || 'No se pudo eliminar el producto. Inténtalo de nuevo.', { 
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    });
  };

  const handleEdit = () => {
    const [typePrefix] = product.id.split('-');
    if (typePrefix !== 'mockapi') {
      toast.info('Solo se pueden editar productos de MockAPI.', { 
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    navigate(`/edit-product/${product.id}`);
  };

  return (
    <div className="card h-100 shadow-sm border-0 rounded overflow-hidden transform-hover">
      <Link to={`/productos/${product.id}`} className="text-decoration-none">
        <img
          src={product.image?.url || `https://placehold.co/300x200/ADD8E6/000000?text=${product.name}`}
          alt={product.name}
          className="card-img-top object-cover"
          style={{ height: '200px' }}
          loading="lazy"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x200/ADD8E6/000000?text=${product.name}`; }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-dark mb-2">
          <Link to={`/productos/${product.id}`} className="text-decoration-none text-dark hover-primary">
            {product.name}
          </Link>
        </h5>
        <p className="card-text text-muted small mb-3">
          <strong>Origen:</strong> {product.origin || 'Desconocido'}
          <br />
          <strong>Esperanza de vida:</strong> {product.life_span || 'N/A'}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="fs-5 fw-bold text-primary">${product.price ? product.price.toFixed(2) : 'N/A'}</span>
          <button
            onClick={handleAddToCart}
            className="btn btn-primary btn-sm d-flex align-items-center"
          >
            <PlusCircle size={18} className="me-1" /> Añadir
          </button>
        </div>
        {isAuthenticated && (
          <div className="d-flex justify-content-end mt-3">
            <button
              onClick={handleEdit}
              className="btn btn-outline-info btn-sm me-2 d-flex align-items-center"
            >
              <Edit size={16} className="me-1" /> Editar
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-outline-danger btn-sm d-flex align-items-center"
            >
              <Trash2 size={16} className="me-1" /> Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;