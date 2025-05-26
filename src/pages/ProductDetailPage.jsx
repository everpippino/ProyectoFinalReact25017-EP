import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'
import Swal from 'sweetalert2'
import { CartContext } from '../context/CartContext'

const API_KEY = 'live_5HxO6IQOaVzcqwEo5W19QBVmb0fXmKnYV69Wj5C4dwSY4JQvmGKyVq1UHINGzQPr'

const ProductDetailPage = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); 
        setError(null);   

        // Realiza la petición a la API para obtener todas las razas.
        // La API de TheDogAPI no tiene un endpoint directo para buscar por ID de raza de forma simple.
        // Por lo tanto, obtenemos todas las razas y luego filtramos por el ID.
        const response = await fetch('https://api.thedogapi.com/v1/breeds', {
          headers: {
            'x-api-key': API_KEY 
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json(); 
        const foundProduct = data.find(p => p.id === parseInt(productId))

        if (foundProduct) {
             if (!foundProduct.image || !foundProduct.image.url || foundProduct.image.url.includes("breeds/")) {
                try {
                    // Realiza una petición para obtener una imagen específica para la raza
                    const imageResponse = await fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${foundProduct.id}&limit=1`, {
                        headers: {
                            'x-api-key': API_KEY 
                        }
                    })
                    const imageData = await imageResponse.json()
                    if (imageData && imageData.length > 0) {
                        foundProduct.image = imageData[0]
                    }
                } catch (imgError) {
                    console.warn(`No se pudo obtener imagen para ${foundProduct.name}:`, imgError)
                }
            }
          setProduct(foundProduct); 
        } else {
          setError('Producto no encontrado.'); 
        }
      } catch (e) {
        console.error("Error fetching product detail:", e); 
        setError(e.message); 
        Swal.fire({ 
          icon: 'error',
          title: 'Error de carga',
          text: `No se pudo cargar el detalle del producto: ${e.message}`,
        })
      } finally {
        setLoading(false);
      }
    }

    fetchProduct() 
  }, [productId]) 

  if (loading) {
    return <p className="text-center text-muted fs-4">Cargando detalles del producto...</p>;
  }

  if (error) {
    return <p className="text-center text-danger fs-4">Error: {error}</p>;
  }

  if (!product) {
    return <p className="text-center text-muted fs-4">Producto no disponible.</p>;
  }

  return (
    <div className="card shadow-sm p-4 d-flex flex-column flex-md-row align-items-center align-items-md-start">
      <div className="flex-shrink-0 me-md-4 mb-4 mb-md-0" style={{ maxWidth: '400px' }}>
        <img
          src={product.image?.url || `https://placehold.co/400x300/ADD8E6/000000?text=${product.name}`}
          alt={product.name}
          className="img-fluid rounded shadow-sm"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/ADD8E6/000000?text=${product.name}`; }}
        />
      </div>
      <div className="flex-grow-1 text-center text-md-start">
        <h2 className="display-5 fw-bold text-dark mb-3">{product.name}</h2>
        <p className="lead text-muted mb-2">
          <strong>Origen:</strong> {product.origin || 'Desconocido'}
        </p>
        <p className="lead text-muted mb-2">
          <strong>Temperamento:</strong> {product.temperament || 'N/A'}
        </p>
        <p className="lead text-muted mb-2">
          <strong>Esperanza de vida:</strong> {product.life_span || 'N/A'}
        </p>
        <p className="lead text-muted mb-2">
          <strong>Altura:</strong> {product.height?.metric ? `${product.height.metric} cm` : 'N/A'}
        </p>
        <p className="lead text-muted mb-4">
          <strong>Peso:</strong> {product.weight?.metric ? `${product.weight.metric} kg` : 'N/A'}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="btn btn-primary btn-lg shadow d-flex align-items-center justify-content-center mx-auto mx-md-0"
        >
          <PlusCircle className="me-2" size={24} /> Añadir al Carrito
        </button>
      </div>
    </div>
  )
}

export default ProductDetailPage