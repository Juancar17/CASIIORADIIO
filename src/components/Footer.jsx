import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#000] text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sección de contacto */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Contacto</h2>
          <ul className="space-y-2">
            <li>
              Email:{" "}
              <a
                href="mailto:info@aeropark.com"
                className="text-gray-400 hover:text-white"
              >
                info@casiioradiio.com
              </a>
            </li>
            <li>
              Teléfono:{" "}
              <a
                href="tel:+34912345678"
                className="text-gray-400 hover:text-white"
              >
                +34 912 345 678
              </a>
            </li>
            <li>Dirección:</li>
            <a
              href="https://maps.app.goo.gl/WrrwxHgcRvktTAmP8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-gray-300 hover:text-white transition"
            >
              C. de Casioradio, Madrid, 28042, España
            </a>
          </ul>
        </div>

        {/* Sección de redes sociales */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Síguenos</h2>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
          </div>
        </div>

        {/* Sección de información adicional */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Información</h2>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="text-gray-400 hover:text-white">
                Sobre nosotros
              </a>
            </li>
            <li>
              <a href="/faq" className="text-gray-400 hover:text-white">
                Preguntas frecuentes
              </a>
            </li>
            <li>
              <a href="/terms" className="text-gray-400 hover:text-white">
                Términos y condiciones
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-white">
        © 2025 Casioradio. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
