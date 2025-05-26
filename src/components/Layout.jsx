// --- src/components/Layout.jsx ---
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => (
  <div className="d-flex flex-column min-vh-100">
    <Header />
    <main className="container flex-grow-1 py-4">{children}</main>
    <Footer />
  </div>
);

export default Layout;