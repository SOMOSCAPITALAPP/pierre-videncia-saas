import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "pierre-videncia-saas.vercel.app" }],
        destination: "https://clarezatarot.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.clarezatarot.com" }],
        destination: "https://clarezatarot.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
