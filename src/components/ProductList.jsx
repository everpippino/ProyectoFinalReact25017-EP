
import ProductCard from './ProductCard'

const ProductList = ({ products, loading, error }) => { 
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
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
      {products.map((product) => (
        <div key={product.id} className="col">
          <ProductCard product={product} /> 
        </div>
      ))}
    </div>
  );
};

export default ProductList;