import { ReactNode } from "react";

export default function LandingsLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "white",
      overflow: "auto",
      zIndex: 9999,
    }}>
      {children}
    </div>
  );
}
