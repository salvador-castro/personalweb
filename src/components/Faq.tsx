import { Column, Heading, Icon, Text } from "@/once-ui/components";
import type { FaqItem } from "@/app/resources/services";
import styles from "./Faq.module.scss";

interface FaqProps {
  items: FaqItem[];
  title?: string;
  id?: string;
}

// Native <details>/<summary> accordion: closed by default, keyboard accessible, and the answers
// stay in the server HTML so crawlers and AI engines can still read and quote them.
export function Faq({ items, title = "Preguntas frecuentes", id }: FaqProps) {
  return (
    <Column id={id} fillWidth gap="m">
      <Heading as="h2" variant="display-strong-xs" wrap="balance">
        {title}
      </Heading>
      <Column fillWidth>
        {items.map((item) => (
          <details key={item.question} className={styles.item}>
            <summary className={styles.summary}>
              <Heading as="h3" variant="heading-strong-m" wrap="balance">
                {item.question}
              </Heading>
              <Icon name="chevronDown" size="s" onBackground="neutral-weak" className={styles.chevron} />
            </summary>
            <div className={styles.answer}>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {item.answer}
              </Text>
            </div>
          </details>
        ))}
      </Column>
    </Column>
  );
}
