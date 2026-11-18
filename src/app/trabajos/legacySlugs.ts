// Old PascalCase project slugs -> current kebab-case slugs. Used by the middleware to send a
// permanent redirect from the old URL. Keys are lowercase: the lookup is case-insensitive.
export const LEGACY_PROJECT_SLUGS: Record<string, string> = {
  arteurbano: "arte-urbano",
  beorange: "be-orange",
  bitcoinweek: "bitcoin-week",
  claptonbarberia: "clapton-barberia",
  crudmoviesphp: "crud-movies-php",
  darioblanco: "dario-blanco",
  lavacaroja: "la-vaca-roja",
  moramachado: "mora-machado",
  pluginagency: "plugin-agency",
  "sistema-turnos-sfi": "sistema-turnos-sfi",
  "turnos-clapton": "turnos-clapton",
  whatsappgroup: "whatsapp-group",
};
