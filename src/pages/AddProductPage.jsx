import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import styled from 'styled-components'; 

import StyledButton from '../components/StyledButton'; 

const MOCKAPI_URL = 'https://687c555ab4bc7cfbda88b971.mockapi.io/api/v1/products';

// Componente estilizado para el contenedor del formulario
const FormContainer = styled.div`
  background-color: #ffffff; /* Fondo blanco */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Sombra más pronunciada */
  max-width: 600px;
  margin: 0 auto; /* Centrar el contenedor */
  border: 1px solid #e0e0e0; /* Borde suave */
`;

// Componente estilizado para los inputs de texto y número
const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px; /* Espacio entre campos */
  border: 1px solid #ced4da; /* Borde Bootstrap por defecto */
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    border-color: #80bdff; /* Color de enfoque de Bootstrap */
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25); /* Sombra de enfoque de Bootstrap */
  }

  /* Estilo para campos inválidos basado en la prop 'isInvalid' */
  ${props => props.isInvalid && `
    border-color: #dc3545; /* Color de error de Bootstrap */
    padding-right: calc(1.5em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
  `}
`;

// Componente estilizado para el textarea
const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px; /* Espacio entre campos */
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  resize: vertical; /* Permite redimensionar verticalmente */

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
  }

  /* Estilo para campos inválidos basado en la prop 'isInvalid' */
  ${props => props.isInvalid && `
    border-color: #dc3545;
    padding-right: calc(1.5em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) top calc(0.375em + 0.1875rem); /* Ajuste para textarea */
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
  `}
`;

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    origin: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

    try {
      const response = await fetch(MOCKAPI_URL, {
        method: 'POST',
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
        throw new Error(`Error al agregar el producto: ${errorData.message || response.statusText}`);
      }

      const newProduct = await response.json();
      console.log('Producto agregado con éxito:', newProduct);

      toast.success(`"${newProduct.name}" ha sido añadido al catálogo.`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setFormData({
        name: '',
        price: '',
        description: '',
        imageUrl: '',
        origin: ''
      });
      setErrors({});

    } catch (error) {
      console.error('Error al agregar producto:', error);
      toast.error(error.message || 'No se pudo agregar el producto. Inténtalo de nuevo.', {
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

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-primary">Agregar Nuevo Producto</h2>
      
      <FormContainer> 
        <form onSubmit={handleSubmit}>
          {/* Campo Nombre */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre del Producto:</label>
            <StyledInput 
              type="text"
              isInvalid={errors.name} // <-- Pasamos la prop isInvalid
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Campo Precio */}
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Precio:</label>
            <StyledInput 
              type="number"
              isInvalid={errors.price} // <-- Pasamos la prop isInvalid
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              disabled={loading}
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </div>

          {/* Campo Descripción */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripción:</label>
            <StyledTextarea 
              isInvalid={errors.description} // <-- Pasamos la prop isInvalid
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
            ></StyledTextarea>
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>

          {/* Campo URL de Imagen */}
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">URL de Imagen:</label>
            <StyledInput
              type="url"
              isInvalid={errors.imageUrl} // <-- Pasamos la prop isInvalid
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              disabled={loading}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {errors.imageUrl && <div className="invalid-feedback">{errors.imageUrl}</div>}
          </div>

          {/* Campo Origen */}
          <div className="mb-4">
            <label htmlFor="origin" className="form-label">Origen (País/Región):</label>
            <StyledInput 
              type="text"
              isInvalid={errors.origin} // <-- Pasamos la prop isInvalid
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.origin && <div className="invalid-feedback">{errors.origin}</div>}
          </div>

          
          <StyledButton type="submit" disabled={loading}>
            {loading ? 'Agregando...' : 'Agregar Producto'}
          </StyledButton>
        </form>
      </FormContainer> 
    </div>
  );
};

export default AddProductPage;