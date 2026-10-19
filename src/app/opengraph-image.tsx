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
          background: "radial-gradient(circle at 78% 22%, rgba(215,173,90,.22), transparent 250px), linear-gradient(135deg, #050307 0%, #150812 58%, #3a0f25 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: "720px" }}>
          <div style={{ color: "#d9aa4f", fontSize: 28, letterSpacing: 5, textTransform: "uppercase" }}>
            Tarô online brasileiro
          </div>
          <div style={{ marginTop: 34, fontSize: 86, fontWeight: 700, lineHeight: 1 }}>Clareza Tarô</div>
          <div style={{ marginTop: 28, color: "#f2d48a", fontSize: 37, lineHeight: 1.25 }}>
            Mistério, amor e decisões com Pierre Videncia
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
            borderRadius: 130,
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
