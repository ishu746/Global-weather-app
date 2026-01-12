import React, { useEffect } from "react";
import WeatherBackground from "./components/weatherBackground";
import { useState } from "react";
import { convertTemperature, getHumidityValue, getWindDirection, getVisibilityValue } from "./components/helper";
import humidity from "./assets/humidity.png";
import wind from "./assets/wind.png";
import visibility from "./assets/visibility.png";
import { SunriseIcon } from "./components/Icons";
import { SunsetIcon } from "./components/Icons";




// https://api.openweathermap.org/data/2.5/weather?lat=$s.lat}&lon=${s.lon}&appid={API_KEY}&units=metric
// http://api.openweathermap.org/geo/1.0/direct?q={query}&limit=5&appid={API_KEY}

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [unit, setUnit] = useState("C");
  const [error, setError] = useState(null);


  // const API_KEY = "5f4c8e4c65a31ac5cc7522ba21ceefc5"
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


  useEffect(() => {
    if (city.trim().length >= 3 && !weather) {
      const timer = setTimeout(() => fetchSuggestions(city), 500);
      return () => clearTimeout(timer);
    }
    setSuggestion([]);
  }, [city, weather]);

  // this function will fetch data from api and give suggestion
  const fetchSuggestions = async (query) => {
    if (query.trim().length >= 3) return setSuggestion([]);
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`);
      response.ok ? setSuggestion(await response.json()) : setSuggestion([]);
    }
    catch {
      setSuggestion([]);
    }
  }


  // this wiil fetch data from url
  const fetchWeatherData = async (url, name = '') => {
    setError(" ");
    setWeather(null);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error((await response.json()).message || "City not found");
      const data = await response.json();
      setWeather(data);
      setCity(name || data.name);
      setSuggestion([]);
    }
    catch (error) {
      setError(error.message);
      setSuggestion([]);

    }
  }
  // this function prevent default behaviour of form  and fetch data from api
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return setError("Please enter a valid City Name");
    await fetchWeatherData(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric`)

  };

  //this function check weather exixst and return object
  const getWeatherCondition = () => weather && ({
    main: weather.weather[0].main,
    isDay: Date.now() / 1000 >= weather.sys.sunrise && Date.now() / 1000 < weather.sys.sunset

  })
  return (
    <div className="min-h-screen relative">
      <WeatherBackground condition={getWeatherCondition()} />

      <div className="flex items-center justify-center p-6 min-h-screen">
        <div className="bg-transparent backdrop-filter backdrop-blur-md rounded-xl p-8 shadow-2xl max-w-md w-full text-white border border-white/30 relative z-10">
          <h1 className="text-4xl font-extrabold mb-6 text-center">Weather App
          </h1>

          {!weather ? (
            <form onSubmit={handleSearch} className="felx flex-col relative">
              <input value={city} onChange={(e) => setCity(e.target.value)} type="text"
                placeholder="Enter city name"
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 text-black font-semibold" />
              {suggestion.length > 0 && (
                <div className="absolute top-12 left-0 right-0 bg-transparent rounded-lg max-h-60 overflow-y-auto z-20">
                  {suggestion.map((s) => (
                    <button
                      type="button"
                      key={`${s.lat}-${s.lon}`}
                      onClick={async () => {
                        await fetchWeatherData(
                          `https://api.openweathermap.org/data/2.5/weather?lat=${s.lat}&lon=${s.lon}&appid=${API_KEY}&units=metric`,
                          `${s.name},${s.country}${s.state ? `, ${s.state}` : ""}`
                        );
                        setSuggestion([]); // click ke baad dropdown close
                      }}
                      className="block hover:bg-blue-700 bg-transparent px-4 py-2 text-sm text-left w-full transition-colors"
                    >
                      {s.name}, {s.country}
                      {s.state && `, ${s.state}`}
                    </button>

                  ))}
                </div>
              )}
              <button type="submit" className="bg-purple-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors ">
                Get Weather
              </button>
            </form>
          ) : (
            <div className="mt-6 text-center transition-opacity duration-500 ease-in-out opacity-100">
              <button onClick={() => { setWeather(null); setCity(""); }}
                className="bg-purple-900 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded transition-colors ">
                New Search
              </button>

              <div className="flex justify-between items-center ">
                <h2 className="text-3xl font-bold">
                  {weather.name}
                </h2>
                <button onClick={() => { setUnit(unit === "C" ? "F" : "C") }}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-1 px-3 rounded transition-colors ">
                  &deg;{unit}
                </button>
              </div>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}
                className="mx-auto my-4 animate-bounce" />
              <p className="text-4xl ">
                {convertTemperature(weather.main.temp, unit)}&deg;{unit}
              </p>
              <p className=" capitalize">{weather.weather[0].description}
              </p>

              <div className="flex flex-wrap justify-around mt-6 space-y-4">
                {[
                  [humidity, 'Humidity', `${weather.main.humidity}% (${getHumidityValue(weather.main.humidity)})`],
                  [wind, 'Wind', `${weather.wind.speed} m/s ${weather.wind.deg ? `(${getWindDirection(weather.wind.deg)})` : ''}`],
                  [visibility, 'Visibility', getVisibilityValue(weather.visibility)]
                ].map(([iconSrc, label, value]) => (
                  <div key={label} className="flex flex-col items-center m-2">
                    <img src={iconSrc} alt={label} className="w-8 h-8" />
                    <p className="mt-1 font-semibold">{label}</p>
                    <p className="text-sm">{value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-around mt-6 space-y-4">
              {[
                [SunriseIcon,'Sunrise', weather.sys.sunrise],
                [SunsetIcon,'Sunset', weather.sys.sunset]
              ].map(([Icon, label, time]) => (
                <div key={label} className="flex flex-col items-center m-2">
                 <Icon />
                <p className="mt-1 font-semibold">{label}</p>
                <p className="text-sm">
                  {new Date(time * 1000).toLocaleDateString('en-GB', { hour: '2-digit', minute: '2-digit' })   }
                </p>
                </div>
              ))}
              </div>
              <div className="mt-6 text-sm">
                <p><strong>Feels Like:</strong>{convertTemperature(weather.main.feels_like,unit)} &deg;{unit}</p>
                <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>

              </div>
            </div>
          )}
          {error && <p className="text-red-500 mt-4 text-center font-semibold">{error}</p>}
        </div>
      </div>
    </div>
  );
}


export default App; 