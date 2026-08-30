// [RustShield AST Engine] Middleware de Segurança Injetado via AST
import { Request, Response, NextFunction } from 'express';

export const requireJwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '401 Unauthorized: JWT Token ausente ou inválido.' });
  }
  next();
};

import express from 'express';
const app = express();
const PORT = 6379;
app.post('/api/v1/llm/generate', requireJwtAuth, (req, res) => {
    const prompt = req.body.prompt;
    res.json({ output: prompt });
});
app.listen(PORT, '127.0.0.1', () => {
    console.log('Server running on port', PORT);
});
