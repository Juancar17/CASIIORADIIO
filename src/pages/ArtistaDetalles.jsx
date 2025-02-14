import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ArtistaDetalles = () => {
  const { nombre } = useParams(); // Captura el parámetro dinámico de la URL
  const [artista, setArtista] = useState(null);
  const [albumes, setAlbumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingSongId, setPlayingSongId] = useState(null);
  const [imagenAlbum, setImagenAlbum] = useState(null);

  useEffect(() => {
    if (!nombre) return;

    const fetchArtista = async () => {
      try {
        const response = await fetch(
          `http://localhost/dwes/my-app/src/backend/bbdd/artistaDetalles.php?nombre=${encodeURIComponent(
            nombre
          )}`
        );
        if (!response.ok) throw new Error("No se pudo obtener el artista");

        const data = await response.json();
        const img = data.albumes.map((album) => ({
          ...album,
          portada: album.portada,
        }));
        const imgPortada = img[0].portada;
        setImagenAlbum(imgPortada);

        const albumesData = data.albumes
          ? data.albumes.map((album) => ({
              ...album,
              fecha: new Date(album.fecha).toLocaleDateString(),
            }))
          : [];

        setAlbumes(albumesData);
        setArtista(data);
      } catch (err) {
        console.error("Error al obtener datos del artista:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtista();
  }, [nombre]);

  const handlePlayPause = (cancion) => {
    setPlayingSongId(playingSongId === cancion.id ? null : cancion.id);
  };

  if (loading)
    return <h1 className="text-center text-gray-500">Cargando...</h1>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!artista)
    return <p className="text-center text-white">Artista no encontrado.</p>;

  return (
    <motion.div
      className="container mx-auto p-6 space-y-6 max-w-7xl mt-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Botón para volver */}
      <Link
        to="/artistas"
        className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-700 px-2 py-1 rounded-md inline-block"
      >
        ← Volver a la lista de artistas
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Imagen del Artista */}
        {artista.foto ? (
          <motion.img
            src={artista.foto}
            alt={artista.nombre}
            className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
          />
        ) : (
          <p className="text-gray-500">No hay imagen disponible</p>
        )}

        {/* Información del Artista */}
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold text-white">{artista.nombre}</h1>
          <p className="text-lg text-white">{artista.nacionalidad}</p>
          <p className="mt-4 text-white">{artista.biografia}</p>
        </div>
      </div>

      {/* Sección de Canciones */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-6">
        <div className="grid text-center col-span-full">
          <h2 className="text-3xl font-bold text-white">Canciones</h2>
        </div>

        {artista.canciones && artista.canciones.length > 0 ? (
          artista.canciones.map((cancion) => (
            <motion.div
              key={cancion.id}
              className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-transparent hover:bg-gray-900 transition duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* 🎶 Imagen de la canción */}
              <motion.img
                src={imagenAlbum || "ruta-a-imagen-por-defecto.jpg"}
                alt={cancion.titulo}
                className="w-32 h-32 rounded-lg object-cover"
              />

              {/* 🎵 Información de la canción */}
              <h3 className="text-white text-sm md:text-base font-semibold text-center">
                {cancion.titulo}
              </h3>
              <p className="text-gray-400 text-xs text-center">
                {cancion.duracion || "Duración desconocida"}
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-white text-center col-span-full mt-6">
            No se encontraron canciones.
          </p>
        )}
      </div>

      {/* Sección de Álbumes */}
      {albumes.length > 0 && (
        <div className="mt-6 justify-center">
          <h2 className="text-3xl font-bold text-center mt-8 text-white mb-4">
            Albumes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 justify-center">
            {albumes.map((album) => (
              <motion.div
                key={album.cod_album}
                className="bg-trasparent border border-gray-700 rounded-lg shadow-md overflow-hidden p-4"
                whileHover={{ scale: 1.05 }}
              >
                {album.portada ? (
                  <img
                    src={album.portada}
                    alt={album.titulo}
                    className="w-full h-48 object-cover rounded-md"
                  />
                ) : (
                  <p className="text-gray-500">No hay imagen</p>
                )}
                <div className="mt-3">
                  <h3 className="text-gray-400">Título: {album.titulo}</h3>
                  <p className="text-gray-400">
                    Fecha de lanzamiento: {album.fecha}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ArtistaDetalles;
