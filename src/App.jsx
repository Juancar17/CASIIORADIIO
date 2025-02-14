import React from "react";
import AppRoutes from "./AppRoutes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <section className="bg-[#000] mt-18 text-white py-16 px-8">
        <header className="container mx-auto max-w-7xl bg-[#000]">
          <Navbar /> {/* Barra de Navegación */}
        </header>
        <AppRoutes /> {/* Rutas de la Aplicación */}
        <div className="container mx-auto mt-32 p-2 max-w-7xl ">
          <Footer /> {/* Pie de Página */}
        </div>
      </section>
    </>
  );
}

export default App;
