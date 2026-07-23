import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permite servir logos SVG (FedEx, Google, etc.) por next/image.
    // Son assets propios y de confianza; el sandbox + CSP evita ejecución de scripts.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
