import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom"; // Usamos React Router
import logo from "../assets/2.png";

export default function Buscador() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-black text-white w-full fixed top-0 inset-x-0 z-50 border-b border-gray-700">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Spotify" className="w-32 h-32" />
      </div>

      {/* Search Bar */}

      <div className="flex items-center bg-gray-800 px-5 py-4 rounded-full w-96">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} className="text-gray-400 mr-2 hover" />
        </Link>
        <input
          type="text"
          placeholder="¿Qué quieres reproducir?"
          className="bg-transparent border-none outline-none text-white px-2 w-full"
        />
        <button className="text-gray-400">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
        </button>
      </div>

      {/* Links */}
      <div className="flex items-center space-x-4 text-gray-400">
        <Link to="/registro" className="text-[#1e8fa2] hover:text-blue-500">
          Premium
        </Link>
        <a href="#" className="hover:text-white">
          Descargar
        </a>
        <span className="border-l border-gray-600 h-5"></span>

        <a href="#" className="hover:text-white">
          Registrate
        </a>

        <button className="bg-white text-black px-4 py-4 rounded-full font-medium hover:bg-[#1e8fa2]">
          Iniciar sesión
        </button>
      </div>
    </nav>
  );
}
