import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ["@k-health/ui"],
  images: {
    remotePatterns: [
      {
        // https://cdn.minutrimind.net/epco/user_r_img/thumb/833098_309.jpg
        protocol: 'https',
        hostname: 'cdn.minutrimind.net',
        port: '',
        pathname: '/epco/user_r_img/thumb/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
