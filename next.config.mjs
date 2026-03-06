import { defineConfig } from 'next';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  cssModules: true,
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  postcss: {
    plugins: [tailwindcss, autoprefixer],
  },
});