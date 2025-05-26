// --- src/pages/ProductsPage.jsx ---
import React, { useState, useEffect } from 'react'; // Importa React, useState y useEffect
import Swal from 'sweetalert2'; // Importa SweetAlert2 para notificaciones
import ProductList from '../components/ProductList'; // Importa el componente ProductList

// Define tu clave de API aquí.
// En un proyecto real, esto debería ir en una variable de entorno (ej. .env)
const API_KEY = 'live_5HxO6IQOaVzcqwEo5W19QBVmb0fXmKnYV69Wj5C4dwSY4JQvmGKyVq1UHINGzQPr';

const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState([]); // Estado para almacenar todas las razas
  const [products, setProducts] = useState([]); // Estado para los productos de la página actual (los 10 que se muestran)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual, inicia en la primera página
  const itemsPerPage = 10; // Número de ítems a mostrar por página

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoading(true); // Inicia el estado de carga
        setError(null);   // Resetea cualquier error previo

        // Realiza la petición a la API para obtener TODAS las razas
        const response = await fetch('https://api.thedogapi.com/v1/breeds', {
          headers: {
            'x-api-key': API_KEY // Incluye la API Key en los encabezados
          }
        });
        if (!response.ok) {
          // Si la respuesta no es exitosa (ej. 404, 500), lanza un error
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parsea la respuesta JSON

        // Mapea las razas para intentar obtener una imagen si no la tienen directamente.
        // Esto es necesario porque algunas razas de la API no vienen con una URL de imagen directa,
        // y necesitamos hacer una segunda petición por cada una para obtener una imagen asociada.
        const breedsWithImages = await Promise.all(data.map(async (breed) => {
          if (breed.image && breed.image.url) {
            return breed; // Si ya tiene imagen, la devuelve tal cual
          } else {
            try {
              // Intenta obtener una imagen aleatoria para la raza usando su ID
              const imageResponse = await fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${breed.id}&limit=1`, {
                headers: {
                  'x-api-key': API_KEY // Incluye la API Key también aquí
                }
              });
              const imageData = await imageResponse.json();
              if (imageData && imageData.length > 0) {
                return { ...breed, image: imageData[0] };
              }
            } catch (imgError) {
              // Si falla la obtención de la imagen, solo advierte y continúa
              console.warn(`No se pudo obtener imagen para ${breed.name}:`, imgError);
            }
            return breed; // Retorna la raza incluso si no se encontró una nueva imagen
          }
        }));

        setAllProducts(breedsWithImages); // Guarda TODAS las razas en el estado `allProducts`
      } catch (e) {
        console.error("Error fetching products:", e); // Registra el error en consola
        setError(e.message); // Guarda el mensaje de error en el estado
        Swal.fire({ // Muestra una alerta de error con SweetAlert2
          icon: 'error',
          title: 'Error de carga',
          text: `No se pudieron cargar los productos: ${e.message}`,
        });
      } finally {
        setLoading(false); // Finaliza el estado de carga, independientemente del éxito o error
      }
    };

    fetchBreeds(); // Llama a la función para obtener las razas cuando el componente se monta
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar el componente

  // Efecto para actualizar los productos mostrados en la página actual
  // Se ejecuta cuando cambia `currentPage`, `allProducts` (después de la carga inicial) o `itemsPerPage`
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage; // Índice del último ítem de la página actual
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Índice del primer ítem de la página actual
    // Usa `slice` para obtener solo los productos de la página actual del array `allProducts`
    setProducts(allProducts.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, allProducts, itemsPerPage]);

  // Calcula el número total de páginas necesario
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  // Manejador para ir a la página siguiente
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages)); // Asegura no exceder el total de páginas
  };

  // Manejador para ir a la página anterior
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Asegura no ir a una página menor que 1
  };

  return (
    <div>
      <h2 className="h3 fw-bold text-dark mb-4 text-center">Nuestras Razas de Perros</h2>
      {/* Pasa los productos de la página actual, el estado de carga y el error al ProductList */}
      <ProductList products={products} loading={loading} error={error} />

      {/* Controles de paginación: solo se muestran si no está cargando, no hay error y hay productos */}
      {!loading && !error && allProducts.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-primary mx-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1} // Deshabilita si es la primera página
          >
            Anterior
          </button>
          <span className="align-self-center">Página {currentPage} de {totalPages}</span>
          <button
            className="btn btn-outline-primary mx-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages} // Deshabilita si es la última página
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;