import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Header = () => (
  <header className="bg-primary py-3 shadow-sm"> 
    <div className="container d-flex justify-content-between align-items-center"> 
      <h1 className="h3 text-white mb-0"> 
        <Link to="/" className="text-white text-decoration-none"> 
          DoggyShop 🐾
        </Link>
      </h1>
      <Navbar /> 
    </div>
  </header>
);

export default Header;