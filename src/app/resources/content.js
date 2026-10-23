import { fromPrice, minPrice } from './pricing'

const person = {
  firstName: 'Salvador',
  lastName: 'Castro',
  get name () {
    return `${this.firstName} ${this.lastName}`
  },
  role: 'Desarrollador web freelance',
  avatar: '/images/avatar.webp',
  email: 'salvacastro06@gmail.com',
  github: 'https://github.com/salvador-castro/',
  linkedin: 'https://www.linkedin.com/in/salvador-castro95',
  x: 'https://x.com/salva_castro95',
  youtube: 'https://youtube.com/@salva.castro?si=iBf9iVOzOppCvVPP',
  whatsapp: '5491135655755',
  // IANA time zone, used by the header clock
  location: 'America/Argentina/Buenos_Aires',
  city: 'Buenos Aires, Argentina',
  languages: ['Español', 'Inglés']
}

const newsletter = {
  display: true,
  title: <>Unite al newsletter de {person.firstName}</>,
  description: (
    <>
      Recibí ideas frescas sobre desarrollo, diseño y tecnología directamente en
      tu inbox. Nada de spam: solo contenido útil, inspiración real y
      aprendizajes que podés aplicar.
    </>
  )
}

const waLink = message =>
  `https://wa.me/${person.whatsapp}?text=${encodeURIComponent(message)}`

const social = [
  {
    name: 'GitHub',
    icon: 'github',
    link: person.github
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    link: person.linkedin
  },
  {
    name: 'X',
    icon: 'x',
    link: person.x
  },
  {
    name: 'YouTube',
    icon: 'youtube',
    link: person.youtube
  },
  {
    name: 'WhatsApp',
    icon: 'whatsapp',
    link: `https://wa.me/${person.whatsapp}`
  },
  {
    name: 'Email',
    icon: 'email',
    link: `mailto:${person.email}`
  }
]

const home = {
  path: '/',
  label: 'Home',
  title: `Desarrollador web freelance en Buenos Aires | ${person.name}`,
  description: `Páginas web, tiendas online y sistemas a medida para PyMEs de Argentina y Uruguay. Desarrollo freelance desde Buenos Aires, landing pages ${fromPrice(minPrice())}.`,
  headline: <>Webs y sistemas a medida que hacen crecer tu negocio</>,
  featured: {
    display: true,
    title: (
      <>
        Caso de éxito: <strong className='ml-4'>Clapton Barbershop</strong>
      </>
    ),
    href: '/trabajos/ClaptonBarberia'
  },
  subline: (
    <>
      Diseño y desarrollo landing pages, sistemas de turnos y tiendas online
      para PyMEs, comercios y profesionales que quieren vender y agendar más a
      través de internet.
    </>
  )
}

const sobremi = {
  path: '/sobre-mi',
  label: 'Sobre mí',
  title: `Sobre mí – ${person.name}, desarrollador web freelance`,
  description: `Soy ${person.name}, desarrollador web freelance en Buenos Aires. Hago páginas web, tiendas online y sistemas a medida para PyMEs de Argentina y Uruguay.`,
  tableOfContent: {
    display: true,
    subItems: false
  },
  avatar: {
    display: true
  },
  calendar: {
    display: true,
    link: 'https://cal.com/salvador-castro/30min'
  },
  intro: {
    display: true,
    title: 'Introducción',
    description: (
      <>
        <p>
          Soy Salvador Castro, desarrollador web freelance para PyMEs en Buenos
          Aires, Argentina y Uruguay. Diseño y desarrollo páginas web, tiendas
          online, sistemas de turnos y sistemas a medida para comercios,
          profesionales y empresas que quieren conseguir más clientes por
          internet: sitios rápidos, pensados para el celular y para aparecer en
          Google, con contacto directo por WhatsApp.
        </p>
        <p>
          Trabajé con barberías y salones de belleza, una carnicería con tienda
          online, un centro médico que gestiona sus turnos online y eventos en
          Uruguay. Podés ver esos proyectos en <a href='/trabajos'>Trabajos</a>{' '}
          o conocer qué hago y cuánto cuesta en{' '}
          <a href='/servicios'>Servicios</a>.
        </p>
        <p>
          En paralelo estudio Ingeniería en Sistemas de Información en la UTN y
          formo parte de la Legislatura de la Ciudad de Buenos Aires, donde
          desarrollo interfaces con React, Next.js y Tailwind para sistemas
          internos y antes me ocupé del Help Desk. Esa trayectoria combina
          diseño, desarrollo y soporte, y es la base con la que trabajo en cada
          proyecto.
        </p>
      </>
    )
  },
  trabajos: {
    display: true,
    title: 'Experiencia Laboral',
    experiences: [
      {
        company: 'Legislatura de la Ciudad de Buenos Aires',
        timeframe: 'Dic. 2022 - Actualidad',
        roles: [
          {
            role: 'Frontend Developer / Sep. 2025 – Actualidad',
            achievements: [
              <>
                Desarrollo de interfaces modernas con React, Next.js y Tailwind
                para los sistemas internos de la institución.
              </>,
              <>
                Implementación de componentes reutilizables, optimización del
                rendimiento y construcción de dashboards administrativos.
              </>
            ]
          },
          {
            role: 'Help Desk / Dic. 2022 – Dic. 2025',
            achievements: [
              <>
                Instalación y activación de programas, mantenimiento preventivo
                de redes informáticas y resolución de incidencias para asegurar
                el funcionamiento óptimo de los sistemas.
              </>,
              <>
                Reparación de PCs, instalación de equipos e impresoras en red, y
                supervisión del correcto estado operativo de los dispositivos
                tecnológicos de la institución.
              </>
            ]
          }
        ],

        images: []
      },
      {
        company: 'Netuy Uruguay',
        timeframe: 'Jun. 2021 - Sept. 2021',
        role: 'Help Desk',
        achievements: [
          <>
            Asistencia técnica remota, pruebas unitarias de sistemas y soporte
            en el uso de WordPress, garantizando el correcto funcionamiento de
            las plataformas digitales.
          </>
        ],
        images: []
      }
    ]
  },
  studies: {
    display: true,
    title: 'Formación académica',
    institutions: [
      {
        name: 'Universidad Tecnológica Nacional (FRBA)',
        description: (
          <>
            Estudiante de Ingeniería en Sistemas de Información (2016 -
            actualidad).
          </>
        )
      },
      {
        name: 'Centro de e-Learning UTN FRBA',
        description: (
          <>
            <strong>Programación Web Full Stack</strong> (sep. 2019 - dic. 2019)
            — Nota: 8.50
            <br />
            <strong>Diplomatura en Python</strong> (may. 2020 - nov. 2020) —
            Nota: Aprobado
            <br />
            <strong>Experto Universitario en Hacking Ético</strong> (feb. 2020 -
            sept. 2020) — Nota: Excelente
            <br />
            <strong>Diplomatura en Business Intelligence</strong> (jun. 2020 -
            sept. 2020) — Nota: Aprobado
            <br />
            <strong>PHP y MySQL Inicial</strong> (nov. 2020 - ene. 2021) — Nota:
            Excelente
            <br />
            <strong>Liderazgo Estratégico</strong> (jun. 2020 - ago. 2020) —
            Nota: Muy Buena
            <br />
            <strong>Fundamentos del Liderazgo y el Coaching</strong> (may. 2020
            - jul. 2020) — Nota: Aprobado
            <br />
            <strong>Oratoria, persuasión y comunicación efectiva</strong> (abr.
            2020 - may. 2020) — Nota: Muy Buena
            <br />
            <strong>Operador Excel 2016 – Inicial</strong> (sep. 2019 - nov.
            2019) — Nota: 6
            <br />
            <strong>Armado y Reparación de PC</strong> (sep. 2019 - dic. 2019) —
            Nota: 7
            <br />
            <strong>Curso básico de Perito Judicial Informático</strong> (jun.
            2020 - oct. 2020) — Nota: Bueno
            <br />
            <strong>Professional Webmaster</strong> (oct. 2022 - mar. 2023) —
            Nota: Aprobado
          </>
        )
      }
    ]
  },
  technical: {
    display: true,
    title: 'Tecnologías que uso',
    skills: [
      {
        title: '🎨 Frontend',
        description: (
          <>
            Trabajo con tecnologías modernas del frontend como JavaScript, Vue,
            React, Bootstrap y Tailwind para construir interfaces dinámicas,
            responsivas y modernas.
          </>
        ),
        images: [
          {
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
            alt: 'JavaScript',
            width: 64,
            height: 64
          },
          {
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
            alt: 'Vue.js',
            width: 64,
            height: 64
          },
          {
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            alt: 'React',
            width: 64,
            height: 64
          },
          {
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
            alt: 'Bootstrap',
            width: 64,
            height: 64
          },
          {
            src: 'https://cdn.simpleicons.org/tailwindcss/06B6D4.svg',
            alt: 'Tailwind',
            width: 64,
            height: 64
          },
          {
            src: 'https://vitejs.dev/logo.svg',
            alt: 'Vite',
            width: 64,
            height: 64
          }
        ]
      },
      {
        title: '🧠 Backend',
        description: (
          <>
            Utilizo PHP con Laravel, Python con Django o Flask, y bases de datos
            como MySQL para desarrollar APIs robustas y sistemas escalables.
          </>
        ),
        images: [
          {
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
            alt: 'PHP',
            width: 64,
            height: 64
          },
          {
            src: 'https://cdn.simpleicons.org/laravel/FF2D20.svg',
            alt: 'Laravel',
            width: 64,
            height: 64
          },
          {
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
            alt: 'Python',
            width: 64,
            height: 64
          },
          {
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
            alt: 'Django',
            width: 64,
            height: 64
          },
          {
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
            alt: 'Flask',
            width: 64,
            height: 64
          },
          {
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
            alt: 'MySQL',
            width: 64,
            height: 64
          },
          {
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg',
            alt: 'Symfony',
            width: 64,
            height: 64
          }
        ]
      },
      {
        title: '🧰 Herramientas y librerías',
        description: (
          <>
            Me apoyo en herramientas clave como Git, Node.js, Selenium y
            librerías como PHPMailer y Twig para automatización, envío de
            correos y plantillas.
          </>
        ),
        images: [
          {
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
            alt: 'Git',
            width: 64,
            height: 64
          },
          {
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
            alt: 'Node.js',
            width: 64,
            height: 64
          },
          {
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg',
            alt: 'Selenium',
            width: 64,
            height: 64
          },
          {
            src: 'https://user-images.githubusercontent.com/973783/46407973-3c5dbf80-c72e-11e8-947c-d1fdaaa28f73.png',
            alt: 'Twig',
            width: 64,
            height: 64
          },
          {
            src: 'https://cdn.worldvectorlogo.com/logos/phpmailer-1.svg',
            alt: 'PHPMailer',
            width: 64,
            height: 64
          },
          {
            src: 'https://img.icons8.com/ios-filled/100/database.png',
            alt: 'CRUD',
            width: 64,
            height: 64
          }
        ]
      }
    ]
  }
}

const blog = {
  path: '/blog',
  label: 'Blog',
  title: `Noticias y Tendencias Tech`,
  metaTitle: `Blog de tecnología: noticias y guías prácticas | ${person.name}`,
  description: `Actualidad tecnológica con novedades, lanzamientos, tendencias y herramientas verificadas para mantenerse al día en el mundo digital.`
}

const trabajos = {
  path: '/trabajos',
  label: 'Trabajos',
  title: `Casos de éxito: páginas web y sistemas para PyMEs | ${person.name}`,
  headline: 'Casos de éxito',
  description: `Proyectos reales: webs para barberías y salones, tienda online para una carnicería, sistemas de turnos y sitios de eventos en Argentina y Uruguay.`
}

const servicios = {
  path: '/servicios',
  label: 'Servicios',
  title: `Servicios y precios de desarrollo web para PyMEs | ${person.name}`,
  description: `Landing pages, páginas institucionales, tiendas online, sistemas de turnos y sistemas a medida para PyMEs de Argentina y Uruguay, ${fromPrice(minPrice())}.`,
  hero: {
    title: 'Servicios de desarrollo web para tu negocio',
    subline: (
      <>
        Trabajo con comercios, profesionales y PyMEs que necesitan una presencia
        digital que realmente sume clientes: más turnos, más ventas, más
        consultas.
      </>
    )
  },
  offerings: [
    {
      slug: 'paginas-web',
      icon: 'globe',
      title: 'Páginas web y landing pages',
      tagline: 'Tu negocio, online y bien presentado',
      description:
        'Un sitio a medida para mostrar tus servicios, generar confianza y convertir visitas en consultas por WhatsApp o formulario.',
      features: [
        'Diseño a medida para tu marca',
        'Optimizado para celular',
        'Botón de contacto directo por WhatsApp',
        'SEO básico para aparecer en Google'
      ],
      caseStudy: {
        label: 'Ver caso: Clapton Barbershop',
        href: '/trabajos/ClaptonBarberia'
      }
    },
    {
      slug: 'sistemas-de-turnos',
      icon: 'calendar',
      title: 'Sistemas de turnos y reservas',
      tagline: 'Menos mensajes, más agenda ordenada',
      description:
        'Plataformas de reserva online para salones, consultorios y profesionales con agenda, recordatorios automáticos y panel de administración.',
      features: [
        'Agenda online 24/7',
        'Notificaciones automáticas por WhatsApp y Email',
        'Panel de administración de turnos y profesionales',
        'Control de accesos por rol'
      ],
      caseStudy: {
        label: 'Ver caso: Salud Femenina Integral',
        href: '/trabajos/Sistema-Turnos-SFI'
      }
    },
    {
      slug: 'tiendas-online',
      icon: 'grid',
      title: 'Tiendas online',
      tagline: 'Vendé todos los días, no solo cuando abrís',
      description:
        'Tiendas online con catálogo, carrito y pagos integrados, más un panel para gestionar productos, pedidos y clientes vos mismo.',
      features: [
        'Catálogo y carrito de compras',
        'Pagos con Mercado Pago',
        'Panel de administración de productos y pedidos',
        'Gestión de usuarios y stock'
      ],
      caseStudy: {
        label: 'Ver caso: La Vaca Roja',
        href: '/trabajos/LaVacaRoja'
      }
    },
    {
      slug: 'sistemas-a-medida',
      icon: 'document',
      title: 'Sistemas a medida',
      tagline: 'Gestión, SaaS y facturación sin planillas',
      description:
        'Sistemas web para ordenar la operación de tu PyME: gestión interna, paneles de administración, productos SaaS, facturación electrónica y automatizaciones.',
      features: [
        'Panel con usuarios, roles y permisos',
        'Dashboards y reportes exportables',
        'Integraciones: Mercado Pago, WhatsApp y facturación electrónica',
        'Automatizaciones y tareas programadas'
      ],
      caseStudy: {
        label: 'Ver caso: Turnos Clapton',
        href: '/trabajos/Turnos-Clapton'
      }
    },
    {
      slug: 'mantenimiento',
      icon: 'refresh',
      title: 'Mantenimiento y Mejoras',
      tagline: '¿Ya tenés una web? La hacemos crecer',
      description:
        'Mejoras de performance, SEO, nuevas funcionalidades o rediseño de sitios existentes, con soporte continuo.',
      features: [
        'Auditoría de performance y SEO',
        'Nuevas funcionalidades a medida',
        'Corrección de errores y actualizaciones',
        'Soporte continuo'
      ],
      caseStudy: null
    }
  ],
  process: [
    {
      title: 'Charla inicial sin cargo',
      description: 'Me contás qué necesita tu negocio y evaluamos si encajamos.'
    },
    {
      title: 'Propuesta clara',
      description:
        'Recibís alcance, tiempos y presupuesto por escrito, sin letra chica.'
    },
    {
      title: 'Desarrollo con seguimiento',
      description:
        'Vas viendo avances reales durante todo el proceso, no recién al final.'
    },
    {
      title: 'Entrega y soporte',
      description:
        'Te capacito para usar tu sistema y quedo disponible para futuras mejoras.'
    }
  ],
  cta: {
    title: '¿Tenés un negocio y querés vender o agendar más por internet?',
    subline: 'Contame qué necesitás y te paso un presupuesto sin compromiso.',
    whatsappLabel: 'Escribime por WhatsApp',
    whatsappHref: waLink(
      'Hola Salvador! Vi tu web y me interesa hacer una consulta sobre un proyecto para mi negocio.'
    ),
    calendarLabel: 'Agendar una llamada'
  }
}

export {
  person,
  social,
  newsletter,
  home,
  sobremi,
  blog,
  trabajos,
  servicios,
  waLink
}
