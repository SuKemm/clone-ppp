/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 1,
    staticGenerationMaxConcurrency: 1,
    staticGenerationMinPagesPerWorker: 50,
  },
};

export default nextConfig;