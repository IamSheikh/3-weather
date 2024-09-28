import { useState, FormEvent } from "react";
import { IWeather } from "./types";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<IWeather>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "281562bcc1msh27808b4067b6206p121212jsnafbb30784eb8",
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        setWeatherData(data);
        setCity("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-2xl flex justify-center items-center flex-col border-gray-100 border-2 rounded px-4">
        <h1 className="text-xl mt-4 mb-4 font-bold">
          <span className="text-red-500">A</span>
          <span className="text-orange-500">l</span>
          <span className="text-yellow-300">l</span>
          <span className="text-green-500">i</span>
          <span className="text-blue-500">s</span>
          <span className="text-violet-500">o</span>
          <span className="text-red-500">n</span>{" "}
          <span className="text-orange-500">B</span>
          <span className="text-yellow-300">u</span>
          <span className="text-green-500">r</span>
          <span className="text-blue-500">g</span>
          <span className="text-violet-500">e</span>
          <span className="text-red-500">r</span>
          <span className="text-orange-500">s</span> Weather App
        </h1>

        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            placeholder="Enter city name"
            className="border border-gray-300 rounded-lg px-2 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button
            type="submit"
            className=" bg-blue-500
          hover:bg-blue-600
          text-white
          font-semibold
          py-2
          px-3
          ml-2
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-2"
          >
            Search
          </button>
        </form>

        {weatherData == null ? null : (
          <div className="mt-2 flex justify-center flex-col text-center">
            <h4 className="font-medium">
              {weatherData?.location.name}, {weatherData?.location.region},{" "}
              {weatherData?.location.country}
            </h4>

            <div className="text-center flex justify-center flex-col mt-4">
              <h4 className="font-semibold mt-2">Current Conditions</h4>
              <div className="flex items-center justify-center mt-1">
                <img
                  src={weatherData?.current.condition.icon}
                  alt={weatherData?.current.condition.text}
                />
                <div className="text-left">
                  <p className="font-semibold">
                    Temperature: {weatherData?.current.temp_c} °C
                  </p>
                  <p className="font-semibold">
                    Condition: {weatherData?.current.condition.text}
                  </p>
                  <p className="font-semibold">
                    Wind: {weatherData.current.wind_kph} km/h
                  </p>
                  <p className="font-semibold">
                    Humidity: {weatherData.current.humidity}%
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center flex justify-center flex-col">
              <h4 className="font-semibold mt-2">Average Day Conditions</h4>
              <div className="flex items-center justify-center mt-1">
                <img
                  src={weatherData?.forecast.forecastday[0].day.condition.icon}
                  alt={weatherData?.forecast.forecastday[0].day.condition.text}
                />
                <div className="text-left">
                  <p className="font-semibold">
                    Temperature:
                    {weatherData?.forecast.forecastday[0].day.avgtemp_c} °C
                  </p>
                  <p className="font-semibold">
                    Condition:
                    {weatherData?.forecast.forecastday[0].day.condition.text}
                  </p>
                  <p className="font-semibold">
                    Max Wind:
                    {weatherData.forecast.forecastday[0].day.maxwind_mph} km/h
                  </p>
                  <p className="font-semibold">
                    Humidity:
                    {weatherData.forecast.forecastday[0].day.avghumidity}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
