/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "typing-adventure.com"],
  },
  assetPrefix: "https://typing-adventure.com",
  env: {
    NEXT_PUBLIC_BASE_URL: "https://typing-adventure.com",
  },
};

module.exports = nextConfig;
