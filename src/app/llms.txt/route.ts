import { getPosts } from "@/app/utils/utils";
import { baseURL, routes as routesConfig } from "@/app/resources";
import { person, home, blog, servicios, trabajos, sobremi } from "@/app/resources/content";
import { generalFaq, servicePages, servicePath } from "@/app/resources/services";
import { pricing, pricesForService, fromPrice, pricesUpdatedText } from "@/app/resources/pricing";

export const dynamic = "force-static";

const byDateDesc = (a: { metadata: { publishedAt: string } }, b: { metadata: { publishedAt: string } }) =>
  new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();

export async function GET() {
  const posts = getPosts(["src", "app", "blog", "posts"]).sort(byDateDesc);
  const projects = getPosts(["src", "app", "trabajos", "projects"]).sort(byDateDesc);

  const services = servicePages.flatMap((page) => [
    `### [${page.name}](${baseURL}${servicePath(page.slug)})`,
    "",
    page.answer,
    "",
    ...pricesForService(page.slug).map((item) => `- ${item.label}: ${fromPrice(item.from)} ${pricing.currency}`),
    `- Plazo: ${page.timeline}`,
    "",
  ]);

  const pages = [
    routesConfig["/"] && `- [Inicio](${baseURL}/): ${home.description}`,
    routesConfig["/servicios"] && `- [${servicios.label}](${baseURL}${servicios.path}): ${servicios.description}`,
    routesConfig["/trabajos"] && `- [${trabajos.label}](${baseURL}${trabajos.path}): ${trabajos.description}`,
    routesConfig["/sobre-mi"] && `- [${sobremi.label}](${baseURL}${sobremi.path}): ${sobremi.description}`,
    routesConfig["/blog"] && `- [${blog.label}](${baseURL}${blog.path}): ${blog.description}`,
  ].filter(Boolean);

  const lines = [
    `# ${person.name} – ${person.role} en Buenos Aires`,
    "",
    `> ${home.description}`,
    "",
    `${person.name} es ${person.role.toLowerCase()} con base en la Ciudad de Buenos Aires, Argentina. Diseña y desarrolla páginas web, landing pages, tiendas online, sistemas de turnos y sistemas a medida para PyMEs, comercios y profesionales. Trabaja con clientes de CABA y el AMBA, del resto de Argentina y de Uruguay, de forma remota (y presencial en CABA/AMBA).`,
    "",
    "## Servicios y precios",
    "",
    `${pricesUpdatedText}. Los precios son orientativos, en pesos argentinos (${pricing.currency}), y el valor final depende del alcance de cada proyecto. ${pricing.foreignNote}`,
    "",
    ...services,
    "También ofrece mantenimiento, mejoras de performance y SEO para sitios existentes (se cotiza según el proyecto).",
    "",
    "## Zona de trabajo",
    "",
    "- Ciudad Autónoma de Buenos Aires (CABA) y Área Metropolitana de Buenos Aires (AMBA)",
    "- Resto de Argentina (remoto)",
    "- Uruguay y otros países (remoto, cotización en USD)",
    "",
    "## Cómo trabaja",
    "",
    ...servicios.process.map((step, index) => `${index + 1}. ${step.title}: ${step.description}`),
    "",
    "## Casos de éxito",
    "",
    ...projects.map(
      (project) =>
        `- [${project.metadata.title}](${baseURL}${trabajos.path}/${project.slug}): ${project.metadata.summary.replace(/\s+/g, " ").trim()}`,
    ),
    "",
    "## Preguntas frecuentes",
    "",
    ...generalFaq.flatMap((item) => [`### ${item.question}`, "", item.answer, ""]),
    "## Contacto",
    "",
    `- WhatsApp: ${person.phone} (https://wa.me/${person.whatsapp})`,
    `- Email: ${person.email}`,
    `- Agendar una llamada de 30 minutos: ${sobremi.calendar.link}`,
    `- LinkedIn: ${person.linkedin}`,
    `- GitHub: ${person.github}`,
    "",
    "## Páginas",
    "",
    ...pages,
    "",
    "## Optional",
    "",
    `Blog: ${blog.description}`,
    "",
    ...posts.map(
      (post) => `- [${post.metadata.title}](${baseURL}${blog.path}/${post.slug}): ${post.metadata.summary}`,
    ),
    "",
    `- [Sitemap](${baseURL}/sitemap.xml)`,
    `- [RSS del blog](${baseURL}/rss.xml)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
