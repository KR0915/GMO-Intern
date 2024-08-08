/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
          config.externals.push({
            ssh2: 'commonjs ssh2'
          });
        }
        return config;
      }
};

export default nextConfig;
