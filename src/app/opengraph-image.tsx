import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "radial-gradient(circle at 74% 26%, #59401a 0, #21132f 32%, #090712 78%), linear-gradient(135deg, #090712, #1d1028)",
          color: "#fff7df",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", width: "690px" }}>
          <div
            style={{
              border: "1px solid rgba(217,170,79,.55)",
              borderRadius: "999px",
              color: "#f7d990",
              display: "flex",
              fontSize: "28px",
              letterSpacing: "2px",
              padding: "14px 24px",
              textTransform: "uppercase",
              width: "310px",
            }}
          >
            Tarô de Marselha
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <h1 style={{ fontFamily: "Georgia", fontSize: "78px", lineHeight: 1.02, margin: 0 }}>
              Pierre Videncia
            </h1>
            <p style={{ color: "#f7d990", fontSize: "38px", lineHeight: 1.18, margin: 0 }}>
              Amor, clareza espiritual e orientação acolhedora
            </p>
          </div>
          <p style={{ color: "rgba(255,247,223,.74)", fontSize: "28px", lineHeight: 1.35, margin: 0 }}>
            Receba uma leitura simbólica com cartas, numerologia e astrologia. Sem promessas absolutas, com mais consciência para o seu momento.
          </p>
        </div>
        <div
          style={{
            alignItems: "center",
            border: "2px solid rgba(217,170,79,.8)",
            borderRadius: "36px",
            boxShadow: "0 0 70px rgba(217,170,79,.22)",
            display: "flex",
            height: "370px",
            justifyContent: "center",
            position: "relative",
            width: "320px",
          }}
        >
          <div
            style={{
              border: "2px solid rgba(217,170,79,.26)",
              height: "250px",
              position: "absolute",
              transform: "rotate(45deg)",
              width: "250px",
            }}
          />
          <div
            style={{
              alignItems: "center",
              background: "#120b1d",
              border: "2px solid #d9aa4f",
              borderRadius: "999px",
              color: "#fff2bf",
              display: "flex",
              fontFamily: "Georgia",
              fontSize: "92px",
              fontWeight: 700,
              height: "210px",
              justifyContent: "center",
              letterSpacing: "6px",
              width: "210px",
            }}
          >
            PV
          </div>
        </div>
      </div>
    ),
    size,
  );
}
