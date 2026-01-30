"use client";

import { useState } from "react";
import Image from "next/image";

export default function CharlyVLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700;800;900&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'Poppins', system-ui, -apple-system, sans-serif;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          background: #fafafa;
          overflow-x: hidden;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .playfair {
          font-family: 'Playfair Display', serif;
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "rgba(255, 255, 255, 0.98)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
        color: "#2d2d2d",
        padding: "1.2rem 2rem",
        zIndex: 1000,
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ 
            fontSize: "1.6rem", 
            fontWeight: "800",
            color: "#d97706",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }} className="playfair">
            <span style={{ fontSize: "2rem" }}>🍽️</span>
            Charly V
          </div>
          
          {/* Desktop Menu */}
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }} className="desktop-menu">
            <a href="#inicio" style={{ color: "#4b4b4b", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }}>Inicio</a>
            <a href="#menu" style={{ color: "#4b4b4b", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }}>Menú</a>
            <a href="#ubicacion" style={{ color: "#4b4b4b", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }}>Ubicación</a>
            <a 
              href="https://www.instagram.com/charlyv_2020/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                color: "white", 
                textDecoration: "none", 
                fontWeight: "600",
                background: "#d97706",
                padding: "0.7rem 1.8rem",
                borderRadius: "8px",
                transition: "all 0.3s",
              }}
            >
              Instagram
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "none", color: "#2d2d2d", fontSize: "1.8rem", cursor: "pointer" }}
            className="mobile-menu-btn"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "1rem", 
            marginTop: "1.5rem", 
            paddingTop: "1.5rem", 
            borderTop: "1px solid rgba(0,0,0,0.1)" 
          }}>
            <a href="#inicio" onClick={() => setMenuOpen(false)} style={{ color: "#2d2d2d", textDecoration: "none", fontWeight: "500" }}>Inicio</a>
            <a href="#menu" onClick={() => setMenuOpen(false)} style={{ color: "#2d2d2d", textDecoration: "none", fontWeight: "500" }}>Menú</a>
            <a href="#ubicacion" onClick={() => setMenuOpen(false)} style={{ color: "#2d2d2d", textDecoration: "none", fontWeight: "500" }}>Ubicación</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8rem 2rem 4rem",
        background: "#fafafa",
        position: "relative",
      }}>
        <div style={{ 
          maxWidth: "1300px", 
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "4rem",
          alignItems: "center",
        }}>
          {/* Text Content */}
          <div className="fade-in-up">
            <div style={{
              display: "inline-block",
              background: "#fef3c7",
              color: "#d97706",
              padding: "0.5rem 1.2rem",
              borderRadius: "25px",
              fontSize: "0.85rem",
              fontWeight: "600",
              marginBottom: "1.5rem",
              letterSpacing: "0.5px",
            }}>
              🏆 ESPECIALIDAD EN PICADAS Y MILANESAS
            </div>

            <h1 style={{ 
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)", 
              marginBottom: "1.5rem", 
              fontWeight: "900",
              lineHeight: "1.1",
              color: "#1a1a1a",
            }} className="playfair">
              Sabor Auténtico,<br/>
              <span style={{ color: "#d97706" }}>
                Momentos Únicos
              </span>
            </h1>
            
            <p style={{ 
              fontSize: "1.15rem", 
              marginBottom: "2.5rem", 
              color: "#6b6b6b",
              maxWidth: "500px",
              lineHeight: "1.7",
            }}>
              Disfrutá de nuestras picadas artesanales y milanesas XXL. 
              Calidad premium, sabor casero y precios accesibles.
            </p>
            
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a 
                href="https://wa.me/5491155612345?text=Hola! Quiero hacer un pedido"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#d97706",
                  color: "white",
                  padding: "1.1rem 2.5rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "600",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  transition: "all 0.3s",
                  boxShadow: "0 4px 15px rgba(217, 119, 6, 0.3)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(217, 119, 6, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(217, 119, 6, 0.3)";
                }}
              >
                <span style={{ fontSize: "1.3rem" }}>💬</span>
                Hacer Pedido
              </a>
              <a 
                href="#menu"
                style={{
                  border: "2px solid #d97706",
                  color: "#d97706",
                  background: "transparent",
                  padding: "1.1rem 2.5rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "600",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#d97706";
                  e.currentTarget.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#d97706";
                }}
              >
                Ver Menú
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="scale-in" style={{
            position: "relative",
            height: "500px",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}>
            <Image
              src="/images/landings/charly-v/image.jpg"
              alt="Charly V - Comida Deliciosa"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" style={{
        padding: "6rem 2rem",
        background: "white",
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{
              display: "inline-block",
              background: "#fef3c7",
              color: "#d97706",
              padding: "0.5rem 1.2rem",
              borderRadius: "25px",
              fontSize: "0.8rem",
              fontWeight: "600",
              marginBottom: "1rem",
              letterSpacing: "0.5px",
            }}>
              NUESTRAS ESPECIALIDADES
            </div>
            <h2 style={{ 
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)", 
              marginBottom: "1rem", 
              color: "#1a1a1a",
              fontWeight: "800",
            }} className="playfair">
              Lo Que Nos Hace Únicos
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#6b6b6b", maxWidth: "600px", margin: "0 auto" }}>
              Ingredientes frescos, recetas tradicionales y mucho amor en cada plato
            </p>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}>
            {[
              { 
                icon: "🧀", 
                title: "Picadas Artesanales", 
                desc: "Selección premium de fiambres, quesos y más. Perfectas para compartir.",
                features: ["Tabla Clásica", "Tabla Premium", "Tabla XXL"]
              },
              { 
                icon: "🍖", 
                title: "Milanesas XXL", 
                desc: "Crujientes por fuera, jugosas por dentro. El tamaño importa.",
                features: ["Napolitana", "A Caballo", "Completa"]
              },
              { 
                icon: "🥘", 
                title: "Tortillas Caseras", 
                desc: "Recetas de la abuela con ingredientes frescos del día.",
                features: ["De Papa", "Española", "Mixta"]
              },
            ].map((item, idx) => (
              <div 
                key={idx}
                style={{
                  background: "#fafafa",
                  borderRadius: "16px",
                  padding: "2.5rem 2rem",
                  textAlign: "center",
                  border: "2px solid #f0f0f0",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = "#d97706";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#f0f0f0";
                }}
              >
                <div style={{ 
                  fontSize: "4rem", 
                  marginBottom: "1rem",
                }}>{item.icon}</div>
                
                <h3 style={{ 
                  fontSize: "1.5rem", 
                  marginBottom: "1rem", 
                  color: "#1a1a1a",
                  fontWeight: "700",
                }}>{item.title}</h3>
                
                <p style={{ 
                  color: "#6b6b6b", 
                  fontSize: "0.95rem", 
                  lineHeight: "1.6",
                  marginBottom: "1.5rem",
                }}>{item.desc}</p>
                
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}>
                  {item.features.map((feature, i) => (
                    <div key={i} style={{
                      background: "white",
                      padding: "0.5rem 1rem",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      color: "#d97706",
                      fontWeight: "500",
                    }}>
                      ✓ {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="ubicacion" style={{
        padding: "6rem 2rem",
        background: "#fafafa",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ 
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)", 
              marginBottom: "1rem", 
              color: "#1a1a1a",
              fontWeight: "800",
            }} className="playfair">
              ¿Dónde Encontrarnos?
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#6b6b6b" }}>
              Visitanos o pedí delivery en el barrio
            </p>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}>
            <div style={{
              background: "white",
              padding: "2.5rem 2rem",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📍</div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.8rem", fontWeight: "700", color: "#1a1a1a" }}>Dirección</h3>
              <p style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "#4b4b4b", fontWeight: "500" }}>Parque Patricios</p>
              <p style={{ fontSize: "0.9rem", marginBottom: "1.2rem", color: "#6b6b6b" }}>Buenos Aires, Argentina</p>
              <a 
                href="https://maps.app.goo.gl/NB8WcHdJ6rrGVpKo9"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: "#d97706", 
                  textDecoration: "none", 
                  fontWeight: "600",
                  fontSize: "0.95rem",
                }}
              >
                Ver en Google Maps →
              </a>
            </div>

            <div style={{
              background: "white",
              padding: "2.5rem 2rem",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📸</div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.8rem", fontWeight: "700", color: "#1a1a1a" }}>Instagram</h3>
              <p style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "#4b4b4b", fontWeight: "500" }}>@charlyv_2020</p>
              <p style={{ fontSize: "0.9rem", marginBottom: "1.2rem", color: "#6b6b6b" }}>Seguinos para novedades</p>
              <a 
                href="https://www.instagram.com/charlyv_2020/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: "#d97706", 
                  textDecoration: "none", 
                  fontWeight: "600",
                  fontSize: "0.95rem",
                }}
              >
                Seguir →
              </a>
            </div>

            <div style={{
              background: "white",
              padding: "2.5rem 2rem",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💬</div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.8rem", fontWeight: "700", color: "#1a1a1a" }}>WhatsApp</h3>
              <p style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "#4b4b4b", fontWeight: "500" }}>Hacé tu pedido</p>
              <p style={{ fontSize: "0.9rem", marginBottom: "1.2rem", color: "#6b6b6b" }}>Te respondemos al instante</p>
              <a 
                href="https://wa.me/5491155612345?text=Hola! Quiero hacer un pedido"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: "#d97706", 
                  textDecoration: "none", 
                  fontWeight: "600",
                  fontSize: "0.95rem",
                }}
              >
                Escribir →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "#1a1a1a",
        color: "#9b9b9b",
        padding: "2.5rem 2rem",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "0.95rem" }}>
          © 2026 <span style={{ color: "#d97706", fontWeight: "600" }}>Charly V</span> — Picadas y Milanesas con Amor
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
