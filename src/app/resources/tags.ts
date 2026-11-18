// Copy for the blog tag pages (/blog/tag/[tag]): a unique meta description and a short intro,
// so indexable tag pages are more than a list of links. Keyed by tag slug (see utils/tags.ts).
export interface TagContent {
  /** <title> (<= 60 characters) */
  title: string;
  /** Meta description (120-160 characters) */
  description: string;
  /** Intro paragraphs; Markdown-style links are not parsed, use plain text */
  intro: string[];
}

export const tagContent: Record<string, TagContent> = {
  ciberseguridad: {
    title: "Ciberseguridad: guías contra estafas y hackeos (2026)",
    description:
      "Guías de ciberseguridad para Argentina: cómo detectar phishing, SIM swapping y estafas por WhatsApp, proteger tus contraseñas y qué hacer si te hackean.",
    intro: [
      "Notas prácticas para proteger tus cuentas, tu celular y tu plata: cómo reconocer un correo de phishing o una estafa con código QR, qué hacer si te clonaron el WhatsApp o te robaron el celular, y cómo configurar el doble factor, las passkeys y un gestor de contraseñas.",
      "También repaso los ciberataques y filtraciones que afectan a usuarios y empresas argentinas, con lo que se sabe, lo que no y qué conviene hacer en cada caso.",
      "Si tenés una PyME, hay notas pensadas para vos: ransomware, backups con la regla 3-2-1 y qué datos no pegar en herramientas de IA.",
    ],
  },
  "inteligencia-artificial": {
    title: "Inteligencia artificial: guías y novedades en español",
    description:
      "Qué puede hacer hoy la inteligencia artificial y cómo usarla bien: ChatGPT, Gemini y Claude comparados, agentes, prompts, alucinaciones e impacto laboral.",
    intro: [
      "Guías para usar la inteligencia artificial con criterio: diferencias reales entre ChatGPT, Gemini y Claude, cómo escribir mejores prompts, por qué la IA alucina y cómo medir si de verdad te ahorra tiempo.",
      "También sigo cómo cambia el trabajo con la IA: los agentes que ya ejecutan tareas solos, las profesiones con más riesgo, los filtros automáticos de currículums y los límites legales sobre derechos de autor y datos personales.",
    ],
  },
  tecnologia: {
    title: "Tecnología: guías prácticas, precios y novedades",
    description:
      "Tecnología para el día a día en Argentina: precios de lanzamientos, celulares, PC, apps, caídas de servicios y guías paso a paso para resolver problemas.",
    intro: [
      "Notas para entender y resolver la tecnología de todos los días: cuánto cuestan los lanzamientos en Argentina con impuestos, cómo liberar espacio en Gmail o Windows, qué hacer cuando la batería del celular dura poco y qué parlante o dispositivo conviene comprar.",
      "Cuando se cae un servicio grande, como Outlook, la nube de Amazon o los bancos, explico qué pasó y qué conviene hacer mientras tanto.",
    ],
  },
  sociedad: {
    title: "Tecnología y sociedad: trabajo IT, educación y brecha",
    description:
      "Cómo la tecnología cambia el trabajo y la vida en Argentina: sueldos IT, primer empleo junior y trainee, freelance, celulares en el aula y brecha digital.",
    intro: [
      "Notas sobre el lado humano de la tecnología: cómo conseguir el primer trabajo en IT, qué significan junior y trainee, cuánto se gana en sistemas en Argentina y cómo negociar el sueldo, y los pros y contras de trabajar freelance.",
      "También analizo debates públicos con datos: la brecha digital, los celulares en las escuelas, las redes sociales y los menores, y la hiperconectividad laboral.",
    ],
  },
  productividad: {
    title: "Productividad digital: métodos que funcionan de verdad",
    description:
      "Métodos de productividad digital con evidencia: bandeja de entrada cero, multitasking, reuniones, pestañas, ergonomía y herramientas para organizar el trabajo.",
    intro: [
      "Métodos concretos para trabajar mejor con la computadora y el celular: bandeja de entrada cero, cómo ordenar pestañas y archivos, qué plataforma usar para organizar un equipo y cómo recuperar horas de reuniones que podrían ser un mensaje.",
      "Cada nota repasa qué dice la evidencia, para separar los hábitos que funcionan de los que solo suenan bien.",
    ],
  },
  movilidad: {
    title: "Movilidad en Buenos Aires: transporte, Ecobici y tecnología",
    description:
      "Moverse en Buenos Aires y Argentina: precios de Ecobici, mejores apps de transporte, colectivos eléctricos, semáforos inteligentes y autos eléctricos.",
    intro: [
      "Todo lo que cambia en la forma de moverse en la ciudad: cuánto cuesta Ecobici y cómo usarla, qué app de transporte conviene para colectivo, subte o tren, y cuántos colectivos eléctricos circulan de verdad.",
      "También sigo la tecnología aplicada al tránsito y al transporte en Argentina, como los semáforos inteligentes, el cobro por distancia, el pago con tarjeta en taxis y los autos eléctricos, con datos oficiales y fuentes en cada nota.",
    ],
  },
  musica: {
    title: "Música y tecnología: streaming, precios y novedades",
    description:
      "Música y tecnología en Argentina: cuánto cuesta cada servicio de streaming, cuál suena mejor, cuánto le pagan a los artistas y novedades de Spotify.",
    intro: [
      "Notas sobre cómo escuchamos música hoy: precios de Spotify, YouTube Music, Apple Music, Deezer y el resto en Argentina, con impuestos, qué calidad de audio ofrece cada uno y cuánto le llega a los artistas.",
    ],
  },
  "semana-tech-ba": {
    title: "Semana Tech BA: eventos de tecnología en Buenos Aires",
    description:
      "Eventos de tecnología, innovación y creatividad en Buenos Aires: fechas, agenda y qué esperar de la Tecweek, la Semana de las Tecnologías Emergentes.",
    intro: [
      "Cobertura de los eventos de tecnología en la Ciudad de Buenos Aires, como la Tecweek: fechas, agenda y las actividades más destacadas.",
    ],
  },
};
