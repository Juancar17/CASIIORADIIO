import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Albumes = () => {
  const [albumesPorGenero, setAlbumesPorGenero] = useState({});
  const [filteredAlbumes, setFilteredAlbumes] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [orden, setOrden] = useState("titulo-asc"); // Estado para ordenar
  const [filtroGenero, setFiltroGenero] = useState(""); // Estado del filtro por género
  const [filtroAnio, setFiltroAnio] = useState(""); // Estado del filtro por año

  const cargarDatos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost/dwes/my-app/src/backend/bbdd/albunes.php"
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();
      console.log(data);
      setAlbumesPorGenero(data);
      setFilteredAlbumes(data); // Guardamos la versión filtrada
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // 🔹 Función para filtrar los álbumes
  useEffect(() => {
    let filtered = { ...albumesPorGenero };

    // Filtrar por género
    if (filtroGenero) {
      filtered = { [filtroGenero]: albumesPorGenero[filtroGenero] || [] };
    }

    // Filtrar por año
    if (filtroAnio) {
      Object.keys(filtered).forEach((genero) => {
        filtered[genero] = filtered[genero].filter(
          (album) => album.fecha === filtroAnio
        );
      });
    }

    setFilteredAlbumes(filtered);
  }, [filtroGenero, filtroAnio, albumesPorGenero]);

  // 🔹 Función para ordenar los álbumes
  const ordenarAlbumes = (a, b) => {
    if (orden === "titulo-asc") return a.titulo.localeCompare(b.titulo);
    if (orden === "titulo-desc") return b.titulo.localeCompare(a.titulo);
    if (orden === "fecha-asc") return a.fecha - b.fecha;
    if (orden === "fecha-desc") return b.fecha - a.fecha;
    return 0;
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl mt-28">
      {/* 🎵 Título */}
      <motion.h1
        className="text-2xl font-bold text-white text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🎵 Álbumes por Género
      </motion.h1>
      <Link
        to="/"
        className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-700 px-2 py-1 rounded-md inline-block"
      >
        ← Volver
      </Link>

      {/* 🔎 Controles de filtro y ordenación */}
      <div className="flex flex-wrap justify-center gap-4 my-6">
        {/* Filtro por género */}
        <select
          className="p-2 rounded bg-gray-700 text-white"
          onChange={(e) => setFiltroGenero(e.target.value)}
        >
          <option value="">Todos los géneros</option>
          {Object.keys(albumesPorGenero).map((genero) => (
            <option key={genero} value={genero}>
              {genero}
            </option>
          ))}
        </select>

        {/* Filtro por año */}
        <input
          type="number"
          placeholder="Filtrar por año"
          className="p-2 rounded bg-gray-700 text-white"
          onChange={(e) => setFiltroAnio(e.target.value)}
        />

        {/* Ordenar por */}
        <select
          className="p-2 rounded bg-gray-700 text-white"
          onChange={(e) => setOrden(e.target.value)}
        >
          <option value="titulo-asc">Título (A-Z)</option>
          <option value="titulo-desc">Título (Z-A)</option>
          <option value="fecha-asc">Más antiguos primero</option>
          <option value="fecha-desc">Más recientes primero</option>
        </select>
      </div>

      {/* 📦 Mensajes de carga y error */}
      {loading && (
        <motion.p
          className="text-blue-500 text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Cargando...
        </motion.p>
      )}
      {error && (
        <motion.p
          className="text-red-500 text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}

      {/* 📌 Renderizado de álbumes filtrados y ordenados */}
      {Object.keys(filteredAlbumes).map((genero) => (
        <div key={genero} className="mt-8">
          {/* 🎼 Título del género */}
          <motion.h2
            className="text-xl font-semibold text-white mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            🎼 {genero}
          </motion.h2>

          {/* 📀 Grid de álbumes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredAlbumes[genero].sort(ordenarAlbumes).map((album) => (
              <motion.div
                key={album.cod_album}
                className="flex flex-col items-center space-y-2 bg-gray-800 p-4 rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* 🎵 Portada del álbum */}
                <motion.img
                  src={
                    album.portada ||
                    "https://via.placeholder.com/150?text=No+Imagen"
                  }
                  alt={album.titulo}
                  className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-lg object-cover border-2 border-transparent hover:border-gray-400 transition duration-300"
                />

                {/* 📄 Información del álbum */}
                <h3 className="text-white text-sm md:text-base font-semibold text-center">
                  {album.titulo}
                </h3>
                <p className="text-gray-400 text-xs text-center">
                  {album.fecha}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Albumes;
