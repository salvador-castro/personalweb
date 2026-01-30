"use client";

import { useState } from "react";
import Image from "next/image";

export default function LasFantasiasNazeliLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'Outfit', system-ui, -apple-system, sans-serif;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          background: #0a0a0a;
          overflow-x: hidden;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .glass-dark {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .gradient-text {
          background: linear-gradient(135deg, #a855f7, #ec4899, #f59e0b);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
        }

        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .card-3d:hover {
          transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
        }

        .glow {
          box-shadow: 0 0 40px rgba(168, 85, 247, 0.4),
                      0 0 80px rgba(236, 72, 153, 0.2);
        }

        .animate-in {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .scale-in {
          animation: scale-in 0.6s ease-out forwards;
        }

        .space-grotesk {
          font-family: 'Space Grotesk', monospace;
        }
      `}</style>

      {/* Navigation */}
      <nav className="glass-dark" style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        color: "white",
        padding: "1.5rem 2rem",
        zIndex: 1000,
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ 
            fontSize: "1.5rem", 
            fontWeight: "800", 
            letterSpacing: "-1px",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }} className="space-grotesk">
            <span style={{
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              padding: "0.3rem 0.6rem",
              borderRadius: "8px",
            }}>✨</span>
            Las Fantasías
          </div>
          
          {/* Desktop Menu */}
          <div style={{ display: "flex", gap: "3rem", alignItems: "center" }} className="desktop-menu">
            <a href="#inicio" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontWeight: "500", transition: "all 0.3s" }}>Inicio</a>
            <a href="#categorias" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontWeight: "500", transition: "all 0.3s" }}>Categorías</a>
            <a href="#galeria" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontWeight: "500", transition: "all 0.3s" }}>Galería</a>
            <a 
              href="https://www.instagram.com/las_fantasias_de_nazeli/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                color: "white", 
                textDecoration: "none", 
                fontWeight: "600",
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                padding: "0.7rem 1.8rem",
                borderRadius: "12px",
                transition: "all 0.3s",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              <span>📸</span> Instagram
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "none", color: "white", fontSize: "1.8rem", cursor: "pointer" }}
            className="mobile-menu-btn"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="glass-dark" style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "1rem", 
            marginTop: "1.5rem", 
            paddingTop: "1.5rem", 
            borderTop: "1px solid rgba(255,255,255,0.1)" 
          }}>
            <a href="#inicio" onClick={() => setMenuOpen(false)} style={{ color: "white", textDecoration: "none", fontWeight: "500" }}>Inicio</a>
            <a href="#categorias" onClick={() => setMenuOpen(false)} style={{ color: "white", textDecoration: "none", fontWeight: "500" }}>Categorías</a>
            <a href="#galeria" onClick={() => setMenuOpen(false)} style={{ color: "white", textDecoration: "none", fontWeight: "500" }}>Galería</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" style={{
        minHeight: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "8rem 2rem 4rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background Image */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}>
          <Image
            src="/images/landings/las-fantasias/tienda-ropa-tienda-ropa-perchas-tienda-boutique-moderna_1150-8886.jpg"
            alt="Las Fantasías de Nazeli Background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          {/* Dark overlay with gradient */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(26,10,46,0.9) 50%, rgba(10,10,10,0.85) 100%)",
            backdropFilter: "blur(2px)",
          }} />
        </div>

        {/* Animated Background Elements */}
        <div style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
          filter: "blur(60px)",
          zIndex: 1,
        }} />
        <div style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite",
          animationDelay: "1s",
          filter: "blur(60px)",
          zIndex: 1,
        }} />
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 10s ease-in-out infinite",
          animationDelay: "2s",
          filter: "blur(80px)",
          zIndex: 1,
        }} />

        <div style={{ maxWidth: "1100px", position: "relative", zIndex: 1 }} className="animate-in">
          <div className="glass" style={{
            display: "inline-block",
            padding: "0.6rem 1.5rem",
            borderRadius: "50px",
            fontSize: "0.95rem",
            fontWeight: "600",
            marginBottom: "2rem",
            letterSpacing: "0.5px",
          }}>
            ✨ MODA PARA TODA LA FAMILIA
          </div>

          <h1 style={{ 
            fontSize: "clamp(3rem, 8vw, 6rem)", 
            marginBottom: "2rem", 
            fontWeight: "900",
            lineHeight: "0.95",
            letterSpacing: "-3px",
          }} className="space-grotesk">
            TU ESTILO,<br/>
            <span className="gradient-text">
              TU IDENTIDAD
            </span>
          </h1>
          
          <p style={{ 
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", 
            marginBottom: "3rem", 
            opacity: 0.8,
            maxWidth: "700px",
            margin: "0 auto 3rem",
            fontWeight: "300",
            lineHeight: "1.7",
          }}>
            Descubrí las últimas tendencias en ropa para mujeres, niñas, hombres y niños. 
            Calidad y estilo en cada prenda.
          </p>
          
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a 
              href="https://www.instagram.com/las_fantasias_de_nazeli/"
              target="_blank"
              rel="noopener noreferrer"
              className="glow"
              style={{
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                color: "white",
                padding: "1.3rem 3rem",
                borderRadius: "16px",
                textDecoration: "none",
                fontSize: "1.15rem",
                fontWeight: "700",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.7rem",
                transition: "all 0.4s ease",
                border: "none",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px) scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>📸</span>
              Ver Colección
            </a>
            <a 
              href="#categorias"
              className="glass"
              style={{
                color: "white",
                padding: "1.3rem 3rem",
                borderRadius: "16px",
                textDecoration: "none",
                fontSize: "1.15rem",
                fontWeight: "600",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.7rem",
                transition: "all 0.4s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Explorar →
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "float 2s ease-in-out infinite",
        }}>
          <div style={{
            width: "2px",
            height: "40px",
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.5))",
            margin: "0 auto",
          }} />
        </div>
      </section>

      {/* Categories Section */}
      <section id="categorias" style={{
        padding: "8rem 2rem",
        background: "#0a0a0a",
        position: "relative",
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }} className="animate-in">
            <div className="glass" style={{
              display: "inline-block",
              padding: "0.5rem 1.2rem",
              borderRadius: "50px",
              fontSize: "0.85rem",
              fontWeight: "600",
              marginBottom: "1.5rem",
              letterSpacing: "1px",
            }}>
              NUESTRAS CATEGORÍAS
            </div>
            <h2 style={{ 
              fontSize: "clamp(2.5rem, 5vw, 4rem)", 
              marginBottom: "1.5rem", 
              color: "white",
              fontWeight: "900",
              letterSpacing: "-2px",
            }} className="space-grotesk">
              Moda Para Todos
            </h2>
            <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "600px", margin: "0 auto", fontWeight: "300" }}>
              Encuentra el estilo perfecto para cada miembro de tu familia
            </p>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}>
            {[
              { icon: "👗", title: "Mujeres", desc: "Vestidos, blusas y accesorios con estilo", gradient: "linear-gradient(135deg, #ec4899, #a855f7)" },
              { icon: "👧", title: "Niñas", desc: "Prendas coloridas llenas de alegría", gradient: "linear-gradient(135deg, #f472b6, #fb7185)" },
              { icon: "👔", title: "Hombres", desc: "Elegancia y comodidad en cada pieza", gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)" },
              { icon: "👦", title: "Niños", desc: "Diversión y confort para jugar", gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)" },
            ].map((category, idx) => (
              <div 
                key={idx} 
                className="glass card-3d scale-in" 
                style={{
                  borderRadius: "24px",
                  padding: "3rem 2rem",
                  textAlign: "center",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "5px",
                  background: category.gradient,
                }} />
                
                <div style={{ 
                  fontSize: "5rem", 
                  marginBottom: "1.5rem",
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
                }}>{category.icon}</div>
                
                <h3 style={{ 
                  fontSize: "1.8rem", 
                  marginBottom: "1rem", 
                  color: "white",
                  fontWeight: "700",
                }} className="space-grotesk">{category.title}</h3>
                
                <p style={{ 
                  color: "rgba(255,255,255,0.6)", 
                  fontSize: "1.05rem", 
                  lineHeight: "1.6",
                  fontWeight: "300",
                }}>{category.desc}</p>
                
                <div style={{
                  marginTop: "2rem",
                  padding: "0.7rem 1.5rem",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.05)",
                  color: "white",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  display: "inline-block",
                }}>
                  Explorar →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Bento Grid */}
      <section id="galeria" style={{
        padding: "8rem 2rem",
        background: "linear-gradient(to bottom, #0a0a0a 0%, #1a0a2e 100%)",
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div className="glass" style={{
              display: "inline-block",
              padding: "0.5rem 1.2rem",
              borderRadius: "50px",
              fontSize: "0.85rem",
              fontWeight: "600",
              marginBottom: "1.5rem",
              letterSpacing: "1px",
              color: "white",
            }}>
              GALERÍA
            </div>
            <h2 style={{ 
              fontSize: "clamp(2.5rem, 5vw, 4rem)", 
              marginBottom: "1.5rem", 
              color: "white",
              fontWeight: "900",
              letterSpacing: "-2px",
            }} className="space-grotesk">
              Nuestra Colección
            </h2>
            <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", fontWeight: "300" }}>
              Las últimas tendencias y estilos del momento
            </p>
          </div>
          
          {/* Bento Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}>
            {/* Real Instagram Images */}
            {[
              "497840269_1112796007323462_7849123473861560853_n.jpeg",
              "497917714_3931481487066270_8896604322577324013_n.jpeg",
              "497957861_1209637800691928_3682658421485192496_n.jpeg",
              "498019958_541419622184767_4455176261894333667_n.jpeg",
              "498025625_698004472978905_7138342360482526208_n.jpeg",
              "498164974_1860850671156212_7388989926182058502_n.jpeg",
              "498229194_1660214404856357_2857390474002305958_n.jpeg",
              "498325688_1477859783202835_7927868602139285260_n.jpeg",
              "498713146_2090840698095255_6781263186490954911_n.jpeg",
            ].map((imageName, idx) => (
              <div 
                key={idx}
                className="glass card-3d"
                style={{
                  borderRadius: "24px",
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={`/images/landings/las-fantasias/${imageName}`}
                  alt={`Las Fantasías de Nazeli - Producto ${idx + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(236,72,153,0.2) 100%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "0"}
                />
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <a 
              href="https://www.instagram.com/las_fantasias_de_nazeli/"
              target="_blank"
              rel="noopener noreferrer"
              className="glow"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "1rem",
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                color: "white",
                padding: "1.3rem 3rem",
                borderRadius: "16px",
                textDecoration: "none",
                fontSize: "1.15rem",
                fontWeight: "700",
                transition: "all 0.4s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px) scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>📸</span>
              Ver Todo en Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" style={{
        padding: "8rem 2rem",
        background: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(100px)",
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <h2 style={{ 
              fontSize: "clamp(2.5rem, 5vw, 4rem)", 
              marginBottom: "1.5rem",
              fontWeight: "900",
              letterSpacing: "-2px",
              color: "white",
            }} className="space-grotesk">
              ¿Listo para renovar<br/>
              <span className="gradient-text">tu guardarropa?</span>
            </h2>
            <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", fontWeight: "300" }}>
              Visitanos o seguinos en redes para ver todas las novedades
            </p>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}>
            {[
              { 
                icon: "📍", 
                title: "Ubicación", 
                content: "Av. Parque Chacabuco",
                subcontent: "Buenos Aires, Argentina",
                link: "https://maps.app.goo.gl/GdJAnPjkEa5ZLsP4A",
                linkText: "Cómo llegar"
              },
              { 
                icon: "📸", 
                title: "Instagram", 
                content: "@las_fantasias_de_nazeli",
                subcontent: "Seguinos para ver más",
                link: "https://www.instagram.com/las_fantasias_de_nazeli/",
                linkText: "Seguir"
              },
              { 
                icon: "💬", 
                title: "WhatsApp", 
                content: "Consultá disponibilidad",
                subcontent: "Respondemos rápido",
                link: "https://wa.me/5491155612345?text=Hola! Quiero consultar por ropa",
                linkText: "Escribir"
              },
            ].map((contact, idx) => (
              <div key={idx} className="glass card-3d" style={{
                padding: "3rem 2.5rem",
                borderRadius: "24px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>{contact.icon}</div>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "700", color: "white" }}>{contact.title}</h3>
                <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "white", fontWeight: "500" }}>{contact.content}</p>
                <p style={{ fontSize: "0.95rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.6)" }}>{contact.subcontent}</p>
                <a 
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    color: "#a855f7", 
                    textDecoration: "none", 
                    fontWeight: "600",
                    fontSize: "1rem",
                    transition: "all 0.3s",
                    display: "inline-block",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#ec4899";
                    e.currentTarget.style.transform = "translateX(5px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "#a855f7";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  {contact.linkText} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(20px)",
        color: "rgba(255,255,255,0.6)",
        padding: "3rem 2rem",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <p style={{ fontSize: "1rem", fontWeight: "300" }} className="space-grotesk">
          © 2026 <span className="gradient-text" style={{ fontWeight: "700" }}>Las Fantasías de Nazeli</span> — Moda para toda la familia
        </p>
      </footer>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
