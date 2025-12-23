import "./src/env"; // Validate env vars on build
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@k-health/ui"]
};

export default nextConfig;
