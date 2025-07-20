
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';
import { Helmet } from 'react-helmet-async'; 

const API_KEY = 'live_5HxO6IQOaVzcqwEo5W19QBVmb0fXmKnYV69Wj5C4dwSY4JQvmGKyVq1UHINGzQPr';
const MOCKAPI_PRODUCTS_URL = 'https://687c555ab4bc7cfbda88b971.mockapi.io/api/v1/products';

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

        const [typePrefix, originalId] = productId.split('-');

        let fetchedProduct = null;

        if (typePrefix === 'mockapi') {
          const response = await fetch(`${MOCKAPI_PRODUCTS_URL}/${originalId}`);
          if (!response.ok) {
            throw new Error(`Error al cargar producto de MockAPI: ${response.statusText}`);
          }
          const data = await response.json();
          fetchedProduct = {
            id: productId,
            name: data.name,
            image: { url: data.imageUrl || `https://placehold.co/400x300/ADD8E6/000000?text=${data.name}` },
            price: parseFloat(data.price),
            description: data.description,
            origin: data.origin,
            type: 'mockapi-product',
            life_span: 'N/A',
            temperament: 'N/A',
            height: { metric: 'N/A' },
            weight: { metric: 'N/A' }
          };

        } else if (typePrefix === 'dogapi') {
          const response = await fetch('https://api.thedogapi.com/v1/breeds', {
            headers: {
              'x-api-key': API_KEY
            }
          });
          if (!response.ok) {
            throw new Error(`Error al cargar razas de The Dog API: ${response.statusText}`);
          }
          const data = await response.json();
          const foundBreed = data.find(breed => breed.id === parseInt(originalId));

          if (foundBreed) {
            let imageUrl = foundBreed.image?.url;
            if (!imageUrl || imageUrl.includes("breeds/")) {
              if (foundBreed.reference_image_id) {
                imageUrl = `https://cdn2.thedogapi.com/images/${foundBreed.reference_image_id}.jpg`;
              } else {
                imageUrl = `https://placehold.co/400x300/ADD8E6/000000?text=${foundBreed.name}`;
              }
            }

            fetchedProduct = {
              id: productId,
              name: foundBreed.name,
              image: { url: imageUrl },
              price: parseFloat((Math.random() * (1500 - 500) + 500).toFixed(2)),
              description: foundBreed.temperament || 'No hay descripción disponible.',
              origin: foundBreed.origin || 'Desconocido',
              life_span: foundBreed.life_span || 'N/A',
              temperament: foundBreed.temperament || 'N/A',
              height: foundBreed.height || { metric: 'N/A' },
              weight: { metric: 'N/A' },
              type: 'dogapi-breed'
            };
          } else {
            setError('Raza de perro no encontrada.');
          }
        } else {
          setError('Tipo de producto desconocido.');
        }

        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else if (!error) {
          setError('Producto no encontrado.');
        }

      } catch (e) {
        console.error("Error fetching product detail:", e);
        setError(e.message);
        toast.error(`No se pudo cargar el detalle del producto: ${e.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

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
      <Helmet> 
        <title>{product.name} - DoggyShop 🐾</title> 
        <meta name="description" content={`Detalles de la raza ${product.name}. Origen: ${product.origin}. Temperamento: ${product.temperament}.`} />
       
      </Helmet>

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
          role="button" // <-- Añadido role
          aria-label={`Añadir ${product.name} al carrito`} 
        >
          <PlusCircle className="me-2" size={24} aria-hidden="true" /> Añadir al Carrito 
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;