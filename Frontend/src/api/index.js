export const getWeatherData = async (cityName) => {
  const response = await fetch(
    `https://weather-dashboard-1-mijx.onrender.com/api/weather?city=${cityName}`
  );
  return response.json();
};