import express from 'express';
import { getHistory, saveSearch } from '../../service/historyService.js';

const router = express.Router();

// ✅ Get search history
router.get('/history', async (req, res) => {
    try {
        const history = await getHistory();
        res.json(history);
    } catch (error) {
        console.error("Error fetching history:", error);
        res.status(500).json({ error: "Could not retrieve history" });
    }
});

// ✅ Save a city and fetch weather data
router.post('/', async (req, res) => {
    const { city } = req.body;
    if (!city) {
        return res.status(400).json({ error: "City name is required." });
    }

    try {
        await saveSearch(city);
        res.json({ message: "City saved successfully" });
    } catch (error) {
        console.error("Error saving city:", error);
        res.status(500).json({ error: "Could not save city" });
    }
});

export default router;
