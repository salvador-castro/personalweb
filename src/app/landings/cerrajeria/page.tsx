import { Metadata } from "next";
import { Flex, Heading, Text, Button, Column, Icon } from "@/once-ui/components";

export const metadata: Metadata = {
  title: "Cerrajería 24/7 - Servicio de Cerrajería Profesional",
  description: "Servicio de cerrajería disponible las 24 horas. Apertura de puertas, cambio de cerraduras, cerrajería automotriz.",
};

export default function CerrajeriaLanding() {
  return (
    <Flex
      fillWidth
      direction="column"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Hero Section */}
      <Flex
        fillWidth
        direction="column"
        horizontal="center"
        vertical="center"
        paddingY="xl"
        paddingX="l"
        gap="xl"
        style={{ minHeight: "80vh", color: "white" }}
      >
        <Column maxWidth="m" horizontal="center" gap="l">
          <Heading
            as="h1"
            variant="display-strong-xl"
            style={{ color: "white", textAlign: "center" }}
          >
            🔑 Cerrajería 24/7
          </Heading>
          
          <Heading
            as="h2"
            variant="heading-default-xl"
            style={{ color: "rgba(255,255,255,0.9)", textAlign: "center" }}
          >
            ¿Te quedaste afuera? Te ayudamos en minutos
          </Heading>

          <Text
            variant="body-default-l"
            style={{ color: "rgba(255,255,255,0.8)", textAlign: "center" }}
          >
            Servicio de cerrajería disponible las 24 horas, los 7 días de la semana.
            Profesionales certificados a tu servicio.
          </Text>

          <Flex gap="m" wrap horizontal="center" paddingTop="l">
            <Button
              href="tel:+5491123456789"
              size="l"
              variant="primary"
              style={{
                backgroundColor: "#10b981",
                fontSize: "1.2rem",
                padding: "1rem 2rem",
              }}
            >
              📞 Llamar Ahora
            </Button>
            <Button
              href="https://wa.me/5491123456789"
              size="l"
              variant="secondary"
              style={{ fontSize: "1.2rem", padding: "1rem 2rem" }}
            >
              💬 WhatsApp
            </Button>
          </Flex>
        </Column>
      </Flex>

      {/* Services Section */}
      <Flex
        fillWidth
        direction="column"
        horizontal="center"
        paddingY="xl"
        paddingX="l"
        style={{ backgroundColor: "white" }}
      >
        <Column maxWidth="l" gap="xl">
          <Heading
            as="h2"
            variant="display-strong-m"
            style={{ textAlign: "center" }}
          >
            Nuestros Servicios
          </Heading>

          <Flex
            gap="l"
            wrap
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            {[
              { icon: "🔓", title: "Apertura de Puertas", desc: "Sin daño a tu propiedad" },
              { icon: "🔐", title: "Cambio de Cerraduras", desc: "Cerraduras de alta seguridad" },
              { icon: "🚗", title: "Cerrajería Automotriz", desc: "Llaves y programación" },
              { icon: "🏢", title: "Cerrajería Comercial", desc: "Para tu negocio" },
              { icon: "🏠", title: "Instalación", desc: "Cerraduras de seguridad" },
              { icon: "⚡", title: "Servicio Express", desc: "Atención inmediata" },
            ].map((service, idx) => (
              <Flex
                key={idx}
                direction="column"
                gap="s"
                padding="l"
                radius="l"
                border="neutral-medium"
                borderStyle="solid"
                style={{
                  backgroundColor: "#f9fafb",
                  textAlign: "center",
                  transition: "transform 0.2s",
                }}
              >
                <Text style={{ fontSize: "3rem" }}>{service.icon}</Text>
                <Heading as="h3" variant="heading-strong-s">
                  {service.title}
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {service.desc}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Column>
      </Flex>

      {/* Why Choose Us */}
      <Flex
        fillWidth
        direction="column"
        horizontal="center"
        paddingY="xl"
        paddingX="l"
        style={{ backgroundColor: "#f3f4f6" }}
      >
        <Column maxWidth="m" gap="l">
          <Heading
            as="h2"
            variant="display-strong-m"
            style={{ textAlign: "center" }}
          >
            ¿Por qué elegirnos?
          </Heading>

          <Flex direction="column" gap="m">
            {[
              "✅ Atención inmediata - menos de 30 minutos",
              "✅ Profesionales certificados y con experiencia",
              "✅ Precios transparentes - sin sorpresas",
              "✅ Garantía en todos nuestros trabajos",
              "✅ Servicio 24/7 - 365 días del año",
            ].map((item, idx) => (
              <Text key={idx} variant="body-default-l">
                {item}
              </Text>
            ))}
          </Flex>
        </Column>
      </Flex>

      {/* CTA Section */}
      <Flex
        fillWidth
        direction="column"
        horizontal="center"
        vertical="center"
        paddingY="xl"
        paddingX="l"
        gap="l"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <Heading
          as="h2"
          variant="display-strong-l"
          style={{ color: "white", textAlign: "center" }}
        >
          ¿Necesitas ayuda urgente?
        </Heading>
        <Text
          variant="heading-default-m"
          style={{ color: "rgba(255,255,255,0.9)", textAlign: "center" }}
        >
          Llamanos ahora y estaremos contigo en minutos
        </Text>
        <Flex gap="m" wrap horizontal="center">
          <Button
            href="tel:+5491123456789"
            size="l"
            variant="primary"
            style={{
              backgroundColor: "#10b981",
              fontSize: "1.3rem",
              padding: "1.2rem 2.5rem",
            }}
          >
            📞 +54 9 11 2345-6789
          </Button>
        </Flex>
      </Flex>

      {/* Footer */}
      <Flex
        fillWidth
        horizontal="center"
        paddingY="m"
        style={{ backgroundColor: "#1f2937", color: "white" }}
      >
        <Text variant="body-default-s" style={{ color: "rgba(255,255,255,0.7)" }}>
          © 2026 Cerrajería 24/7 - Servicio profesional de cerrajería
        </Text>
      </Flex>
    </Flex>
  );
}
