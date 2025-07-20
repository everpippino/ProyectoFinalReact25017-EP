import styled from 'styled-components';

const StyledButton = styled.button`
  /* Estilos base del botón */
  background-color: #007bff; /* Color primario de Bootstrap */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Estilos al pasar el ratón (hover) */
  &:hover {
    background-color: #0056b3; /* Tono más oscuro al hacer hover */
    transform: translateY(-2px); /* Pequeño efecto de elevación */
  }

  /* Estilos cuando el botón está deshabilitado */
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none; /* Sin efecto de elevación cuando está deshabilitado */
  }

  /* Modificadores de variante (ejemplo: para un botón de peligro) */
  ${props => props.variant === 'danger' && `
    background-color: #dc3545;
    &:hover {
      background-color: #c82333;
    }
  `}

  /* Modificadores de tamaño (ejemplo: para un botón pequeño) */
  ${props => props.size === 'small' && `
    padding: 8px 15px;
    font-size: 0.9em;
  `}
`;

export default StyledButton;