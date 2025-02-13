import React from "react";
import { Route, Routes } from "react-router-dom";
import Albumes from "./pages/Albumes";
import ArtistaDetalles from "./pages/ArtistaDetalles"; // Nueva ruta dinámica
import Artistas from "./pages/Artistas";
import Canciones from "./pages/Canciones";
import Contacto from "./pages/Contacto";
import Home from "./pages/Home";

import Productos from "./pages/Productos";
import Registro from "./pages/Registro";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/artistas" element={<Artistas />} />
      <Route path="/albumes" element={<Albumes />} />
      <Route path="/canciones" element={<Canciones />} />

      {/* Ruta dinámica para ver un artista en detalle */}
      <Route path="/artista/:nombre" element={<ArtistaDetalles />} />
    </Routes>
  );
};

export default AppRoutes;
