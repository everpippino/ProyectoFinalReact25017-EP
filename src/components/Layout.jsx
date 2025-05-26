// --- src/components/Layout.jsx ---
import React from 'react';
import Header from './Header'; // Importa el componente Header
import Footer from './Footer'; // Importa el componente Footer

const Layout = ({ children }) => (
  <div className="d-flex flex-column min-vh-100">
    <Header />
    <main className="container flex-grow-1 py-4">{children}</main>
    <Footer />
  </div>
);

export default Layout;