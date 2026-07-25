import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { URL } from 'url'

// Custom plugin to run Vercel serverless functions in Vite dev server
const vercelApiPlugin = () => ({
  name: 'vercel-api',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url.startsWith('/api')) {
        return next();
      }
      
      try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        let filePath = path.join(process.cwd(), url.pathname);
        
        if (fs.existsSync(filePath + '/index.js')) {
          filePath += '/index.js';
        } else if (fs.existsSync(filePath + '.js')) {
          filePath += '.js';
        } else {
          return next();
        }

        const module = await server.ssrLoadModule(filePath);
        const handler = module.default;

        if (handler) {
          req.query = Object.fromEntries(url.searchParams.entries());
          
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          };

          if (req.method === 'POST' || req.method === 'PUT') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            await new Promise(resolve => req.on('end', resolve));
            if (body) {
              try { req.body = JSON.parse(body); } catch(e) {}
            }
          }
          
          await handler(req, res);
        } else {
          next();
        }
      } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.end(err.toString());
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables (like BLOB_READ_WRITE_TOKEN) so serverless functions can use them
  process.env = {...process.env, ...loadEnv(mode, process.cwd(), '')};
  return {
    plugins: [react(), tailwindcss(), vercelApiPlugin()],
  };
});
