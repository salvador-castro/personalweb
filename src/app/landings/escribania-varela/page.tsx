"use client";

import { useState } from "react";

export default function EscribaniaVarelaLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        
        .animate-fade-in {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
        }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(30, 58, 138, 0.95)",
        backdropFilter: "blur(10px)",
        color: "white",
        padding: "1.2rem 2rem",
        zIndex: 1000,
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "1.6rem", fontWeight: "800", letterSpacing: "-0.5px" }}>
            ⚖️ Escribanía Varela
          </div>
          
          {/* Desktop Menu */}
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }} className="desktop-menu">
            <a href="#inicio" style={{ color: "white", textDecoration: "none", fontWeight: "500", transition: "color 0.2s" }}>Inicio</a>
            <a href="#servicios" style={{ color: "white", textDecoration: "none", fontWeight: "500", transition: "color 0.2s" }}>Servicios</a>
            <a href="#resenas" style={{ color: "white", textDecoration: "none", fontWeight: "500", transition: "color 0.2s" }}>Reseñas</a>
            <a 
              href="#contacto" 
              style={{ 
                color: "white", 
                textDecoration: "none", 
                fontWeight: "600",
                backgroundColor: "#10b981",
                padding: "0.6rem 1.5rem",
                borderRadius: "8px",
                transition: "all 0.2s"
              }}
            >
              Contacto
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
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "1rem", 
            marginTop: "1.5rem", 
            paddingTop: "1.5rem", 
            borderTop: "1px solid rgba(255,255,255,0.2)" 
          }} className="mobile-menu">
            <a href="#inicio" onClick={() => setMenuOpen(false)} style={{ color: "white", textDecoration: "none", fontWeight: "500" }}>Inicio</a>
            <a href="#servicios" onClick={() => setMenuOpen(false)} style={{ color: "white", textDecoration: "none", fontWeight: "500" }}>Servicios</a>
            <a href="#resenas" onClick={() => setMenuOpen(false)} style={{ color: "white", textDecoration: "none", fontWeight: "500" }}>Reseñas</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)} style={{ color: "white", textDecoration: "none", fontWeight: "500" }}>Contacto</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, rgba(30, 64, 175, 0.9) 0%, rgba(55, 48, 163, 0.85) 50%, rgba(30, 58, 138, 0.9) 100%), url('/images/landings/escribania-hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "7rem 2rem 3rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "300px",
          height: "300px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute",
          bottom: "20%",
          left: "10%",
          width: "250px",
          height: "250px",
          background: "rgba(16,185,129,0.1)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }} />

        <div style={{ maxWidth: "900px", position: "relative", zIndex: 1 }} className="animate-fade-in">
          <div style={{
            display: "inline-block",
            backgroundColor: "rgba(16,185,129,0.2)",
            color: "#10b981",
            padding: "0.5rem 1.5rem",
            borderRadius: "50px",
            fontSize: "0.9rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            border: "1px solid rgba(16,185,129,0.3)",
          }}>
            ✨ Más de 20 años de experiencia
          </div>

          <h1 style={{ 
            fontSize: "clamp(2.5rem, 6vw, 4rem)", 
            marginBottom: "1.5rem", 
            fontWeight: "800",
            lineHeight: "1.1",
            letterSpacing: "-1px",
          }}>
            Servicios Notariales<br/>
            <span style={{ 
              background: "linear-gradient(to right, #10b981, #34d399)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              de Confianza
            </span>
          </h1>
          
          <p style={{ 
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", 
            marginBottom: "3rem", 
            opacity: 0.9,
            maxWidth: "700px",
            margin: "0 auto 3rem",
            fontWeight: "400",
          }}>
            Asesoramiento profesional en todos tus trámites notariales. Tu tranquilidad es nuestro compromiso.
          </p>
          
          <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a 
              href="https://wa.me/5491155459421?text=Hola! Necesito asesoramiento notarial"
              style={{
                backgroundColor: "#10b981",
                color: "white",
                padding: "1.2rem 2.5rem",
                borderRadius: "12px",
                textDecoration: "none",
                fontSize: "1.1rem",
                fontWeight: "700",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 10px 30px rgba(16,185,129,0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(16,185,129,0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(16,185,129,0.3)";
              }}
            >
              💬 Solicitar Turno
            </a>
            <a 
              href="#servicios"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                color: "white",
                padding: "1.2rem 2.5rem",
                borderRadius: "12px",
                textDecoration: "none",
                fontSize: "1.1rem",
                fontWeight: "600",
                border: "2px solid rgba(255,255,255,0.3)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
            >
              Ver Servicios →
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" style={{
        padding: "6rem 2rem",
        backgroundColor: "#f8fafc",
        position: "relative",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ 
              fontSize: "clamp(2rem, 4vw, 3rem)", 
              marginBottom: "1rem", 
              color: "#1e3a8a",
              fontWeight: "800",
              letterSpacing: "-0.5px",
            }}>
              Nuestros Servicios
            </h2>
            <p style={{ fontSize: "1.2rem", color: "#64748b", maxWidth: "600px", margin: "0 auto" }}>
              Soluciones profesionales para todos tus trámites notariales
            </p>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}>
            {[
              { icon: "🏠", title: "Compraventa de Inmuebles", desc: "Escrituración de propiedades con total garantía legal", color: "#3b82f6", image: "/images/landings/compraventa.png" },
              { icon: "🏢", title: "Constitución de Sociedades", desc: "Armá tu empresa con respaldo profesional", color: "#8b5cf6", image: "/images/landings/sociedades.png" },
              { icon: "📜", title: "Testamentos y Sucesiones", desc: "Planificá el futuro de tu patrimonio", color: "#ec4899", image: "/images/landings/testamentos.png" },
              { icon: "✍️", title: "Certificación de Firmas", desc: "Validación legal de documentos", color: "#10b981", image: "/images/landings/certificacion.png" },
              { icon: "📋", title: "Poderes", desc: "Generales y especiales según tus necesidades", color: "#f59e0b", image: "/images/landings/poderes.png" },
              { icon: "💼", title: "Asesoramiento Legal", desc: "Consultas sobre trámites notariales", color: "#06b6d4", image: "/images/landings/asesoramiento.png" },
            ].map((service, idx) => (
              <div key={idx} className="hover-lift" style={{
                backgroundColor: "white",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.05)",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
              }}>
                <div style={{
                  height: "200px",
                  backgroundImage: `linear-gradient(to bottom, rgba(30, 58, 138, 0.7), rgba(30, 58, 138, 0.85)), url('${service.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}>
                  <div style={{ 
                    fontSize: "4rem",
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                  }}>{service.icon}</div>
                </div>
                <div style={{ padding: "0 2rem 2.5rem" }}>
                  <h3 style={{ 
                    fontSize: "1.4rem", 
                    marginBottom: "0.8rem", 
                    color: "#1e3a8a",
                    fontWeight: "700",
                  }}>{service.title}</h3>
                  <p style={{ color: "#64748b", fontSize: "1rem", lineHeight: "1.6" }}>{service.desc}</p>
                  <div style={{
                    marginTop: "1.5rem",
                    height: "4px",
                    background: `linear-gradient(to right, ${service.color}, transparent)`,
                    borderRadius: "10px",
                    width: "60px",
                    margin: "1.5rem auto 0",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="resenas" style={{
        padding: "6rem 2rem",
        backgroundColor: "white",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ 
              fontSize: "clamp(2rem, 4vw, 3rem)", 
              marginBottom: "1rem", 
              color: "#1e3a8a",
              fontWeight: "800",
              letterSpacing: "-0.5px",
            }}>
              ⭐ Lo que dicen nuestros clientes
            </h2>
            <p style={{ fontSize: "1.2rem", color: "#64748b" }}>
              La confianza de nuestros clientes nos respalda
            </p>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}>
            {[
              { author: "Cliente Satisfecho", rating: 5, text: "Excelente atención y profesionalismo. Muy recomendable para cualquier trámite notarial." },
              { author: "María González", rating: 5, text: "Muy buena atención, te explican todo con claridad. Recomendable 100%." },
              { author: "Juan Pérez", rating: 5, text: "Servicio rápido y eficiente. Los mejores profesionales de la zona." },
            ].map((review, idx) => (
              <div key={idx} className="hover-lift" style={{
                backgroundColor: "#f8fafc",
                padding: "2.5rem",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.05)",
                position: "relative",
              }}>
                <div style={{
                  position: "absolute",
                  top: "-15px",
                  left: "30px",
                  fontSize: "3rem",
                  opacity: "0.1",
                }}>❝</div>
                <div style={{ fontSize: "1.8rem", marginBottom: "1.5rem", color: "#fbbf24" }}>
                  {"⭐".repeat(review.rating)}
                </div>
                <p style={{ 
                  fontStyle: "italic", 
                  marginBottom: "1.5rem", 
                  color: "#1e293b",
                  fontSize: "1.05rem",
                  lineHeight: "1.7",
                }}>
                  "{review.text}"
                </p>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}>
                  <div style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "700",
                    fontSize: "1.2rem",
                  }}>
                    {review.author[0]}
                  </div>
                  <p style={{ fontWeight: "600", color: "#475569", fontSize: "1.05rem" }}>
                    {review.author}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a 
              href="https://maps.app.goo.gl/QXfv5X6pSzFgNhWQ6"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "1rem 2rem",
                backgroundColor: "#1e3a8a",
                color: "white",
                textDecoration: "none",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "1.05rem",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(30,58,138,0.3)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(30,58,138,0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(30,58,138,0.3)";
              }}
            >
              Ver más reseñas en Google Maps →
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" style={{
        padding: "6rem 2rem",
        background: "linear-gradient(135deg, #1e40af 0%, #3730a3 50%, #1e3a8a 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative Background */}
        <div style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          opacity: "0.05",
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ 
              fontSize: "clamp(2rem, 4vw, 3rem)", 
              marginBottom: "1rem",
              fontWeight: "800",
              letterSpacing: "-0.5px",
            }}>
              ¿Necesitás asesoramiento?
            </h2>
            <p style={{ fontSize: "1.2rem", opacity: "0.9" }}>
              Estamos para ayudarte en todo lo que necesites
            </p>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2.5rem",
            marginBottom: "4rem",
          }}>
            <div style={{ 
              textAlign: "center",
              padding: "2rem",
              backgroundColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📍</div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.8rem", fontWeight: "700" }}>Ubicación</h3>
              <p style={{ marginBottom: "0.5rem" }}>Lavardén 71</p>
              <p style={{ marginBottom: "1rem" }}>C1437FBA, CABA</p>
              <a 
                href="https://maps.app.goo.gl/QXfv5X6pSzFgNhWQ6"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: "#10b981", 
                  textDecoration: "none", 
                  fontWeight: "600",
                  transition: "color 0.2s",
                }}
              >
                Ver en Google Maps →
              </a>
            </div>

            <div style={{ 
              textAlign: "center",
              padding: "2rem",
              backgroundColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📞</div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.8rem", fontWeight: "700" }}>Teléfono</h3>
              <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>+54 9 11 5545-9421</p>
              <a 
                href="tel:+5491155459421" 
                style={{ 
                  color: "#10b981", 
                  textDecoration: "none", 
                  fontWeight: "600",
                  transition: "color 0.2s",
                }}
              >
                Llamar ahora →
              </a>
            </div>

            <div style={{ 
              textAlign: "center",
              padding: "2rem",
              backgroundColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🕐</div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.8rem", fontWeight: "700" }}>Horarios</h3>
              <p style={{ marginBottom: "0.3rem" }}>Lunes a Viernes</p>
              <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>9:00 - 18:00</p>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <a 
              href="https://wa.me/5491155459421?text=Hola! Necesito asesoramiento notarial"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.8rem",
                backgroundColor: "#10b981",
                color: "white",
                padding: "1.5rem 3rem",
                borderRadius: "16px",
                textDecoration: "none",
                fontSize: "1.3rem",
                fontWeight: "700",
                boxShadow: "0 10px 40px rgba(16,185,129,0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 15px 50px rgba(16,185,129,0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 40px rgba(16,185,129,0.3)";
              }}
            >
              💬 Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#0f172a",
        color: "white",
        padding: "2.5rem 2rem",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "1rem", opacity: "0.8" }}>
          © 2026 Escribanía Varela - Tu tranquilidad es nuestro compromiso
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
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
        a:hover {
          opacity: 0.9;
        }
      `}</style>
    </>
  );
}
