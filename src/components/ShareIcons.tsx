"use client";

import {
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  MessageCircle
} from "lucide-react";
import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useState } from "react";

type ShareIconsProps = {
  url?: string;
  text?: string;
};

export default function ShareIcons({
  url,
  text = "Mirá este artículo"
}: ShareIconsProps) {
  const [shareUrl, setShareUrl] = useState<string>(url ?? "");
  const [copied, setCopied] = useState(false);

  // Si no se pasa url, usar la URL actual
  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setShareUrl(window.location.href);
    } else if (url) {
      setShareUrl(url);
    }
  }, [url]);

  const encodedURL = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(text);

  const links = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedURL}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedURL}`
  };

  const baseWrapper: CSSProperties = {
    width: "34px",
    height: "34px",
    borderRadius: "999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.96)",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(15,23,42,0.12)"
  };

  const iconStyle: CSSProperties = {
    width: "18px",
    height: "18px"
  };

  const handleCopy = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("No se pudo copiar el enlace:", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
        marginTop: "22px",
        marginBottom: "4px"
      }}
    >
      <span
        style={{
          fontSize: "14px",
          fontWeight: 500,
          opacity: 0.8
        }}
      >
        Compartir en:
      </span>

      <div style={{ display: "flex", gap: "10px" }}>
        
        {/* Twitter */}
        <a href={links.twitter} target="_blank" rel="noopener noreferrer">
          <div style={{ ...baseWrapper, color: "#1DA1F2" }}>
            <Twitter style={iconStyle} />
          </div>
        </a>

        {/* Facebook */}
        <a href={links.facebook} target="_blank" rel="noopener noreferrer">
          <div style={{ ...baseWrapper, color: "#1877F2" }}>
            <Facebook style={iconStyle} />
          </div>
        </a>

        {/* LinkedIn */}
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
          <div style={{ ...baseWrapper, color: "#0A66C2" }}>
            <Linkedin style={iconStyle} />
          </div>
        </a>

        {/* WhatsApp */}
        <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">
          <div style={{ ...baseWrapper, color: "#25D366" }}>
            <MessageCircle style={iconStyle} />
          </div>
        </a>

        {/* Instagram: copiar link */}
        <button
          type="button"
          onClick={handleCopy}
          style={{
            ...baseWrapper,
            color: "#E1306C", // color base del gradiente de Instagram
            border:
              copied === true
                ? "2px solid rgba(34,197,94,0.9)"
                : "1px solid rgba(15,23,42,0.18)"
          }}
          aria-label="Copiar enlace para Instagram"
          title={copied ? "Link copiado" : "Copiar enlace"}
        >
          <Instagram style={iconStyle} />
        </button>
      </div>

      {copied && (
        <span
          style={{
            fontSize: "12px",
            opacity: 0.8
          }}
        >
          Link copiado ✨
        </span>
      )}
    </div>
  );
}
