import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/api/weatherRoutes.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// ✅ Allow API to be accessed from anywhere
app.use(cors());
app.use(express.json());

// ✅ Register API routes
app.use('/api/weather', weatherRoutes);

// ✅ Handle all other routes (Serve index.html if needed)
app.get('*', (req, res) => {
    res.status(404).json({ error: "Endpoint not found. Try /api/weather/history" });
});

// ✅ Fix: Bind to 0.0.0.0 instead of localhost
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
