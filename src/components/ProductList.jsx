import ProductCard from './ProductCard'; 

const ProductList = ({ products, loading, error, onProductChange }) => {
  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando productos...</span>
        </div>
        <p className="mt-3 text-muted">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        Error al cargar los productos: {error}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="alert alert-info text-center my-5" role="alert">
        No se encontraron productos.
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
      {products.map((product) => (
        <div key={product.id} className="col">          
          <ProductCard product={product} onProductChange={onProductChange} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;