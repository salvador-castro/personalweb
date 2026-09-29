"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { Button, Column, Flex, Grid, Input, Text } from "@/once-ui/components";
import Post from "./Post";
import styles from "./Posts.module.scss";

export interface FilterablePost {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    image?: string;
    tag?: string;
  };
}

interface BlogFiltersProps {
  posts: FilterablePost[];
  children: ReactNode;
}

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

// Case- and accent-insensitive comparison
const normalize = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

const monthLabel = (yearMonth: string) => {
  const [year, month] = yearMonth.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
};

export function BlogFilters({ posts, children }: BlogFiltersProps) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [month, setMonth] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [open, setOpen] = useState(false);

  const tags = useMemo(
    () =>
      [...new Set(posts.map((post) => post.metadata.tag).filter(Boolean))].sort((a, b) =>
        (a as string).localeCompare(b as string, "es"),
      ) as string[],
    [posts],
  );

  const months = useMemo(
    () =>
      [...new Set(posts.map((post) => post.metadata.publishedAt.slice(0, 7)))].sort().reverse(),
    [posts],
  );

  // Restore filters from the URL so filtered views can be shared
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? "");
    setTag(params.get("tag") ?? "");
    setMonth(params.get("fecha") ?? "");
    // Show the panel when arriving with a shared filtered URL
    setOpen(params.has("q") || params.has("tag") || params.has("fecha"));
    setInitialized(true);
  }, []);

  useEffect(() => {
    // Don't overwrite the URL before its params have been read
    if (!initialized) return;
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (tag) params.set("tag", tag);
    if (month) params.set("fecha", month);
    const search = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${search ? `?${search}` : ""}`);
  }, [query, tag, month, initialized]);

  const isFiltering = Boolean(query.trim() || tag || month);

  const filteredPosts = useMemo(() => {
    if (!isFiltering) return [];
    const q = normalize(query);
    return posts
      .filter((post) => !q || normalize(post.metadata.title).includes(q))
      .filter((post) => !tag || post.metadata.tag === tag)
      .filter((post) => !month || post.metadata.publishedAt.startsWith(month))
      .sort(
        (a, b) =>
          new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
      );
  }, [posts, query, tag, month, isFiltering]);

  const clearFilters = () => {
    setQuery("");
    setTag("");
    setMonth("");
  };

  const toggleFilters = () => {
    if (open) clearFilters();
    setOpen(!open);
  };

  return (
    <>
      <Flex fillWidth horizontal="end" marginBottom={open ? "12" : "24"}>
        <Button
          type="button"
          data-border="rounded"
          variant="secondary"
          size="s"
          suffixIcon={open ? "chevronUp" : "chevronDown"}
          aria-expanded={open}
          aria-controls="blog-filters"
          onClick={toggleFilters}
        >
          {open ? "Ocultar filtros" : "Filtrar posts"}
        </Button>
      </Flex>
      {open && (
        <Column as="form" id="blog-filters" role="search" fillWidth gap="12" marginBottom="40" onSubmit={(e) => e.preventDefault()}>
          <Input
            id="blog-search"
            label="Buscar por título"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Flex fillWidth gap="12" mobileDirection="column">
            <select
              aria-label="Filtrar por tag"
              className={styles.select}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="">Todos los tags</option>
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              aria-label="Filtrar por fecha"
              className={styles.select}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">Todas las fechas</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {monthLabel(m)}
                </option>
              ))}
            </select>
          </Flex>
          {isFiltering && (
            <Flex fillWidth horizontal="space-between" vertical="center" gap="12">
              <Text variant="body-default-s" onBackground="neutral-weak" aria-live="polite">
                {filteredPosts.length === 1
                  ? "1 post encontrado"
                  : `${filteredPosts.length} posts encontrados`}
              </Text>
              <Button
                type="button"
                data-border="rounded"
                variant="tertiary"
                size="s"
                prefixIcon="close"
                onClick={clearFilters}
              >
                Limpiar filtros
              </Button>
            </Flex>
          )}
        </Column>
      )}

      {!isFiltering ? (
        children
      ) : filteredPosts.length > 0 ? (
        <Grid columns="2" mobileColumns="1" fillWidth marginBottom="40" gap="12">
          {filteredPosts.map((post) => (
            <Post key={post.slug} post={post} thumbnail={false} />
          ))}
        </Grid>
      ) : (
        <Column fillWidth horizontal="center" paddingY="40" marginBottom="40">
          <Text variant="body-default-m" onBackground="neutral-weak">
            No hay posts que coincidan con esos filtros.
          </Text>
        </Column>
      )}
    </>
  );
}
