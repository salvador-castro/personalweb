import { Logo } from "@/once-ui/components";

const person = {
  firstName: "Salvador",
  lastName: "Castro",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Frontend Developer",
  avatar: "/images/avatar.jpeg",
  email: "salvacastro06@gmail.com",
  github: "https://github.com/salvador-castro/",
  linkedin: "https://www.linkedin.com/in/salvador-castro95",
  location: "America/Buenos_Aires", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Spanish"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Unite al newsletter de {person.firstName}</>,
  description: (
    <>
      Recibí ideas frescas sobre desarrollo, diseño y tecnología directamente en tu inbox.
      Nada de spam: solo contenido útil, inspiración real y aprendizajes que podés aplicar.
    </>
  ),
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: person.github,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: person.linkedin,
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `salvaCastro.dev`,
  description: `Website showcasing my work as a ${person.role}`,
  headline: <>Conectando diseño y desarrollo con pasión y propósito</>,
  featured: {
    display: true,
    title: <>Proyecto destacado: <strong className="ml-4">CRUDMoviesPHP</strong></>,
    href: "/work/CRUDMoviesPHP",
  },
  subline: (
    <>
      Soy Salvador, un apasionado del desarrollo web con foco en la experiencia de usuario.
      En mi tiempo libre, creo proyectos que combinan diseño y funcionalidad.
    </>
  ),
};

const sobremi = {
  path: "/sobre-mi",
  label: "Sobre Mi",
  title: `Sobre Mi – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/salvador-castro/30min",
  },
  intro: {
    display: true,
    title: "Introducción",
    description: (
      <>
        Soy Salvador, estudiante de Ingeniería en Sistemas y apasionado por el desarrollo web.
        Actualmente formo parte de la Legislatura de la Ciudad de Buenos Aires, donde desempeño dos roles complementarios:
        como Frontend Developer, desarrollando interfaces modernas con React, Next.js y Tailwind para sistemas internos, y
        como Help Desk, garantizando el funcionamiento óptimo de la infraestructura tecnológica. Mi camino combina diseño,
        tecnología y soporte, impulsándome a aprender, mejorar y construir soluciones digitales simples, funcionales y
        orientadas a las personas.
      </>
    ),
  },
  work: {
    display: true,
    title: "Experiencia Laboral",
    experiences: [
      {
        company: "Legislatura de la Ciudad de Buenos Aires",
        timeframe: "Dic. 2022 - Actualidad",
        roles: [
          {
            role: "Frontend Developer / Sep. 2025 – Actualidad",
            achievements: [
              <>
                Desarrollo de interfaces modernas con React, Next.js y Tailwind para los sistemas
                internos de la institución.
              </>,
              <>
                Implementación de componentes reutilizables, optimización del rendimiento y
                construcción de dashboards administrativos.
              </>,
            ],
          },
          {
            role: "Help Desk / Dic. 2022 – Actualidad",
            achievements: [
              <>
                Instalación y activación de programas, mantenimiento preventivo de redes informáticas
                y resolución de incidencias para asegurar el funcionamiento óptimo de los sistemas.
              </>,
              <>
                Reparación de PCs, instalación de equipos e impresoras en red, y supervisión del
                correcto estado operativo de los dispositivos tecnológicos de la institución.
              </>,
            ],
          }
        ],

        images: [],
      },
      {
        company: "Netuy Uruguay",
        timeframe: "Jun. 2021 - Sept. 2021",
        role: "Help Desk",
        achievements: [
          <>
            Asistencia técnica remota, pruebas unitarias de sistemas y soporte en el uso de WordPress,
            garantizando el correcto funcionamiento de las plataformas digitales.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Formación académica",
    institutions: [
      {
        name: "Universidad Tecnológica Nacional (FRBA)",
        description: (
          <>
            Estudiante de Ingeniería en Sistemas de Información (2016 - actualidad).
          </>
        ),
      },
      {
        name: "Centro de e-Learning UTN FRBA",
        description: (
          <>
            <strong>Programación Web Full Stack</strong> (sep. 2019 - dic. 2019) — Nota: 8.50
            <br />
            <strong>Diplomatura en Python</strong> (may. 2020 - nov. 2020) — Nota: Aprobado
            <br />
            <strong>Experto Universitario en Hacking Ético</strong> (feb. 2020 - sept. 2020) — Nota: Excelente
            <br />
            <strong>Diplomatura en Business Intelligence</strong> (jun. 2020 - sept. 2020) — Nota: Aprobado
            <br />
            <strong>PHP y MySQL Inicial</strong> (nov. 2020 - ene. 2021) — Nota: Excelente
            <br />
            <strong>Liderazgo Estratégico</strong> (jun. 2020 - ago. 2020) — Nota: Muy Buena
            <br />
            <strong>Fundamentos del Liderazgo y el Coaching</strong> (may. 2020 - jul. 2020) — Nota: Aprobado
            <br />
            <strong>Oratoria, persuasión y comunicación efectiva</strong> (abr. 2020 - may. 2020) — Nota: Muy Buena
            <br />
            <strong>Operador Excel 2016 – Inicial</strong> (sep. 2019 - nov. 2019) — Nota: 6
            <br />
            <strong>Armado y Reparación de PC</strong> (sep. 2019 - dic. 2019) — Nota: 7
            <br />
            <strong>Curso básico de Perito Judicial Informático</strong> (jun. 2020 - oct. 2020) — Nota: Bueno
            <br />
            <strong>Professional Webmaster</strong> (oct. 2022 - mar. 2023) — Nota: Aprobado
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Tecnologías que uso",
    skills: [
      {
        title: "🎨 Frontend",
        description: (
          <>
            Trabajo con tecnologías modernas del frontend como JavaScript, Vue, React, Bootstrap y Tailwind
            para construir interfaces dinámicas, responsivas y modernas.
          </>
        ),
        images: [
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript", width: 64, height: 64 },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", alt: "Vue.js", width: 64, height: 64 },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React", width: 64, height: 64 },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", alt: "Bootstrap", width: 64, height: 64 },
          { src: "/images/tech/06B6D4.svg", alt: "Tailwind", width: 64, height: 64 },
          { src: "https://vitejs.dev/logo.svg", alt: "Vite", width: 64, height: 64 },
        ],
      },
      {
        title: "🧠 Backend",
        description: (
          <>
            Utilizo PHP con Laravel, Python con Django o Flask, y bases de datos como MySQL para desarrollar APIs robustas y sistemas escalables.
          </>
        ),
        images: [
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", alt: "PHP", width: 64, height: 64 },
          { src: "https://cdn.simpleicons.org/laravel/FF2D20.svg", alt: "Laravel", width: 64, height: 64 },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python", width: 64, height: 64 },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", alt: "Django", width: 64, height: 64 },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", alt: "Flask", width: 64, height: 64 },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", alt: "MySQL", width: 64, height: 64 },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg", alt: "Symfony", width: 64, height: 64 },
        ],
      },
      {
        title: "🧰 Herramientas y librerías",
        description: (
          <>
            Me apoyo en herramientas clave como Git, Node.js, Selenium y librerías como PHPMailer y Twig
            para automatización, envío de correos y plantillas.
          </>
        ),
        images: [
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", alt: "Git", width: 64, height: 64 },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js", width: 64, height: 64 },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg", alt: "Selenium", width: 64, height: 64 },
          { src: "https://user-images.githubusercontent.com/973783/46407973-3c5dbf80-c72e-11e8-947c-d1fdaaa28f73.png", alt: "Twig", width: 64, height: 64 },
          { src: "https://cdn.worldvectorlogo.com/logos/phpmailer-1.svg", alt: "PHPMailer", width: 64, height: 64 },
          { src: "https://img.icons8.com/ios-filled/100/database.png", alt: "CRUD", width: 64, height: 64 },
        ],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: `Escribiendo sobre las ultimas novedades en diseño y tecnología`,
  description: `Read what ${person.name} has been up to recently`,
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    { src: "/images/gallery/horizontal-1.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/horizontal-2.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/horizontal-3.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/horizontal-4.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/vertical-1.jpg", alt: "image", orientation: "vertical" },
    { src: "/images/gallery/vertical-2.jpg", alt: "image", orientation: "vertical" },
    { src: "/images/gallery/vertical-3.jpg", alt: "image", orientation: "vertical" },
    { src: "/images/gallery/vertical-4.jpg", alt: "image", orientation: "vertical" },
  ],
};

export { person, social, newsletter, home, sobremi, blog, work, gallery };
