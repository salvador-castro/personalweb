import { Column, Row, Skeleton } from "@/once-ui/components";

export default function TrabajoLoading() {
  return (
    <Row fillWidth>
      <Row maxWidth={12} hide="m" />
      <Row fillWidth horizontal="center">
        <Column maxWidth="xs" gap="l">
          <Skeleton shape="line" width="s" height="s" />
          <Skeleton shape="line" width="l" height="m" />
          <Skeleton shape="block" width="l" height="xl" />
          <Skeleton shape="line" width="l" height="s" delay="1" />
          <Skeleton shape="line" width="m" height="s" delay="2" />
          <Skeleton shape="line" width="l" height="s" delay="3" />
        </Column>
      </Row>
    </Row>
  );
}
