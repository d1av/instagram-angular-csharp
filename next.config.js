/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  source: "/((?!api$|api/).*)",
  headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
  api: {
        bodyParser: false
    },
};

module.exports = nextConfig;
