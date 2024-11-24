/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Disable `fs` on the client-side
      config.resolve.fallback = {
        fs: false, // Prevent fs module from being bundled for the client-side
      };
    }

    return config;
  },
};

export default nextConfig;
