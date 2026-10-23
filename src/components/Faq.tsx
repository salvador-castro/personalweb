import { Column, Heading, Line, Text } from "@/once-ui/components";
import type { FaqItem } from "@/app/resources/services";

interface FaqProps {
  items: FaqItem[];
  title?: string;
  id?: string;
}

// Questions and answers rendered as plain visible text, so crawlers and AI engines can quote them
export function Faq({ items, title = "Preguntas frecuentes", id }: FaqProps) {
  return (
    <Column id={id} fillWidth gap="m">
      <Heading as="h2" variant="display-strong-xs" wrap="balance">
        {title}
      </Heading>
      <Column fillWidth gap="20">
        {items.map((item, index) => (
          <Column key={item.question} fillWidth gap="8">
            {index > 0 && <Line marginBottom="12" />}
            <Heading as="h3" variant="heading-strong-m" wrap="balance">
              {item.question}
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              {item.answer}
            </Text>
          </Column>
        ))}
      </Column>
    </Column>
  );
}
