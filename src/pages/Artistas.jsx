import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Artistas = () => {
  const [artistas, setArtistas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarDatos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost/dwes/my-app/src/backend/bbdd/artistas.php"
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();

      setArtistas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-7xl mt-28">
      {/* Título y botón "Mostrar todos" */}
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/"
          className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-700 px-2 py-1 rounded-md inline-block"
        >
          ← Volver
        </Link>
        <h1 className="text-2xl font-bold text-center text-white">
          Artistas populares
        </h1>
        <Link to="/" className="text-gray-400 hover:text-white text-sm">
          Mostrar todos
        </Link>
      </div>

      {/* Grid sin scroll horizontal */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {artistas.map((artista) => (
          <motion.div
            key={artista.cod_grupo}
            className="flex flex-col items-center space-y-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Imagen circular */}
            <Link to={`/artista/${encodeURIComponent(artista.nombre)}`}>
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                src={artista.foto}
                alt={artista.nombre}
                className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover border-2 border-transparent hover:border-gray-400 transition duration-300"
              />
            </Link>

            {/* Nombre del artista */}
            <h3 className="text-white text-sm md:text-base font-semibold">
              {artista.nombre}
            </h3>
            <p className="text-gray-400 text-xs">Artista</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Artistas;
