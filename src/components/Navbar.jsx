import { faBars, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom"; // Usamos React Router
import logo from "../assets/2.png";
import Buscador from "./Buscador";

const Navbar = () => {
  {
    /*const [isMenuOpen, setIsMenuOpen] = useState(false);*/
  }
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#000] shadow-md animate-slideDown border-b border-gray-700">
      <nav className="flex items-center justify-between p-4 lg:px-8 bo">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="AeroPark Express" className="h-28" />
          </Link>
        </div>

        {/* Menú Principal (Reservar y Atención al Cliente) */}
        <div className="hidden md:flex flex-grow justify-center space-x-8">
          <Buscador />
        </div>

        {/* Enlaces Secundarios (Regístrate y Quiénes somos) */}
        <div className="hidden md:flex space-x-6 ml-auto">
          <Link
            to="/registro"
            className="text-base font-light text-[#1e8fa2] relative group hover:text-blue-600"
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Regístrate
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Botón del menú para móvil */}
        <button
          className="md:hidden flex items-center text-blue-600 hover:text-blue-600"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
        </button>

        {/* Menú móvil 
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-[#e2e2e1] shadow-md md:hidden animate-slideDown mt-12">
            <div className="flex flex-col items-center space-y-4 p-4">
              <Link
                to="/reservar"
                className="text-blue-600 hover:text-blue-600 "
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faCar} className="mr-2" />
                Reservar
              </Link>

              <Link
                to="/about"
                className="text-blue-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faHeadset} className="mr-2" />
                Atención al cliente
              </Link>

              <Link
                to="/QuienesSomos"
                className="text-blue-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                Quiénes somos
              </Link>

              <Link
                to="/registro"
                className="text-blue-600 hover:text-blue-600 "
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                Regístrate
              </Link>
            </div>
          </div>
        )}
          */}
      </nav>
    </header>
  );
};

export default Navbar;
