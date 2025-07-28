// connectDB/firebase.js
import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { createRequire } from 'module';
import dotenv from 'dotenv';

dotenv.config();
const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccountKey.json');

const firebaseApp = initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const storage = getStorage(firebaseApp);

export { storage };
