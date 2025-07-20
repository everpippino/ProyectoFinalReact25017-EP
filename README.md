DoggyShop 🐾
¡Bienvenido a DoggyShop, tu tienda online para explorar el fascinante mundo de las razas caninas y productos relacionados! Esta aplicación web está construida con React y utiliza Bootstrap para un diseño responsivo, react-router-dom para la navegación, y Context API para la gestión del estado del carrito y la autenticación de usuarios.

Tabla de Contenidos
Descripción del Proyecto

Características

Tecnologías Utilizadas

Instalación

Uso

Estructura del Proyecto

Requerimientos Finales Cumplidos

Contacto

Descripción del Proyecto
DoggyShop es una aplicación de comercio electrónico que permite a los usuarios navegar por un catálogo de razas de perros (obtenidas de The Dog API) y productos (gestionados a través de MockAPI). Los usuarios pueden añadir productos al carrito, gestionar sus cantidades y vaciarlo. La aplicación también cuenta con un sistema de autenticación de usuarios básico que restringe el acceso a ciertas secciones, y funcionalidades CRUD para la administración de productos (agregar, editar, eliminar) para usuarios autenticados.

Características
Catálogo de Productos y Razas: Muestra una lista combinada de productos de MockAPI y razas de The Dog API.

Paginación: Navegación por el catálogo con paginación para una mejor experiencia de usuario.

Detalle de Producto: Páginas dedicadas para ver información detallada de cada raza o producto.

Carrito de Compras:

Añadir productos al carrito.

Ajustar la cantidad de productos en el carrito.

Eliminar productos individuales o vaciar todo el carrito.

Persistencia del carrito (simulada o a través de Context API).

Autenticación de Usuarios:

Registro e inicio de sesión simulados con localStorage.

Rutas protegidas para el carrito y el dashboard.

Gestión de Productos (CRUD):

Crear: Formulario para agregar nuevos productos a MockAPI.

Reer: Visualización de productos desde MockAPI y The Dog API.

Update: Formulario para editar productos existentes en MockAPI.

Delete: Eliminación de productos de MockAPI con confirmación.

Notificaciones: Uso de React Toastify para mensajes de éxito/error/información y SweetAlert2 para confirmaciones.

Diseño Responsivo: Implementado con Bootstrap para adaptarse a diferentes tamaños de pantalla.

SEO y Accesibilidad: Uso de React Helmet para metadatos dinámicos y atributos ARIA para mejorar la accesibilidad.

Estilización Modular: Integración de styled-components para estilos específicos de componentes.

Iconografía: Utilización de Lucide React y FontAwesome para iconos visuales.

Tecnologías Utilizadas
React (v19.x)

React Router DOM (v6.x)

Bootstrap (v5.x)

Styled-components

React Toastify

SweetAlert2

React Helmet Async

Lucide React

FontAwesome (React)

MockAPI.io (para simular el backend de productos)

The Dog API (para datos de razas de perros)

Instalación
Sigue estos pasos para configurar y ejecutar el proyecto localmente:

Clona el repositorio:

git clone <URL_DE_TU_REPOSITORIO>
cd ProyectoFinalReact25017-EP

Instala las dependencias:

npm install
# o si usas yarn
yarn install

Si encuentras problemas con react-helmet-async, intenta:

npm install react-helmet-async --legacy-peer-deps
# o
yarn add react-helmet-async --legacy-peer-deps

Configura tu API Key de The Dog API:

Obtén una API Key gratuita en The Dog API.

Abre src/pages/ProductsPage.jsx y src/pages/ProductDetailPage.jsx.

Reemplaza live_5HxO6IQOaVzcqwEo5W19QBVmb0fXmKnYV69Wj5C4dwSY4JQvmGKyVq1UHINGzQPr con tu propia API Key.

Configura tu Endpoint de MockAPI:

Ve a MockAPI.io y crea un nuevo proyecto.

Añade un recurso llamado products con las siguientes propiedades: name (String), price (Number), description (String), imageUrl (String), origin (String).

Copia la URL de tu endpoint (ej. https://<tu_id>.mockapi.io/api/v1/products).

Abre src/pages/AddProductPage.jsx, src/pages/EditProductPage.jsx, src/pages/ProductsPage.jsx y src/components/ProductCard.jsx.

Reemplaza la URL https://687c555ab4bc7cfbda88b971.mockapi.io/api/v1/products con la URL de tu propio endpoint de MockAPI.

Inicia la aplicación:

npm run dev
# o si usas yarn
yarn dev

La aplicación se abrirá en tu navegador en http://localhost:5173 (o un puerto similar).

Uso
Navegación: Utiliza la barra de navegación para ir a Inicio, Productos, Carrito, Iniciar Sesión/Registrarse o Dashboard.

Productos: Explora el catálogo de razas y productos. Puedes añadir productos al carrito.

Autenticación:

Registro: Crea una nueva cuenta en la página /registro.

Inicio de Sesión: Inicia sesión con tus credenciales en la página /login.

Dashboard: Accede a /dashboard una vez autenticado.

Carrito: Ve a /carrito para gestionar los ítems añadidos.

Administración de Productos (para usuarios autenticados):

Agregar Producto: En la barra de navegación, haz clic en "Agregar Producto" (visible solo si estás logueado) para añadir nuevos ítems a tu MockAPI.

Editar/Eliminar Producto: En la página de productos, los ítems de MockAPI tendrán botones "Editar" y "Eliminar" (visibles si estás logueado).

Estructura del Proyecto
ProyectoFinalReact25017-EP/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CartDisplay.jsx
│   │   ├── CartItem.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── StyledButton.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── AuthProvider.jsx
│   │   ├── CartContext.jsx
│   │   └── CartProvider.jsx
│   ├── pages/
│   │   ├── AddProductPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── Contact.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── EditProductPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   └── ProductsPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css (o estilos globales)
├── .gitignore
├── package.json
├── README.md  <-- Este archivo
└── vite.config.js