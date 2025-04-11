import type { NextConfig } from "next";

// Define the environment variables
const envVars = {
  AZURE_OPENAI_API_KEY: process.env.AZURE_OPENAI_API_KEY,
  AZURE_OPENAI_ENDPOINT: "https://mango-bush-0a9e12903.5.azurestaticapps.net/api/v1",
  AZURE_OPENAI_API_VERSION: "2024-02-01",
  AZURE_OPENAI_MODEL: "gpt-4o"
};

// Log environment variables for debugging
console.log('Next.js Config Environment Variables:');
console.log('AZURE_OPENAI_ENDPOINT:', envVars.AZURE_OPENAI_ENDPOINT);
console.log('AZURE_OPENAI_API_KEY:', envVars.AZURE_OPENAI_API_KEY ? 'Set (hidden)' : 'Not set');
console.log('AZURE_OPENAI_MODEL:', envVars.AZURE_OPENAI_MODEL);

const nextConfig: NextConfig = {
  /* config options here */
  env: envVars,
  // Make sure API-related requests don't timeout too quickly
  experimental: {
    serverComponentsExternalPackages: [],
  },
  webpack: (config) => {
    config.externals = [...config.externals, 'canvas', 'jsdom'];
    return config;
  }
};

export default nextConfig;
