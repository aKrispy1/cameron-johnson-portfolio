import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Local Content Management System Plugin
const localCMSPlugin = () => ({
  name: 'local-cms-api',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.method === 'POST' && req.url === '/api/saveLegends') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString() });
        req.on('end', () => {
          try {
            const parsedData = JSON.parse(body);
            // Physically stringify the exact react structure back to the source codebase
            const fileContent = `export const legends = ${JSON.stringify(parsedData, null, 2)};\n\nexport const siteConfig = {\n  primaryBrand: legends[0],\n};\n\nexport const portfolioLegends = [\n  legends[2],\n  legends[3],\n  legends[4],\n  legends[5],\n  legends[6],\n  legends[7],\n  legends[0]\n];\n`;
            
            // We write straight to src/data/legends.js
            fs.writeFileSync(path.resolve(process.cwd(), 'src/data/legends.js'), fileContent);
            
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'Database Rewritten Successfully' }));
          } catch (err) {
            console.error(err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }
      next();
    });
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), localCMSPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
})

