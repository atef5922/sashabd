import { ImageResponse } from "next/og";
import { BRAND_NAME } from "@/lib/brand";

export const dynamic = "force-static";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "linear-gradient(135deg, #08111f 0%, #10243d 42%, #ff6a00 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.22)",
            }}
          >
            LED
          </div>
          <div>{BRAND_NAME}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 68, lineHeight: 1.04, fontWeight: 800, maxWidth: 860 }}>
            Indoor, Outdoor, Rental and LED Accessory Solutions
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.35, color: "rgba(255,255,255,0.86)", maxWidth: 920 }}>
            Project planning, installation, calibration, and after-sales support across Bangladesh.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 22, color: "rgba(255,255,255,0.92)" }}>
          <div>sashabd.com</div>
          <div>•</div>
          <div>Technical Consultation Available</div>
        </div>
      </div>
    ),
    size
  );
}
