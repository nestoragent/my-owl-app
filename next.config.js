/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['courses-top.ru']
  },
  webpack(config, options) {
    config.module.rules.push({
      loader: '@svgr/webpack',
      issuer: /\.[jt]sx?$/,
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [{
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              }
            }
          }],
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });

    return config;
  }
};

module.exports = nextConfig;
