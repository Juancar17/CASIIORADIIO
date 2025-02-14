import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const Canciones = () => {
  const [canciones, setCanciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [playingSongId, setPlayingSongId] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());

  const cargarDatos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost/dwes/my-app/src/backend/bbdd/canciones.php"
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();

      // ✅ Verificar si cada canción tiene un ID único antes de asignarlo
      const cancionesConID = data.map((cancion, index) => ({
        ...cancion,
        id: cancion.id || `cancion-${index}`, // Si no tiene ID, generar uno único
      }));

      setCanciones(cancionesConID);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();

    return () => {
      audioRef.current.pause(); // ✅ Pausar al desmontar el componente
    };
  }, []);

  // ✅ Manejar reproducción individual de canciones
  const handlePlayPause = (cancion) => {
    if (playingSongId === cancion.id) {
      audioRef.current.pause();
      setPlayingSongId(null);
    } else {
      if (audioRef.current.src !== cancion.audio) {
        audioRef.current.src = cancion.audio;
        audioRef.current.load();
      }
      audioRef.current.play();
      setPlayingSongId(cancion.id);
    }
  };

  // ✅ Actualizar barra de progreso
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    };

    audioRef.current.addEventListener("timeupdate", updateTime);
    return () => {
      audioRef.current.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  // ✅ Filtrar canciones según la búsqueda
  const cancionesFiltradas = canciones.filter((cancion) =>
    cancion.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl mt-28">
      {/* 🔎 Título y barra de búsqueda */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <Link
          to="/"
          className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-700 px-2 py-1 rounded-md inline-block"
        >
          ← Volver
        </Link>
        <h1 className="text-2xl font-bold text-white">🎵 Canciones</h1>
        <input
          type="text"
          placeholder="Buscar canción..."
          className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🟠 Mensajes de carga y error */}
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

      {/* 🎼 Lista de canciones en GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-6">
        {cancionesFiltradas.length > 0 ? (
          cancionesFiltradas.map((cancion) => (
            <motion.div
              key={cancion.id} // ✅ Ahora cada canción tiene una "key" única
              className="flex flex-col items-center space-y-2 bg-gray-800 p-4 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* 🎶 Imagen de la canción */}
              <motion.img
                src={cancion.portada}
                alt={cancion.titulo}
                className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover border-2 border-transparent hover:border-gray-400 transition duration-300"
              />

              {/* 🎵 Información de la canción */}
              <h3 className="text-white text-sm md:text-base font-semibold text-center">
                {cancion.titulo}
              </h3>
              <p className="text-gray-400 text-xs text-center">
                {cancion.artista}
              </p>
              <p className="text-gray-400 text-xs text-center">
                {cancion.album}
              </p>

              {/* ⏯ Botón de Play/Pause (individual) */}
              <button
                className={`p-3 rounded-full shadow-md transition ${
                  playingSongId === cancion.id
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={() => handlePlayPause(cancion)}
              >
                {playingSongId === cancion.id ? <FaPause /> : <FaPlay />}
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-white text-center col-span-full">
            No se encontraron canciones.
          </p>
        )}
      </div>

      {/* 🎚 Barra de reproducción */}
      {playingSongId && (
        <motion.div
          className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            className="bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition"
            onClick={() => setPlayingSongId(null)}
          >
            <FaPause />
          </button>

          {/* ℹ Información de la canción */}
          <p className="text-sm">
            Reproduciendo:{" "}
            {canciones.find((c) => c.id === playingSongId)?.titulo || ""}
          </p>

          {/* 📊 Barra de progreso */}
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            step="0.1"
            onChange={(e) => {
              const newTime = parseFloat(e.target.value);
              audioRef.current.currentTime = newTime;
              setCurrentTime(newTime);
            }}
            className="w-40"
          />

          {/* 🕒 Tiempo transcurrido */}
          <span className="text-xs">
            {Math.floor(currentTime)}s / {Math.floor(duration)}s
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default Canciones;
