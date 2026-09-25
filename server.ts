import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { generateArticleContent } from './src/server/generateArticleHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.resolve(distPath, 'index.html');

app.use(express.json());

// Health check endpoints for Cloud Run & load balancers
app.get(['/health', '/healthz', '/_health'], (_req, res) => {
  res.status(200).send('OK');
});

// AI Article Generation Endpoint (Server-Side Gemini SDK)
app.post('/api/generate-article', async (req, res) => {
  try {
    const result = await generateArticleContent(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.error('Error generating article via Gemini:', error);
    res.status(500).json({ error: error.message || 'Failed to generate article' });
  }
});

// Serve static assets from Vite production build if dist exists
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// SPA fallback for client-side routing
app.get('*', (_req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send(`<!doctype html><html><head><meta charset="utf-8"><title>The Founder Grid</title></head><body style="background:#0a0a0a;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;"><div>Loading The Founder Grid...</div></body></html>`);
  }
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0);
  });
});
