/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "typing-adventure.com"],
  },
  assetPrefix:
    process.env.NODE_ENV === "production" ? "https://typing-adventure.com" : "",
};

module.exports = nextConfig;
