import React from "react";

/**
 * Renders JSON-LD as a plain <script> so it ships in the server HTML.
 * (next/script injects it on the client, which crawlers that don't run JS never see.)
 */
export function JsonLd({ data, id }: { data: Record<string, unknown>; id?: string }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Escape "<" so content can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default JsonLd;
