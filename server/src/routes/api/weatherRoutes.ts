import express from 'express';
import WeatherService from '../../service/weatherService.js'; // ✅ Ensure this is correct
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
      const weatherData = await WeatherService.getWeatherData(city);
      await saveSearch(city);
      return res.json(weatherData);
  } catch (error) {
      console.error("Weather API Error:", error);

      if (error instanceof Error) {
          return res.status(404).json({ error: error.message });
      } else {
          return res.status(500).json({ error: "Unexpected error occurred." });
      }
  }
});


export default router;
