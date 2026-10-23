// Single source of truth for prices. Used by the service pages, FAQ, JSON-LD and /llms.txt.
// To update prices: change the amounts below and bump `updatedAt` / `updatedLabel`.

export type ServiceSlug = "paginas-web" | "tiendas-online" | "sistemas-de-turnos" | "sistemas-a-medida";

export interface PriceItem {
  id: string;
  service: ServiceSlug;
  label: string;
  from: number;
}

export const pricing = {
  updatedAt: "2026-10-01",
  updatedLabel: "octubre 2026",
  currency: "ARS",
  foreignCurrency: "USD",
  foreignNote:
    "Para clientes fuera de Argentina (Uruguay u otros países) el presupuesto se cotiza en dólares (USD).",
  items: [
    { id: "landing", service: "paginas-web", label: "Landing page", from: 150000 },
    {
      id: "institucional",
      service: "paginas-web",
      label: "Página institucional (3 a 5 secciones)",
      from: 375000,
    },
    { id: "tienda", service: "tiendas-online", label: "Tienda online", from: 450000 },
    { id: "turnos", service: "sistemas-de-turnos", label: "Sistema de turnos", from: 500000 },
    { id: "medida", service: "sistemas-a-medida", label: "Sistema a medida", from: 500000 },
  ] satisfies PriceItem[],
};

/** "$150.000" */
export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString("es-AR")}`;
}

/** "desde $150.000" */
export function fromPrice(amount: number): string {
  return `desde ${formatPrice(amount)}`;
}

export function pricesForService(service: ServiceSlug): PriceItem[] {
  return pricing.items.filter((item) => item.service === service);
}

/** Lowest price of a service (or of the whole catalog when no service is given). */
export function minPrice(service?: ServiceSlug): number {
  const items = service ? pricesForService(service) : pricing.items;
  return Math.min(...items.map((item) => item.from));
}

/** "Precios actualizados a octubre 2026" */
export const pricesUpdatedText = `Precios actualizados a ${pricing.updatedLabel}`;
