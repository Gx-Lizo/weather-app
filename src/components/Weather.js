import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);

  //registered on the weather API and got a key which I saved on .env with the WEATHER_API_KEY property
  const API_KEY = "process.env.WEATHER_API_KEY"; // Replace with your actual API key

  // handleInputChange is called when user inputs data on the inputfiled and the city state variable is set to the user input
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  // handleInputFocus called when user clicks the input field
  const handleInputFocus = () => {
    setInputFocused(true);
    setError(null); //clear the error when input is focused
    setWeatherData(null); // Clear weather data when input is focused
  };

  // called when user clicks anywhere other tham the inputfield
  const handleInputBlur = () => {
    setInputFocused(false);
  };

  // called user clicks the search button,  to fetch the weather of the city
  const handleSearch = async () => {
    setError(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!response.ok) {
        throw new Error("City not found Please try again.");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && !inputFocused && <p>{error}</p>}
      {inputFocused || !weatherData ? null : (
        <div>
          <h2>
            {weatherData.location.name}, {weatherData.location.country}
          </h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
          />
        </div>
      )}
    </div>
  );
}

export default App;
