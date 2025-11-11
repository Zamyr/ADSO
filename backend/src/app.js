import express from 'express';
import cors from 'cors';
import profileRoutes from './routes/profileRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', profileRoutes);

app.use(errorHandler);

export default app;
