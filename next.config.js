/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    serverActions: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        child_process: false,
        net: false,
        'utf-8-validate': false,
        'bufferutil': false,
      };
    }
    
    // Prevent SSR for certain modules
    config.module.rules.push({
      test: /\.(node|terminal)$/,
      use: 'null-loader',
    });

    return config;
  },
};

module.exports = nextConfig;
