// C:\Users\salvaCastro\Documents\proyectos\personalweb\src\components\Header.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, ToggleButton } from "@/once-ui/components";
import styles from "@/components/Header.module.scss";

import { routes, display } from "@/app/resources";
import { person, sobremi, blog, trabajos, servicios } from "@/app/resources/content";
import { ThemeToggle } from "./ThemeToggle";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  // Reserve the width up front so the nav doesn't shift when the time appears (CLS)
  return (
    <span
      style={{
        display: "inline-block",
        minWidth: "8ch",
        textAlign: "right",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {currentTime}
    </span>
  );
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <>
      <Fade hide="s" fillWidth position="fixed" height="80" zIndex={9} />
      <Fade show="s" fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />

      <Flex
        fitHeight
        position="unset"
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
      >
        {/* Columna izquierda: ubicación */}
        <Flex
          paddingLeft="12"
          vertical="center"
          textVariant="body-default-s"
          style={{ minWidth: 0 }}
        >
          {display.location && <Flex hide="s">{person.location}</Flex>}
        </Flex>

        {/* Columna central: navegación */}
        <Flex fillWidth horizontal="center" style={{ pointerEvents: "auto" }}>
          <Flex
            background="surface"
            border="neutral-alpha-medium"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
          >
            <Flex gap="4" vertical="center" textVariant="body-default-s">
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" aria-label="Inicio" selected={pathname === "/"} />
              )}

              <Line background="neutral-alpha-medium" vert maxHeight="24" />

              {routes["/servicios"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="clipboard"
                    href="/servicios"
                    label={servicios.label}
                    selected={pathname.startsWith("/servicios")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="clipboard"
                    href="/servicios"
                    aria-label="Servicios"
                    selected={pathname.startsWith("/servicios")}
                  />
                </>
              )}

              {routes["/sobre-mi"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="person"
                    href="/sobre-mi"
                    label={sobremi.label}
                    selected={pathname === "/sobre-mi"}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="person"
                    href="/sobre-mi"
                    aria-label="Sobre mí"
                    selected={pathname === "/sobre-mi"}
                  />
                </>
              )}

              {routes["/trabajos"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="grid"
                    href="/trabajos"
                    label={trabajos.label}
                    selected={pathname.startsWith("/trabajos")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="grid"
                    href="/trabajos"
                    aria-label="Trabajos"
                    selected={pathname.startsWith("/trabajos")}
                  />
                </>
              )}

              {routes["/blog"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="book"
                    href="/blog"
                    label={blog.label}
                    selected={pathname.startsWith("/blog")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="book"
                    href="/blog"
                    aria-label="Blog"
                    selected={pathname.startsWith("/blog")}
                  />
                </>
              )}

              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Flex>
          </Flex>
        </Flex>

        {/* Columna derecha: hora (sin fillWidth para no tapar el centro) */}
        <Flex
          horizontal="end"
          vertical="center"
          style={{ minWidth: "auto", pointerEvents: "auto" }}
        >
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex hide="s">
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
