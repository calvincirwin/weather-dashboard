import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve index.html
router.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

export default router;
