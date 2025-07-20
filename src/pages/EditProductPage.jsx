
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import Swal from 'sweetalert2'; 

const MOCKAPI_PRODUCTS_URL = 'https://687c555ab4bc7cfbda88b971.mockapi.io/api/v1/products';

const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    origin: ''
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setFetchError(null);

      const [typePrefix, originalId] = productId.split('-');

      if (typePrefix !== 'mockapi') {
        setFetchError('Solo se pueden editar productos de MockAPI.');
        setLoading(false);
        toast.warn('Solo se pueden editar productos de MockAPI.', { 
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

      try {
        const response = await fetch(`${MOCKAPI_PRODUCTS_URL}/${originalId}`);
        if (!response.ok) {
          throw new Error(`Error al cargar los datos del producto: ${response.statusText}`);
        }
        const data = await response.json();
        setFormData({
          name: data.name || '',
          price: data.price || '',
          description: data.description || '',
          imageUrl: data.imageUrl || '',
          origin: data.origin || ''
        });
      } catch (error) {
        console.error('Error al cargar datos del producto:', error);
        setFetchError(error.message || 'No se pudieron cargar los datos del producto.');
        toast.error(error.message || 'No se pudo cargar el producto para edición.', { 
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

    fetchProductData();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del producto es obligatorio.';
      isValid = false;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      newErrors.price = 'El precio debe ser un número mayor a 0.';
      isValid = false;
    }

    if (!formData.description.trim() || formData.description.trim().length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres.';
      isValid = false;
    }

    if (formData.imageUrl && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.imageUrl)) {
        newErrors.imageUrl = 'Por favor, introduce una URL de imagen válida (jpg, png, gif, webp).';
        isValid = false;
    }

    if (!formData.origin.trim()) {
      newErrors.origin = 'El origen es obligatorio.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({ 
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, corrige los errores en el formulario.',
      });
      return;
    }

    setLoading(true);

    const [typePrefix, originalId] = productId.split('-');

    try {
      const response = await fetch(`${MOCKAPI_PRODUCTS_URL}/${originalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          description: formData.description,
          imageUrl: formData.imageUrl,
          origin: formData.origin,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al actualizar el producto: ${errorData.message || response.statusText}`);
      }

      const updatedProduct = await response.json();
      console.log('Producto actualizado con éxito:', updatedProduct);

      toast.success(`"${updatedProduct.name}" ha sido actualizado.`, { 
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate('/productos');

    } catch (error) {
      console.error('Error al actualizar producto:', error);
      toast.error(error.message || 'No se pudo actualizar el producto. Inténtalo de nuevo.', { 
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

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando producto...</span>
        </div>
        <p className="mt-3 text-muted">Cargando datos del producto para edición...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        Error: {fetchError}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-primary">Editar Producto: {formData.name}</h2>
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>         
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre del Producto:</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">Precio:</label>
            <input
              type="number"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              disabled={loading}
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripción:</label>
            <textarea
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
            ></textarea>
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">URL de Imagen:</label>
            <input
              type="url"
              className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              disabled={loading}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {errors.imageUrl && <div className="invalid-feedback">{errors.imageUrl}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="origin" className="form-label">Origen (País/Región):</label>
            <input
              type="text"
              className={`form-control ${errors.origin ? 'is-invalid' : ''}`}
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.origin && <div className="invalid-feedback">{errors.origin}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Actualizando...' : 'Actualizar Producto'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;