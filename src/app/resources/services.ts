// Content of the service landing pages (/servicios/[slug]).
// Prices are never written here: they come from ./pricing so they are updated in one place.
import {
  pricing,
  pricesForService,
  fromPrice,
  minPrice,
  pricesUpdatedText,
  type ServiceSlug,
} from "./pricing";
import { person, sobremi } from "./content";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServicePage {
  slug: ServiceSlug;
  /** Short name for cards, nav and breadcrumbs */
  name: string;
  /** schema.org serviceType */
  serviceType: string;
  icon: string;
  title: string;
  description: string;
  headline: string;
  /** Direct answer shown right below the h1: what, for whom, how much */
  answer: string;
  audience: string[];
  includes: string[];
  timeline: string;
  /** Case study slugs from src/app/trabajos/projects */
  cases: string[];
  faq: FaqItem[];
  whatsappMessage: string;
}

const lowerFirst = (text: string) =>
  text.charAt(0).toLowerCase() + text.slice(1);
const upperFirst = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

/** "landing page desde $150.000 y página institucional (3 a 5 secciones) desde $375.000" */
function priceSentence(service: ServiceSlug): string {
  const parts = pricesForService(service).map(
    (item) => `${lowerFirst(item.label)} ${fromPrice(item.from)}`,
  );
  return parts.length > 1
    ? `${parts.slice(0, -1).join(", ")} y ${parts[parts.length - 1]}`
    : parts[0];
}

function priceFaq(
  question: string,
  service: ServiceSlug,
  detail: string,
): FaqItem {
  return {
    question,
    answer: `${upperFirst(priceSentence(service))} (${pricesUpdatedText.toLowerCase()}). ${detail} ${pricing.foreignNote}`,
  };
}

export const servicePages: ServicePage[] = [
  {
    slug: "paginas-web",
    name: "Páginas web",
    serviceType: "Diseño y desarrollo de páginas web",
    icon: "globe",
    title: "Diseño de páginas web para PyMEs en Buenos Aires | Salvador Castro",
    description: `Landing pages ${fromPrice(minPrice("paginas-web"))} y páginas institucionales a medida: rápidas, adaptadas al celular y listas para Google. Para PyMEs de Argentina y Uruguay.`,
    headline: "Diseño de páginas web para PyMEs y profesionales",
    answer: `Diseño y desarrollo páginas web a medida para PyMEs, comercios y profesionales de Argentina y Uruguay: ${priceSentence("paginas-web")}. Cada sitio se adapta al celular, carga rápido, sale con SEO básico para aparecer en Google y tiene contacto directo por WhatsApp.`,
    audience: [
      "Comercios y locales que necesitan aparecer en Google y en el mapa",
      "Profesionales: consultorios, estudios, salones y barberías",
      "Emprendimientos que lanzan un producto, servicio o evento",
      "PyMEs que no tienen web o tienen un sitio viejo que no genera consultas",
    ],
    includes: [
      "Diseño a medida con la identidad de tu marca",
      "Adaptada a celular, tablet y computadora",
      "SEO técnico básico: títulos, descripciones, sitemap y datos estructurados",
      "Botón de WhatsApp, formulario de contacto y enlaces a tus redes",
      "Mapa de Google, reseñas y medición de visitas",
      "Publicación en tu dominio y capacitación para usarla",
    ],
    timeline:
      "Una landing page suele estar lista en 1 a 2 semanas y una página institucional en 2 a 4 semanas, según cuánto contenido (textos, fotos) haya que preparar.",
    cases: ["ClaptonBarberia", "DarioBlanco", "ArteUrbano", "BeOrange"],
    faq: [
      priceFaq(
        "¿Cuánto cuesta una página web para una PyME?",
        "paginas-web",
        "El precio final depende de la cantidad de secciones, el contenido y las integraciones que necesites.",
      ),
      {
        question:
          "¿Qué diferencia hay entre una landing page y una página institucional?",
        answer:
          "Una landing page es una sola página enfocada en un objetivo concreto, por ejemplo que te escriban por WhatsApp o que se registren a un evento. Una página institucional tiene varias secciones (inicio, servicios, nosotros, contacto) para presentar el negocio completo.",
      },
      {
        question: "¿Mi página va a aparecer en Google?",
        answer:
          "Sí. Cada sitio se entrega con SEO técnico básico (títulos, descripciones, sitemap y datos estructurados) y te ayudo a darlo de alta en Google Search Console. Llegar a los primeros resultados también depende del contenido y de la competencia de tu rubro.",
      },
    ],
    whatsappMessage:
      "Hola Salvador! Quiero consultar por una página web para mi negocio.",
  },
  {
    slug: "tiendas-online",
    name: "Tiendas online",
    serviceType: "Desarrollo de tiendas online (e-commerce)",
    icon: "grid",
    title:
      "Tienda online para tu negocio: precios y desarrollo | Salvador Castro",
    description: `Tiendas online a medida ${fromPrice(minPrice("tiendas-online"))}: catálogo, carrito, Mercado Pago y panel para gestionar productos y pedidos. PyMEs de Argentina y Uruguay.`,
    headline: "Tiendas online para negocios que quieren vender todos los días",
    answer: `Desarrollo tiendas online a medida ${fromPrice(minPrice("tiendas-online"))} para negocios de Argentina y Uruguay: catálogo de productos, carrito, pagos con Mercado Pago y un panel de administración para cargar productos, seguir pedidos y gestionar clientes sin depender de nadie.`,
    audience: [
      "Comercios que hoy venden por WhatsApp o Instagram y quieren ordenar los pedidos",
      "Negocios con local que quieren sumar la venta online",
      "Marcas que prefieren una tienda propia en lugar de una plataforma con abono mensual",
      "PyMEs con catálogos grandes, combos y promociones",
    ],
    includes: [
      "Catálogo con categorías, búsqueda y filtros",
      "Carrito y checkout con Mercado Pago",
      "Panel para gestionar productos, precios, stock y pedidos",
      "Promociones, combos y descuentos destacados",
      "Cuentas de cliente con historial de compras",
      "Reportes exportables a Excel o PDF",
    ],
    timeline:
      "Una tienda online suele llevar de 4 a 6 semanas, según la cantidad de productos, los medios de pago y las integraciones que necesites.",
    cases: ["LaVacaRoja"],
    faq: [
      priceFaq(
        "¿Cuánto cuesta una tienda online?",
        "tiendas-online",
        "El precio final depende de la cantidad de productos, los medios de pago y las funciones del panel.",
      ),
      {
        question: "¿Qué medios de pago puede aceptar la tienda?",
        answer:
          "La tienda se integra con Mercado Pago, que permite cobrar con tarjetas de crédito y débito, dinero en cuenta y otros medios. También se pueden ofrecer transferencia o pago en el local.",
      },
      {
        question: "¿Puedo cargar y editar los productos yo mismo?",
        answer:
          "Sí. La tienda incluye un panel de administración para cargar productos, cambiar precios y stock, armar promociones y seguir el estado de cada pedido, sin conocimientos técnicos.",
      },
    ],
    whatsappMessage:
      "Hola Salvador! Quiero consultar por una tienda online para mi negocio.",
  },
  {
    slug: "sistemas-de-turnos",
    name: "Sistemas de turnos",
    serviceType: "Desarrollo de sistemas de turnos y reservas online",
    icon: "calendar",
    title: "Sistema de turnos online a medida | Salvador Castro",
    description: `Sistemas de turnos online ${fromPrice(minPrice("sistemas-de-turnos"))} para consultorios, barberías y profesionales: reservas 24/7, recordatorios por WhatsApp y panel de gestión.`,
    headline:
      "Sistema de turnos online para consultorios, salones y profesionales",
    answer: `Desarrollo sistemas de turnos online a medida ${fromPrice(minPrice("sistemas-de-turnos"))} para consultorios, centros médicos, barberías, salones y profesionales: tus clientes reservan solos las 24 horas, reciben recordatorios automáticos por WhatsApp o email y vos gestionás agenda, profesionales y servicios desde un panel.`,
    audience: [
      "Consultorios y centros médicos con varios profesionales o sedes",
      "Barberías, peluquerías y centros de estética",
      "Profesionales que hoy coordinan los turnos a mano por WhatsApp",
      "Negocios que necesitan comisiones, estadísticas o programas de fidelización",
    ],
    includes: [
      "Reserva online 24/7 desde el celular",
      "Confirmaciones y recordatorios automáticos por WhatsApp y email",
      "Agenda por profesional, sede y servicio",
      "Roles y permisos: administración, recepción y profesionales",
      "Estadísticas, comisiones e historial de clientes",
      "Integración con tu página web",
    ],
    timeline:
      "Un sistema de turnos suele llevar de 4 a 8 semanas, según la cantidad de sedes, profesionales y automatizaciones.",
    cases: ["Sistema-Turnos-SFI", "Turnos-Clapton"],
    faq: [
      priceFaq(
        "¿Cuánto cuesta un sistema de turnos online?",
        "sistemas-de-turnos",
        "El precio final depende de la cantidad de sedes, profesionales, notificaciones y reportes.",
      ),
      {
        question: "¿Los recordatorios se pueden enviar por WhatsApp?",
        answer:
          "Sí. El sistema envía confirmaciones y recordatorios automáticos por WhatsApp, usando la API oficial de WhatsApp Business, y por email.",
      },
      {
        question: "¿Sirve para varios profesionales o sedes?",
        answer:
          "Sí. Se pueden gestionar varios profesionales, sedes y servicios, cada uno con su agenda, y dar a cada usuario permisos según su rol.",
      },
    ],
    whatsappMessage:
      "Hola Salvador! Quiero consultar por un sistema de turnos online.",
  },
  {
    slug: "sistemas-a-medida",
    name: "Sistemas a medida",
    serviceType: "Desarrollo de software y sistemas web a medida",
    icon: "document",
    title: "Sistemas de gestión a medida para PyMEs | Salvador Castro",
    description: `Sistemas de gestión a medida ${fromPrice(minPrice("sistemas-a-medida"))}: gestión interna, paneles de administración, SaaS y automatizaciones para PyMEs de Argentina y Uruguay.`,
    headline: "Sistemas a medida y de gestión para PyMEs",
    answer: `Desarrollo sistemas web a medida ${fromPrice(minPrice("sistemas-a-medida"))} para PyMEs de Argentina y Uruguay que necesitan ordenar su operación: sistemas de gestión interna, paneles de administración, productos SaaS y automatizaciones que reemplazan planillas y tareas manuales.`,
    audience: [
      "PyMEs que manejan su operación en planillas de Excel",
      "Negocios que necesitan un panel para pedidos, stock, clientes o comisiones",
      "Emprendedores que quieren lanzar un producto SaaS",
      "Empresas que quieren automatizar tareas repetitivas e integrar sus herramientas",
    ],
    includes: [
      "Relevamiento del proceso y propuesta de alcance por etapas",
      "Panel web con usuarios, roles y permisos",
      "Dashboards con métricas y reportes exportables",
      "Integraciones con Mercado Pago, WhatsApp y email, y facturación electrónica con ARCA si tu sistema la necesita",
      "Automatizaciones y tareas programadas",
      "Puesta en producción y soporte posterior",
    ],
    timeline:
      "Depende del alcance. Se trabaja por etapas: una primera versión usable suele estar en 4 a 8 semanas y después se suman mejoras.",
    cases: ["Turnos-Clapton", "LaVacaRoja", "WhatsAppGroup"],
    faq: [
      priceFaq(
        "¿Cuánto cuesta un sistema a medida?",
        "sistemas-a-medida",
        "El precio final depende del alcance; para proyectos grandes se presupuesta por etapas.",
      ),
      {
        question: "¿Qué es un sistema a medida y cuándo conviene?",
        answer:
          "Es un software web hecho para el proceso de tu negocio, en lugar de adaptar el negocio a una herramienta genérica. Conviene cuando las planillas o los sistemas enlatados ya no alcanzan, o cuando pagás varias herramientas que no se integran entre sí.",
      },
      {
        question: "¿Se puede integrar facturación electrónica en el sistema?",
        answer:
          "Sí, como funcionalidad opcional: si tu sistema lo necesita, puede emitir comprobantes electrónicos a través de los servicios web de ARCA (ex AFIP). No viene incluida en todos los sistemas; se define en la propuesta. Es algo distinto de la factura por mi trabajo, que siempre es Factura C.",
      },
    ],
    whatsappMessage:
      "Hola Salvador! Quiero consultar por un sistema a medida para mi negocio.",
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug);
}

export const servicePath = (slug: ServiceSlug) => `/servicios/${slug}`;

export const invoiceNote =
  "Sí. Siempre emito Factura C por todos los trabajos.";

const allPricesSentence = pricing.items
  .map((item) => `${lowerFirst(item.label)} ${fromPrice(item.from)}`)
  .join(", ");

/** General questions, shown on /servicios (with FAQPage markup) and summarized on the home page */
export const generalFaq: FaqItem[] = [
  {
    question: "¿Cuánto cuesta una página web, una tienda online o un sistema?",
    answer: `${upperFirst(allPricesSentence)} (${pricesUpdatedText.toLowerCase()}, en pesos argentinos). El precio final depende del alcance y te lo paso por escrito antes de empezar. ${pricing.foreignNote}`,
  },
  {
    question: "¿Trabajás con clientes de otros países?",
    answer: `Sí. Trabajo con PyMEs de Argentina y Uruguay y también con clientes de otros países, de forma remota: reuniones por videollamada y seguimiento por WhatsApp. ${pricing.foreignNote}`,
  },
  {
    question: "¿Dónde estás y cómo trabajás?",
    answer:
      "Estoy en la Ciudad de Buenos Aires. Las reuniones son preferentemente virtuales, por videollamada, así que trabajo igual con clientes de todo el país y del exterior. Si estás en CABA, también podemos coordinar una reunión presencial.",
  },
  {
    question: "¿Hacés factura?",
    answer: invoiceNote,
  },
  {
    question: "¿Cuánto tarda en estar lista?",
    answer:
      "Una landing page suele estar lista en 1 a 2 semanas, una página institucional en 2 a 4, una tienda online en 4 a 6 y un sistema de turnos o a medida en 4 a 8 semanas. El plazo exacto queda en la propuesta.",
  },
  {
    question: "¿Cómo es el proceso de trabajo?",
    answer:
      "Primero tenemos una charla sin cargo para entender tu negocio. Después te envío una propuesta por escrito con alcance, plazos y precio. Durante el desarrollo vas viendo avances reales y, al final, te capacito para usar tu sitio o sistema.",
  },
  {
    question: "¿Ofrecés mantenimiento después de la entrega?",
    answer:
      "Sí. Después de la entrega quedo disponible para soporte, actualizaciones y nuevas funcionalidades. El mantenimiento mensual se cotiza según lo que necesite cada proyecto.",
  },
  {
    question: "¿Cómo te contacto?",
    answer: `Por WhatsApp al ${person.phone}, por email a ${person.email} o agendando una llamada de 30 minutos en ${sobremi.calendar.link}.`,
  },
];
