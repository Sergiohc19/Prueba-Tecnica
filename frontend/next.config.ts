import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,//'TRUE' SOLO PARA TESTEO
  },
  typescript: {
    ignoreBuildErrors: false,//'TRUE' SOLO PARA TESTEO
  },
  images: {
    unoptimized: true,//Siempre TRUE
  }
};

export default nextConfig;