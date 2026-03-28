import { Button, Column, Heading, Text } from "@/once-ui/components";

export default function NotFound() {
  return (
    <Column as="section" fill center paddingBottom="160" gap="l">
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        Página no encontrada
      </Heading>
      <Text onBackground="neutral-weak">
        La página que buscás no existe o fue movida.
      </Text>
      <Button href="/" variant="primary" size="m" prefixIcon="home">
        Volver al inicio
      </Button>
    </Column>
  );
}
