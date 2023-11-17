/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "imageupload.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "eksiup.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
