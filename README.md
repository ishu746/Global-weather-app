# Weather App

A modern, responsive weather application built with React and Vite. Get real-time weather information for any city around the world, including temperature, humidity, wind speed, visibility, and sunrise/sunset times.

## Features

- **Real-time Weather Data**: Fetches current weather information using the OpenWeatherMap API
- **City Search with Autocomplete**: Search for cities with intelligent suggestions
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Comprehensive Weather Details**: Displays humidity, wind speed and direction, visibility, and sunrise/sunset times
- **Dynamic Backgrounds**: Weather-themed backgrounds that change based on conditions
- **Responsive Design**: Optimized for desktop and mobile devices
- **Fast and Lightweight**: Built with Vite for quick development and optimal performance

## Technologies Used

- **React**: Frontend framework for building the user interface
- **Vite**: Build tool for fast development and optimized production builds
- **Tailwind CSS**: Utility-first CSS framework for styling
- **OpenWeatherMap API**: Weather data provider


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ishu746/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Get your API key from [OpenWeatherMap](https://openweathermap.org/api) and replace the `API_KEY` in `src/App.jsx`:
   ```javascript
   const API_KEY = "your-api-key-here"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter a city name in the search bar
2. Select from the autocomplete suggestions or press Enter
3. View the current weather information for the selected city
4. Toggle between Celsius and Fahrenheit using the unit switcher
5. Enjoy the dynamic weather-themed background


## Project Structure

```
weather-app/
├── public/
├── src/
│   ├── assets/
│   │   ├── humidity.png
│   │   ├── wind.png
│   │   └── visibility.png
│   ├── components/
│   │   ├── Helper.jsx
│   │   ├── Icons.jsx
│   │   └── weatherBackground.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── package.json
├── README.md
└── vite.config.js
```

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from various open-source libraries
- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
