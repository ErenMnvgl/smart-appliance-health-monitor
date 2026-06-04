/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow Cloudflare Tunnel domain so JS loads over the proxy in dev mode
  allowedDevOrigins: [
    'deutsch-email-around-readers.trycloudflare.com'
  ]
};

export default nextConfig;
