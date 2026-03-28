"use client";

import { useEffect } from "react";
import { Button, Column, Heading, Text } from "@/once-ui/components";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Column as="section" fill center paddingBottom="160" gap="l">
      <Text marginBottom="s" variant="display-strong-xl">
        500
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        Algo salió mal
      </Heading>
      <Text onBackground="neutral-weak">
        Ocurrió un error inesperado. Podés intentar recargar la página.
      </Text>
      <Button onClick={reset} variant="primary" size="m" prefixIcon="refresh">
        Reintentar
      </Button>
    </Column>
  );
}
