import { useState, useEffect, useCallback } from 'react';
import ProductList from '../components/ProductList';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async'; 

// Define las URLs de tus endpoints
const MOCKAPI_PRODUCTS_URL = 'https://687c555ab4bc7cfbda88b971.mockapi.io/api/v1/products';
const THEDOGAPI_BREEDS_URL = 'https://api.thedogapi.com/v1/breeds';
const API_KEY = 'live_5HxO6IQOaVzcqwEo5W19QBVmb0fXmKnYV69Wj5C4dwSY4JQvmGKyVq1UHINGzQPr';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    let combinedProducts = [];

    try {
      const mockApiResponse = await fetch(MOCKAPI_PRODUCTS_URL);
      if (!mockApiResponse.ok) {
        throw new Error(`Error al cargar productos de MockAPI: ${mockApiResponse.statusText}`);
      }
      const mockApiData = await mockApiResponse.json();
      
      const formattedMockProducts = mockApiData.map(product => ({
        id: `mockapi-${product.id}`, 
        name: product.name,
        image: { url: product.imageUrl || `https://placehold.co/300x200/ADD8E6/000000?text=${product.name}` },
        price: parseFloat(product.price), 
        description: product.description,
        origin: product.origin,
        type: 'mockapi-product'
      }));
      combinedProducts = [...formattedMockProducts];

      const dogApiBreedsResponse = await fetch(THEDOGAPI_BREEDS_URL, {
        headers: {
          'x-api-key': API_KEY
        }
      });
      if (!dogApiBreedsResponse.ok) {
        throw new Error(`Error al cargar razas de The Dog API: ${dogApiBreedsResponse.statusText}`);
      }
      const dogApiBreedsData = await dogApiBreedsResponse.json();

      const formattedDogApiBreeds = dogApiBreedsData.map(breed => {
        let imageUrl = breed.image?.url;
        if (!imageUrl || imageUrl.includes("breeds/")) {
          if (breed.reference_image_id) {
            imageUrl = `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`;
          } else {
            imageUrl = `https://placehold.co/300x200/ADD8E6/000000?text=${breed.name}`;
          }
        }

        return {
          id: `dogapi-${breed.id}`, 
          name: breed.name,
          image: { url: imageUrl },
          price: parseFloat((Math.random() * (1500 - 500) + 500).toFixed(2)), 
          description: breed.temperament || 'No hay descripción disponible.',
          origin: breed.origin || 'Desconocido',
          life_span: breed.life_span || 'N/A',
          temperament: breed.temperament || 'N/A',
          height: breed.height || { metric: 'N/A' },
          weight: breed.weight || { metric: 'N/A' },
          type: 'dogapi-breed'
        };
      });

      combinedProducts = [...combinedProducts, ...formattedDogApiBreeds];
      combinedProducts.sort(() => Math.random() - 0.5);

      setProducts(combinedProducts);
      setCurrentPage(1);

    } catch (e) {
      console.error("Error fetching all products:", e);
      setError(e.message);
      toast.error(`No se pudieron cargar todos los productos: ${e.message}`, {
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
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-5">
      <Helmet> 
        <title>DoggyShop 🐾 - Catálogo de Productos y Razas</title>
        <meta name="description" content="Explora todas las razas de perros disponibles y nuestros productos caninos. Encuentra tu compañero ideal." />
        <meta name="keywords" content="productos para perros, razas de perros, Dog API, tienda de mascotas, catálogo canino" />
      </Helmet>

      <h2 className="h3 fw-bold text-dark mb-4 text-center">Nuestros Productos Caninos y Razas</h2>
      <ProductList products={currentProducts} loading={loading} error={error} onProductChange={fetchAllProducts} />

      {!loading && !error && products.length > 0 && (
        <nav aria-label="Navegación de páginas" className="mt-4"> 
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
                aria-label="Página anterior" 
                disabled={currentPage === 1} 
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                  aria-label={`Ir a página ${index + 1}`} 
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
                aria-label="Siguiente página" 
                disabled={currentPage === totalPages} 
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ProductsPage;