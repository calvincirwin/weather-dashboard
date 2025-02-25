import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

type GeocodeResponse = { lat: number; lon: number }[];

class WeatherService {
    private baseURL = 'https://api.openweathermap.org';
    private apiKey = process.env.OPENWEATHER_API_KEY || '';
    private cache = new Map<string, { data: any; timestamp: number }>(); // ✅ Added cache

    // ✅ Fetch location data (latitude & longitude)
    public async fetchLocationData(city: string) {
        try {
            const response = await fetch(`${this.baseURL}/geo/1.0/direct?q=${encodeURIComponent(city)},US&limit=1&appid=${this.apiKey}`);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch location data: ${response.statusText}`);
            }

            const data = (await response.json()) as GeocodeResponse;

            if (!data || data.length === 0) {
                throw new Error(`City "${city}" not found. Please try another city.`);
            }

            return {
                lat: data[0].lat,
                lon: data[0].lon,
            };
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error fetching location data:", error.message);
                throw new Error(error.message);
            } else {
                console.error("Unknown error:", error);
                throw new Error("An unknown error occurred while fetching location data.");
            }
        }
    }

    // ✅ Fetch weather data based on coordinates
    public async fetchWeatherData(lat: number, lon: number) {
        try {
            const response = await fetch(`${this.baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch weather data: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error fetching weather data:", error.message);
                throw new Error(error.message);
            } else {
                console.error("Unknown error:", error);
                throw new Error("An unknown error occurred while fetching weather data.");
            }
        }
    }

    // ✅ Get weather for a city (combines both functions + caching)
    public async getWeatherData(city: string) {
        const cacheKey = city.toLowerCase();
        const cacheEntry = this.cache.get(cacheKey);

        // If cache exists and is less than 1 hour old, return cached data
        if (cacheEntry && Date.now() - cacheEntry.timestamp < 3600000) {
            console.log(`Returning cached data for ${city}`);
            return cacheEntry.data;
        }

        try {
            const coordinates = await this.fetchLocationData(city);
            const weatherData = await this.fetchWeatherData(coordinates.lat, coordinates.lon);

            // ✅ Save to cache
            this.cache.set(cacheKey, { data: weatherData, timestamp: Date.now() });

            return weatherData;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error getting weather data:", error.message);
                throw new Error(error.message);
            } else {
                console.error("Unknown error:", error);
                throw new Error("An unknown error occurred while fetching weather data.");
            }
        }
    }
}

// ✅ Ensure this is at the **very end** of the file
export default new WeatherService();
