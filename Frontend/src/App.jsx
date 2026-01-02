import { useEffect, useState } from 'react';
import { getWeatherData } from './api';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import SearchBar from './components/SearchBar';

function App() {
  const [city, setCity] = useState('jaipur');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const data = await getWeatherData(city);
        const { mintemp_c } = data.forecast.forecastday[0].day;
        const { maxtemp_c } = data.forecast.forecastday[0].day;
        setWeatherData({
          current: { ...data.current, mintemp_c, maxtemp_c },
          hourly: data.forecast.forecastday[0].hour,
          weekly: data.forecast.forecastday.slice(1),
          location: data.location,
        });
        setError('');
      } catch (err) {
        setError('Error fetching weather data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-orange-500 text-white p-4 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <SearchBar onSearch={setCity} />
          {loading && <p className="text-center text-xl animate-pulse">Loading...</p>}
          {error && <p className="text-center text-red-200 bg-red-500/20 p-2 rounded">{error}</p>}
          {weatherData && (
            <>
              <CurrentWeather
                data={weatherData.current}
                location={weatherData.location}
              />
              <HourlyForecast data={weatherData.hourly} />
            </>
          )}
        </div>
        
        <div className="lg:col-span-1">
           {weatherData && <WeeklyForecast data={weatherData.weekly} />}
        </div>
      </div>
    </div>
  );
}

export default App;