document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form") as HTMLFormElement;
  const searchInput = document.getElementById("search-input") as HTMLInputElement;
  const historyContainer = document.getElementById("history") as HTMLDivElement;
  const weatherDisplay = document.getElementById("today") as HTMLDivElement;
  const forecastDisplay = document.getElementById("forecast") as HTMLDivElement;

const API_BASE_URL = "https://weather-dashboard-s5v7.onrender.com/api/weather";
";

  // ✅ Function to fetch weather data
  const fetchWeather = async (city: string) => {
    try {
        weatherDisplay.innerHTML = "<p>Loading weather data...</p>";

        const response = await fetch(`${API_BASE_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city }),
        });

        if (!response.ok) {
            throw new Error("City not found or API error");
        }

        const data = await response.json();
        displayWeather(data);

        await updateHistory(); // ✅ Ensure history updates after search
    } catch (error) {
        weatherDisplay.innerHTML = `<p class="error-message">${(error as Error).message}</p>`;
        console.error("Error fetching weather:", error);
    }
};


  // ✅ Function to fetch search history
  const updateHistory = async () => {
    try {
        const response = await fetch("http://localhost:3001/api/weather/history");
        const history = await response.json();

        console.log("Search History Data:", history); // ✅ Debugging - Check if history is fetched

        if (history.length === 0) {
            historyContainer.innerHTML = "<p>No search history yet.</p>"; // ✅ Ensure user sees a message
        } else {
            renderHistory(history);
        }
    } catch (error) {
        console.error("Error fetching history:", error);
    }
};


  // ✅ Function to display weather
  const displayWeather = (data: any) => {
    const city = data.city.name;
    const today = data.list[0];

    weatherDisplay.innerHTML = `
      <h2>${city} (${new Date(today.dt * 1000).toLocaleDateString()})</h2>
      <img src="https://openweathermap.org/img/wn/${today.weather[0].icon}.png" alt="${today.weather[0].description}">
      <p>Temperature: ${today.main.temp}°F</p>
      <p>Humidity: ${today.main.humidity}%</p>
      <p>Wind Speed: ${today.wind.speed} MPH</p>
    `;

    // ✅ Extract one forecast per day at the time closest to 12:00 PM
    const dailyForecastMap = new Map<string, any>();

    for (const entry of data.list) {
        const date = new Date(entry.dt * 1000).toLocaleDateString();
        const hour = new Date(entry.dt * 1000).getHours();

        // Keep the entry closest to 12 PM (noon)
        if (!dailyForecastMap.has(date) || Math.abs(hour - 12) < Math.abs(new Date(dailyForecastMap.get(date).dt * 1000).getHours() - 12)) {
            dailyForecastMap.set(date, entry);
        }
    }

    // ✅ Convert to an array & get exactly 5 days
    const dailyForecast = Array.from(dailyForecastMap.values()).slice(0, 5);

    forecastDisplay.innerHTML = dailyForecast
      .map((day: any) => `
        <div class="forecast-card">
          <h3>${new Date(day.dt * 1000).toLocaleDateString()}</h3>
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
          <p>Temp: ${day.main.temp}°F</p>
          <p>Humidity: ${day.main.humidity}%</p>
          <p>Wind: ${day.wind.speed} MPH</p>
        </div>
      `)
      .join("");
};


  // ✅ Function to render search history
  const renderHistory = (history: any[]) => {
    console.log("Rendering Search History:", history); // ✅ Debugging

    historyContainer.innerHTML = ""; // Clear previous buttons

    history.forEach((entry) => {
        const button = document.createElement("button");
        button.textContent = entry.city;
        button.classList.add("history-btn");
        button.dataset.city = entry.city;
        button.addEventListener("click", () => fetchWeather(entry.city));

        historyContainer.appendChild(button);
    });
};


  // ✅ Handle form submission
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = searchInput.value.trim();
    if (city) {
      fetchWeather(city);
      searchInput.value = "";
    }
  });

  // ✅ Load search history on page load
  updateHistory();
});
