
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import ProductList from '../components/ProductList'

const API_KEY = 'live_5HxO6IQOaVzcqwEo5W19QBVmb0fXmKnYV69Wj5C4dwSY4JQvmGKyVq1UHINGzQPr';

const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState([]); 
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoading(true); 
        setError(null);

        const response = await fetch('https://api.thedogapi.com/v1/breeds', {
          headers: {
            'x-api-key': API_KEY
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); 

        // Mapea las razas para intentar obtener una imagen si no la tienen directamente.
        // Esto es necesario porque algunas razas de la API no vienen con una URL de imagen directa,
        // y necesitamos hacer una segunda petición por cada una para obtener una imagen asociada.
        const breedsWithImages = await Promise.all(data.map(async (breed) => {
          if (breed.image && breed.image.url) {
            return breed; 
          } else {
            try {
              const imageResponse = await fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${breed.id}&limit=1`, {
                headers: {
                  'x-api-key': API_KEY 
                }
              });
              const imageData = await imageResponse.json();
              if (imageData && imageData.length > 0) {
                return { ...breed, image: imageData[0] };
              }
            } catch (imgError) {
              console.warn(`No se pudo obtener imagen para ${breed.name}:`, imgError);
            }
            return breed;
          }
        }));

        setAllProducts(breedsWithImages); 
      } catch (e) {
        console.error("Error fetching products:", e); 
        setError(e.message); 
        Swal.fire({ 
          icon: 'error',
          title: 'Error de carga',
          text: `No se pudieron cargar los productos: ${e.message}`,
        });
      } finally {
        setLoading(false); 
      }
    };

    fetchBreeds(); 
  }, []);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage; 
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
    setProducts(allProducts.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, allProducts, itemsPerPage]);

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);


  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };


  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); 
  };

  return (
    <div>
      <h2 className="h3 fw-bold text-dark mb-4 text-center">Nuestras Razas de Perros</h2>
      <ProductList products={products} loading={loading} error={error} />

      {!loading && !error && allProducts.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-primary mx-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1} 
          >
            Anterior
          </button>
          <span className="align-self-center">Página {currentPage} de {totalPages}</span>
          <button
            className="btn btn-outline-primary mx-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages} 
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;