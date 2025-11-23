// C:\Users\salvaCastro\Documents\proyectos\personalweb\src\components\ThemeToggle.tsx
"use client";

import React from "react";
import { ToggleButton, useTheme } from "@/once-ui/components";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleButton
      prefixIcon={theme === "dark" ? "sun" : "moon"}  // ← iconos ORIGINALES
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      selected={false}
      aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
    />
  );
};
