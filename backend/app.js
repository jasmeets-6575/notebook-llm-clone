import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();
import cors from 'cors';
import uploadRoutes from './routes/upload.js';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/upload', uploadRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
