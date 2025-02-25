Here’s your complete README.md:

md
# 🌦️ Weather Dashboard

![Weather Dashboard Screenshot](https://github.com/calvincirwin/weather-dashboard/blob/main/screen-shots/weather-dashboard.png)

## 📌 Description
This is a **Weather Dashboard** application that allows users to **search for a city** and retrieve both **current and 5-day weather forecasts**. The app stores **search history**, enabling users to quickly revisit previous searches.

This project was built using:
- **TypeScript**
- **Express.js (Backend)**
- **Vite (Frontend)**
- **OpenWeather API**
- **Render (Deployment)**

## 🚀 **Live Demo**
🔗 **Frontend:** [View Weather Dashboard](https://weather-dashboard-frontend-47f9.onrender.com/)  
🔗 **Backend API:** [View API](https://weather-dashboard-s5v7.onrender.com/api/weather/history)

---

## 📜 **Features**
✅ **Search for a City**  
✅ **View Current Weather** (Temperature, Wind Speed, Humidity, Icon)  
✅ **View 5-Day Forecast**  
✅ **Search History (Clickable buttons to reload searches)**  
✅ **Deployed and Fully Functional**

---

## 🛠️ **Installation**
If you want to run this project locally, follow these steps:

### 1️⃣ **Clone the Repository**
```
git clone https://github.com/calvincirwin/weather-dashboard.git
cd weather-dashboard


### 2️⃣ Install Dependencies
## 📌 Install Server Dependencies:
```
cd server
npm install
📌 Install Client Dependencies:
```
cd ../client
npm install
```
### 3️⃣ Set Up API Key
```Create a .env file inside the server/ folder:
OPENWEATHER_API_KEY=your-api-key-here
Replace "your-api-key-here" with your OpenWeather API key.
```

### 4️⃣ Run the Application Locally
📌 Start the Backend:

```
cd server
npm run dev
✅ Server running on: http://localhost:3001

```
📌 Start the Frontend:
```
cd ../client
npm run dev
✅ Frontend running on: http://localhost:3000
```
📡 API Endpoints
🔹 Get Search History
```
GET /api/weather/history
```

📌 Returns: List of previously searched cities.

🔹 Search for Weather Data
```
POST /api/weather
Content-Type: application/json
{
  "city": "San Diego"
}
```
📌 Returns: Current & forecasted weather data.

## 🎨 **Technologies Used**

| Tech | Purpose | 
| ---- | ----  |
| **TypeScript** | Strict typing for maintainability | 
| **Express.js** | Backend API | 
| **Vite** | Fast frontend development | 
| **Node.js** | JavaScript runtime | 
| **Day.js** | Formatting dates | 
| **Fetch API** | Making HTTP requests | 
* * *

## 🛠 **Future Improvements**

🚀 Add a **"clear history"** button  
🚀 Improve the **mobile UI**  
🚀 Add **error handling for invalid cities**

* * *

## 📄 **License**

This project is **open source** under the **MIT License**.
* * *

## 🤝 **Contributing**

If you'd like to contribute:

1. **Fork this repo**
2. **Create a new branch**
3. **Submit a pull request!** 🚀

👨‍💻 Author

👤 Calvin Irwin

🔗 [GitHub Profile](https://github.com/calvincirwin)

✉️ Email: [calvincirwin@gmail.com](mailto:calvincirwin@gmail.com)

📢 Feel free to reach out if you have any questions!