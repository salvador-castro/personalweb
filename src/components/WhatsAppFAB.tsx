"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IconButton } from "@/once-ui/components";
import { person, waLink } from "@/app/resources/content";

const HIDDEN_ON = ["/servicios"];

export const WhatsAppFAB = () => {
  const pathname = usePathname() ?? "";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (HIDDEN_ON.some((route) => pathname.startsWith(route))) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 10,
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.8)",
        transition: "opacity 0.2s ease, transform 0.2s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <IconButton
        href={waLink(`Hola ${person.firstName}! Vi tu web y quiero hacer una consulta sobre un proyecto para mi negocio.`)}
        icon="whatsapp"
        size="l"
        variant="primary"
        tooltip="Escribime por WhatsApp"
        tooltipPosition="left"
      />
    </div>
  );
};
