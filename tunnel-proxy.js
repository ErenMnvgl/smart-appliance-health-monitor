const http = require('http');
const httpProxy = require('http-proxy');

// Next.js dev server port
const NEXT_PORT = 3000;
// Proxy port
const PROXY_PORT = 3005;

const proxy = httpProxy.createProxyServer({
  target: `http://127.0.0.1:${NEXT_PORT}`,
  ws: true,
  changeOrigin: true,
});

// Rewrite headers for standard HTTP requests
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('Host', `localhost:${NEXT_PORT}`);
  proxyReq.setHeader('Origin', `http://localhost:${NEXT_PORT}`);
});

// Rewrite headers for WebSocket upgrade requests (fixes HMR)
proxy.on('proxyReqWs', function(proxyReq, req, socket, options, head) {
  proxyReq.setHeader('Host', `localhost:${NEXT_PORT}`);
  proxyReq.setHeader('Origin', `http://localhost:${NEXT_PORT}`);
});

proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  if (res.writeHead) {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Bad Gateway');
  }
});

const server = http.createServer((req, res) => {
  proxy.web(req, res);
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

server.listen(PROXY_PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Next.js HMR Cloudflare Proxy is running on port ${PROXY_PORT}`);
  console.log(`\nTo expose your app, run:`);
  console.log(`cloudflared tunnel --url http://localhost:${PROXY_PORT}`);
  console.log(`======================================================\n`);
});
