import {
  faCompactDisc,
  faMusic,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import logo from "../assets/2.png";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const img = "https://cdn-icons-png.flaticon.com/128/18863/18863782.png";
  const stats = [
    {
      icon: faMusic,
      label: "Canciones",
      value: "Más de 50 de canciones",
      href: "/canciones",
    },
    {
      icon: faUserFriends,
      label: "Artistas",
      value: "Conoce a tus artistas favoritos",
      href: "/artistas",
    },
    {
      icon: faCompactDisc,
      label: "Albumes",
      value: "Escucha los mejores albunes",
      href: "/albumes",
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <section className="bg-[#000] mt-28 text-white py-16 px-8" id="nosotros">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Logo para móviles */}
          <motion.img
            src={logo}
            alt="AeroPark Express Logo"
            className="w-full max-w-md h-full mx-auto mt-8 block py-16 lg:hidden mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Texto a la izquierda */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-7xl font-extrabold font-roboto leading-tight tracking-tight"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              La mejor musica en{" "}
              <motion.span
                className="font-extrabold text-[#1e8fa2] text-7xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              >
                CASIIO RADIIO
              </motion.span>
            </motion.h1>

            <p className="text-lg">
              Escucha la música que más te gusta en cualquier momento y lugar.
              Crea tus propias listas de reproducción y disfruta de la mejor
              música en cualquier lugar.
            </p>

            <ul className="space-y-4">
              {stats.map((stat, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-4 bg-white bg-opacity-10 p-4 rounded-lg shadow-md cursor-pointer hover:bg-opacity-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.3 }}
                  onClick={() => stat.href && window.location.assign(stat.href)}
                >
                  <FontAwesomeIcon
                    icon={stat.icon}
                    className="text-3xl text-white"
                  />
                  <div>
                    <p className="text-lg font-semibold">{stat.label}</p>
                    <p className="text-sm">{stat.value}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Logo a la derecha en pantallas grandes */}
          <motion.img
            src={logo}
            alt="AeroPark Express Logo"
            className="w-full h-full object-cover mx-auto hidden lg:block ml-32"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </section>
    </>
  );
};

export default Home;
