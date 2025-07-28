import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import uploadRoutes from './routes/upload.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

// Routes
app.use('/upload', uploadRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
