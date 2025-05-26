// --- src/components/ProductList.jsx ---
import React from 'react'; // Importa React
import ProductCard from './ProductCard'; // Importa el componente ProductCard

const ProductList = ({ products, loading, error }) => {
  // Muestra un mensaje de carga si los productos están cargando
  if (loading) {
    return <p className="text-center text-muted fs-4">Cargando productos...</p>;
  }

  // Muestra un mensaje de error si hay un problema al cargar los productos
  if (error) {
    return <p className="text-center text-danger fs-4">Error al cargar los productos: {error}</p>;
  }

  // Muestra un mensaje si no se encontraron productos
  if (!products || products.length === 0) {
    return <p className="text-center text-muted fs-4">No se encontraron productos.</p>;
  }

  return (
    // Usa el sistema de grid de Bootstrap para mostrar las tarjetas de productos
    // row: contenedor de fila
    // row-cols-1: 1 columna en pantallas extra pequeñas
    // row-cols-sm-2: 2 columnas en pantallas pequeñas
    // row-cols-md-3: 3 columnas en pantallas medianas
    // row-cols-lg-4: 4 columnas en pantallas grandes
    // row-cols-xl-5: 5 columnas en pantallas extra grandes
    // g-4: espacio (gap) de 4 unidades entre las columnas
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
      {products.map((product) => (
        // Cada producto se envuelve en una columna para el layout de grid
        <div key={product.id} className="col">
          <ProductCard product={product} /> {/* Renderiza el componente ProductCard para cada producto */}
        </div>
      ))}
    </div>
  );
};

export default ProductList;