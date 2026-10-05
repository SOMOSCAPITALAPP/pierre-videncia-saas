import { ImageResponse } from "next/og";

export const alt = "Clareza Tarô — tarô online com Pierre Videncia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 82px",
          color: "#fff7df",
          background: "linear-gradient(135deg, #090712 0%, #170a20 58%, #4b3128 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: "720px" }}>
          <div style={{ color: "#d9aa4f", fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>
            Tarô online no Brasil
          </div>
          <div style={{ marginTop: 34, fontSize: 86, fontWeight: 700, lineHeight: 1 }}>Clareza Tarô</div>
          <div style={{ marginTop: 28, color: "#e9c876", fontSize: 37, lineHeight: 1.25 }}>
            Amor, caminhos e decisões com Pierre Videncia
          </div>
          <div style={{ marginTop: 34, color: "#fff7df", fontSize: 25, opacity: 0.78 }}>
            Uma leitura simbólica, acolhedora e sem promessas absolutas.
          </div>
        </div>
        <div
          style={{
            width: 260,
            height: 390,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "5px solid #d9aa4f",
            borderRadius: 32,
            boxShadow: "0 0 0 20px rgba(217,170,79,.08)",
            fontSize: 74,
            color: "#f7d990",
          }}
        >
          CT
        </div>
      </div>
    ),
    size,
  );
}
