"use client";

import { useState } from "react";

export default function PintureriasMiglioreLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  const colors = [
    { name: "Blanco", hex: "#F8F9FA" },
    { name: "Gris", hex: "#6C757D" },
    { name: "Azul", hex: "#0D6EFD" },
    { name: "Verde", hex: "#198754" },
    { name: "Amarillo", hex: "#FFC107" },
    { name: "Naranja", hex: "#FD7E14" },
    { name: "Rojo", hex: "#DC3545" },
    { name: "Negro", hex: "#212529" },
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fraunces:wght@700;900&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'DM Sans', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          background: #f5f3ef;
          color: #2a2a2a;
          overflow-x: hidden;
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes colorPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .fraunces {
          font-family: 'Fraunces', serif;
        }
      `}</style>

      {/* Minimal Nav */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "rgba(245, 243, 239, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        padding: "1rem 2rem",
        zIndex: 1000,
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ 
            fontSize: "1.1rem", 
            fontWeight: "700",
            letterSpacing: "-0.02em",
            color: "#2a2a2a",
          }}>
            MIGLIORE
          </div>
          
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-menu">
            <a href="#inicio" style={{ color: "#666", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s" }}>Inicio</a>
            <a href="#colores" style={{ color: "#666", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s" }}>Productos</a>
            <a href="#contacto" style={{ color: "#666", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s" }}>Contacto</a>
            <a 
              href="https://wa.me/5491127851909?text=Hola! Necesito asesoramiento"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                color: "#ffffff", 
                background: "#2a2a2a",
                textDecoration: "none", 
                fontWeight: "600",
                padding: "0.6rem 1.4rem",
                borderRadius: "4px",
                fontSize: "0.9rem",
                transition: "all 0.3s",
              }}
            >
              Consultar
            </a>
          </div>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "none", color: "#2a2a2a", fontSize: "1.5rem", cursor: "pointer" }}
            className="mobile-menu-btn"
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "1rem", 
            marginTop: "1.5rem", 
            paddingTop: "1.5rem", 
            borderTop: "1px solid rgba(0,0,0,0.1)" 
          }}>
            <a href="#inicio" onClick={() => setMenuOpen(false)} style={{ color: "#2a2a2a", textDecoration: "none" }}>Inicio</a>
            <a href="#colores" onClick={() => setMenuOpen(false)} style={{ color: "#2a2a2a", textDecoration: "none" }}>Productos</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)} style={{ color: "#2a2a2a", textDecoration: "none" }}>Contacto</a>
          </div>
        )}
      </nav>

      {/* Split Hero */}
      <section id="inicio" style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        position: "relative",
        marginTop: "60px",
      }} className="hero-split">
        {/* Left Side - Text */}
        <div style={{
          background: "#1a3a52",
          padding: "4rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          animation: "slideInLeft 1s ease-out",
        }}>
          <div style={{ maxWidth: "500px" }}>
            <div style={{
              color: "#a0a0a0",
              fontSize: "0.85rem",
              fontWeight: "500",
              letterSpacing: "0.15em",
              marginBottom: "2rem",
              textTransform: "uppercase",
            }}>
              Desde 1985
            </div>

            <h1 style={{ 
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)", 
              marginBottom: "2rem", 
              fontWeight: "900",
              lineHeight: "1",
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }} className="fraunces">
              Dale vida<br/>
              a tus<br/>
              espacios
            </h1>
            
            <p style={{ 
              fontSize: "1.1rem", 
              marginBottom: "3rem", 
              color: "#d0d0d0",
              lineHeight: "1.6",
            }}>
              Especialistas en pinturas y acabados. Asesoramiento técnico personalizado para cada proyecto.
            </p>
            
            <div style={{ display: "flex", gap: "1rem", flexDirection: "column", maxWidth: "350px" }}>
              <a 
                href="https://wa.me/5491127851909?text=Hola! Necesito asesoramiento"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#ffffff",
                  color: "#2a2a2a",
                  padding: "1.1rem 2rem",
                  borderRadius: "4px",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  textAlign: "center",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                Consultar por WhatsApp →
              </a>
              <a 
                href="https://maps.app.goo.gl/ALZjBwuxcXST7g8WA"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  padding: "1.1rem 2rem",
                  borderRadius: "4px",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  textAlign: "center",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                }}
              >
                📍 Av. Riestra 5633, CABA
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Color Palette */}
        <div style={{
          background: "#ffffff",
          padding: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "slideInRight 1s ease-out",
        }}>
          <div style={{ width: "100%", maxWidth: "500px" }}>
            <div style={{
              marginBottom: "2rem",
            }}>
              <h3 style={{
                color: "#2a2a2a",
                fontSize: "1.8rem",
                fontWeight: "700",
                marginBottom: "0.5rem",
                letterSpacing: "-0.02em",
              }}>
                Paleta infinita
              </h3>
              <p style={{ color: "#606060", fontSize: "0.95rem" }}>
                Miles de colores y acabados disponibles
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
            }}>
              {colors.map((color, idx) => (
                <div 
                  key={idx}
                  style={{
                    animation: `colorPulse 3s ease-in-out infinite ${idx * 0.2}s`,
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    const circle = e.currentTarget.querySelector('.color-circle') as HTMLElement;
                    if (circle) circle.style.transform = "scale(1.1) rotate(5deg)";
                  }}
                  onMouseOut={(e) => {
                    const circle = e.currentTarget.querySelector('.color-circle') as HTMLElement;
                    if (circle) circle.style.transform = "scale(1) rotate(0deg)";
                  }}
                >
                  <div 
                    className="color-circle"
                    style={{
                      background: color.hex,
                      aspectRatio: "1",
                      borderRadius: "8px",
                      marginBottom: "0.5rem",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s",
                    }}
                  />
                  <div style={{
                    color: "#2a2a2a",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    textAlign: "center",
                  }}>
                    {color.name}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: "3rem",
              padding: "1.5rem",
              background: "#f5f5f5",
              borderRadius: "8px",
            }}>
              <div style={{ color: "#2a2a2a", fontSize: "0.85rem", lineHeight: "1.6" }}>
                <strong>💡 Consejo profesional:</strong> Traé una muestra o foto de tu espacio. Te ayudamos a elegir el color perfecto.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Banner */}
      <section id="colores" style={{
        padding: "6rem 2rem",
        background: "#ffffff",
        color: "#2a2a2a",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: "3rem",
            textAlign: "left",
          }}>
            {[
              { 
                title: "Pinturas Premium", 
                items: ["Látex interior", "Látex exterior", "Esmaltes", "Antióxidos"],
              },
              { 
                title: "Revestimientos", 
                items: ["Texturas", "Piedra París", "Veneciano", "Microcemento"],
              },
              { 
                title: "Herramientas", 
                items: ["Rodillos profesionales", "Pinceles", "Espátulas", "Cintas"],
              },
              { 
                title: "Servicios", 
                items: ["Igualaciónde colores", "Asesoramiento", "Envíos", "Presupuestos"],
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h3 style={{ 
                  fontSize: "1.3rem", 
                  fontWeight: "700", 
                  marginBottom: "1.5rem",
                  letterSpacing: "-0.01em",
                }}>
                  {section.title}
                </h3>
                <ul style={{ 
                  listStyle: "none", 
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                }}>
                  {section.items.map((item, i) => (
                    <li key={i} style={{ 
                      color: "#606060", 
                      fontSize: "0.95rem",
                      paddingLeft: "1.5rem",
                      position: "relative",
                    }}>
                      <span style={{
                        position: "absolute",
                        left: 0,
                        color: "#2a2a2a",
                      }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact - Minimal */}
      <section id="contacto" style={{
        padding: "6rem 2rem",
        background: "#1a3a52",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ 
            fontSize: "clamp(2rem, 4vw, 3rem)", 
            fontWeight: "900",
            marginBottom: "3rem",
            letterSpacing: "-0.02em",
          }} className="fraunces">
            Empezá tu proyecto hoy
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}>
            <div>
              <div style={{ color: "#808080", fontSize: "0.85rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Ubicación
              </div>
              <div style={{ fontSize: "1rem", fontWeight: "500" }}>Av. Riestra 5633</div>
              <div style={{ color: "#606060", fontSize: "0.9rem" }}>Nueva Pompeya</div>
            </div>

            <div>
              <div style={{ color: "#808080", fontSize: "0.85rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Teléfono
              </div>
              <div style={{ fontSize: "1rem", fontWeight: "500" }}>11 2785-1909</div>
              <div style={{ color: "#606060", fontSize: "0.9rem" }}>Lun-Vie 8-18h</div>
            </div>

            <div>
              <div style={{ color: "#808080", fontSize: "0.85rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Sábados
              </div>
              <div style={{ fontSize: "1rem", fontWeight: "500" }}>8:00 - 13:00 hs</div>
              <div style={{ color: "#606060", fontSize: "0.9rem" }}>Media jornada</div>
            </div>
          </div>

          <a 
            href="https://wa.me/5491127851909?text=Hola! Necesito asesoramiento"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "#ffffff",
              color: "#2a2a2a",
              padding: "1.2rem 3rem",
              borderRadius: "4px",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "700",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Contactar por WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "#1a3a52",
        color: "#808080",
        padding: "2rem",
        textAlign: "center",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}>
        <p style={{ fontSize: "0.85rem" }}>
          <span style={{ color: "#ffffff", fontWeight: "600" }}>PINTURERIAS MIGLIORE</span> · Más de 35 años de experiencia · 2026
        </p>
      </footer>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 968px) {
          .hero-split {
            grid-template-columns: 1fr !important;
          }
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
