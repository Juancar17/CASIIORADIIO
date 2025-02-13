import { CheckIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

// Planes de suscripción adaptados para la app de Artistas
const tiers = [
  {
    name: "Fan Básico",
    id: "tier-basic",
    href: "#",
    priceMonthly: "Gratis",
    description:
      "Accede a información básica de tus artistas favoritos y disfruta de contenido gratuito.",
    features: [
      "Acceso a la biografía de artistas",
      "Últimos lanzamientos",
      "Noticias y eventos",
    ],
    featured: false,
  },
  {
    name: "Fan Premium",
    id: "tier-premium",
    href: "#",
    priceMonthly: "$9.99",
    description:
      "Contenido exclusivo, acceso anticipado a lanzamientos y más ventajas.",
    features: [
      "Todo en el plan gratuito",
      "Contenido exclusivo de artistas",
      "Descuentos en merchandising",
      "Acceso a eventos en vivo",
    ],
    featured: true,
  },
  {
    name: "VIP",
    id: "tier-vip",
    href: "#",
    priceMonthly: "$29.99",
    description:
      "Para los verdaderos fans: acceso completo a experiencias únicas con los artistas.",
    features: [
      "Todo en el plan Premium",
      "Meet & Greet virtual",
      "Entradas prioritarias a conciertos",
      "Merchandising exclusivo",
    ],
    featured: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Subscriptions() {
  return (
    <motion.div
      className="relative isolate text-white px-6 py-24 sm:py-32 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Título de la sección */}
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold text-[#1e8fa2]">Suscripciones</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
          Apoya a tus artistas favoritos
        </p>
      </motion.div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-white sm:text-xl">
        Únete a una de nuestras suscripciones y accede a contenido exclusivo de
        los artistas que amas.
      </p>

      {/* Contenedor de los planes */}
      <motion.div
        className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {tiers.map((tier, tierIdx) => (
          <motion.div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-[#1e8fa2] text-white shadow-xl"
                : "bg-gray-900 ring-1 ring-gray-200",
              "rounded-3xl p-8 sm:p-10 transition-transform duration-300 hover:scale-105"
            )}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-semibold">{tier.name}</h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-semibold">
                {tier.priceMonthly}
              </span>
              <span className="text-base">
                {tier.priceMonthly !== "Gratis" && "/mes"}
              </span>
            </p>
            <p className="mt-6 text-base">{tier.description}</p>

            <ul role="list" className="mt-8 space-y-3 text-sm">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon className="h-6 w-5 flex-none text-indigo-400" />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={tier.href}
              className={classNames(
                tier.featured
                  ? "bg-white text-gray-900 shadow-md hover:bg-gray-200"
                  : "bg-[#1e8fa2] text-gray-900 hover:bg-gray-200",
                "mt-8 block rounded-md px-4 py-2 text-center text-sm font-semibold transition-all"
              )}
            >
              Suscribirse
            </a>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
