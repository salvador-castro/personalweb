import { Metadata } from "next";
import { Flex, Heading, Text, Button, Column } from "@/once-ui/components";

export const metadata: Metadata = {
  title: "Super Mechi - Tu Supermercado de Barrio",
  description: "Los mejores productos frescos y de calidad al mejor precio. Delivery sin cargo. Verdulería, carnicería, panadería y más.",
};

export default function SuperMechiLanding() {
  return (
    <Flex
      fillWidth
      direction="column"
      style={{ minHeight: "100vh", backgroundColor: "#fff" }}
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
        style={{
          minHeight: "70vh",
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "white",
        }}
      >
        <Column maxWidth="m" horizontal="center" gap="l">
          <Heading
            as="h1"
            variant="display-strong-xl"
            style={{ color: "white", textAlign: "center" }}
          >
            🛒 Super Mechi
          </Heading>

          <Heading
            as="h2"
            variant="heading-default-xl"
            style={{ color: "rgba(255,255,255,0.95)", textAlign: "center" }}
          >
            Tu supermercado de barrio de confianza
          </Heading>

          <Text
            variant="body-default-l"
            style={{ color: "rgba(255,255,255,0.9)", textAlign: "center", maxWidth: "600px" }}
          >
            Los mejores productos frescos y de calidad al mejor precio.
            ¡Delivery sin cargo en compras mayores a $10.000!
          </Text>

          <Flex gap="m" wrap horizontal="center" paddingTop="l">
            <Button
              href="https://wa.me/5491123456789"
              size="l"
              variant="primary"
              style={{
                backgroundColor: "#ffffff",
                color: "#059669",
                fontSize: "1.2rem",
                padding: "1rem 2rem",
              }}
            >
              🛍️ Hacer Pedido
            </Button>
            <Button
              href="tel:+5491123456789"
              size="l"
              variant="secondary"
              style={{
                fontSize: "1.2rem",
                padding: "1rem 2rem",
                borderColor: "white",
                color: "white",
              }}
            >
              📞 Llamar
            </Button>
          </Flex>
        </Column>
      </Flex>

      {/* Products Section */}
      <Flex
        fillWidth
        direction="column"
        horizontal="center"
        paddingY="xl"
        paddingX="l"
      >
        <Column maxWidth="l" gap="xl">
          <Heading
            as="h2"
            variant="display-strong-m"
            style={{ textAlign: "center" }}
          >
            ¿Qué ofrecemos?
          </Heading>

          <Flex
            gap="l"
            wrap
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {[
              { icon: "🥬", title: "Verduras y Frutas", desc: "Frescas todos los días" },
              { icon: "🥩", title: "Carnicería Premium", desc: "Los mejores cortes" },
              { icon: "🍞", title: "Panadería Artesanal", desc: "Pan casero recién horneado" },
              { icon: "🥛", title: "Lácteos y Fiambrería", desc: "Productos de primera calidad" },
              { icon: "🧃", title: "Bebidas", desc: "Gaseosas, jugos y más" },
              { icon: "🧹", title: "Limpieza", desc: "Todo para tu hogar" },
            ].map((product, idx) => (
              <Flex
                key={idx}
                direction="column"
                gap="s"
                padding="l"
                radius="l"
                style={{
                  backgroundColor: "#f0fdf4",
                  textAlign: "center",
                  border: "2px solid #d1fae5",
                }}
              >
                <Text style={{ fontSize: "3.5rem" }}>{product.icon}</Text>
                <Heading as="h3" variant="heading-strong-m">
                  {product.title}
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {product.desc}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Column>
      </Flex>

      {/* Promos Section */}
      <Flex
        fillWidth
        direction="column"
        horizontal="center"
        paddingY="xl"
        paddingX="l"
        style={{ backgroundColor: "#fef3c7" }}
      >
        <Column maxWidth="m" gap="l">
          <Heading
            as="h2"
            variant="display-strong-m"
            style={{ textAlign: "center", color: "#92400e" }}
          >
            🎉 Promociones de la Semana
          </Heading>
          <Text variant="body-default-l" style={{ textAlign: "center" }}>
            Consultá nuestras ofertas especiales y llevate los mejores productos a
            precios increíbles. ¡Nuevas promociones cada semana!
          </Text>
          <Flex horizontal="center" paddingTop="m">
            <Button
              href="https://wa.me/5491123456789?text=Hola! Quiero saber sobre las promociones"
              size="l"
              variant="primary"
              style={{ backgroundColor: "#f59e0b" }}
            >
              Ver Promociones
            </Button>
          </Flex>
        </Column>
      </Flex>

      {/* Hours Section */}
      <Flex
        fillWidth
        direction="column"
        horizontal="center"
        paddingY="xl"
        paddingX="l"
      >
        <Column maxWidth="m" gap="l">
          <Heading
            as="h2"
            variant="display-strong-m"
            style={{ textAlign: "center" }}
          >
            Horarios de Atención
          </Heading>

          <Flex direction="column" gap="m" padding="l" radius="l" style={{ backgroundColor: "#f9fafb" }}>
            <Flex style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Text variant="body-default-l">
                <strong>Lunes a Sábado:</strong>
              </Text>
              <Text variant="body-default-l">8:00 - 21:00</Text>
            </Flex>
            <Flex style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Text variant="body-default-l">
                <strong>Domingos:</strong>
              </Text>
              <Text variant="body-default-l">9:00 - 14:00</Text>
            </Flex>
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
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "white",
        }}
      >
        <Heading
          as="h2"
          variant="display-strong-l"
          style={{ color: "white", textAlign: "center" }}
        >
          ¿Listo para hacer tu pedido?
        </Heading>
        <Text
          variant="heading-default-m"
          style={{ color: "rgba(255,255,255,0.95)", textAlign: "center" }}
        >
          Escribinos por WhatsApp y te asesoramos
        </Text>
        <Button
          href="https://wa.me/5491123456789"
          size="l"
          variant="primary"
          style={{
            backgroundColor: "#ffffff",
            color: "#059669",
            fontSize: "1.3rem",
            padding: "1.2rem 2.5rem",
          }}
        >
          💬 WhatsApp: +54 9 11 2345-6789
        </Button>
      </Flex>

      {/* Footer */}
      <Flex
        fillWidth
        horizontal="center"
        paddingY="m"
        style={{ backgroundColor: "#1f2937", color: "white" }}
      >
        <Text variant="body-default-s" style={{ color: "rgba(255,255,255,0.7)" }}>
          © 2026 Super Mechi - Cerca de vos, siempre
        </Text>
      </Flex>
    </Flex>
  );
}
