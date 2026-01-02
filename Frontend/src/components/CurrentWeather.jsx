import { format, parse } from 'date-fns';

const getWindDescription = (windKph) => {
  if (windKph < 10) return 'Calm';
  if (windKph < 20) return 'A little breezy';
  if (windKph < 30) return 'Windy';
  return 'Very windy';
};

const getHumidityDescription = (humidity) => {
  if (humidity < 30) return 'Dry';
  if (humidity < 60) return 'Comfortable';
  if (humidity < 80) return 'Humid';
  return 'Sticky';
};

const getUVDescription = (uv) => {
  if (uv < 3) return 'Low';
  if (uv < 6) return 'Moderate';
  if (uv < 8) return 'High';
  if (uv < 11) return 'Very high';
  return 'Extreme';
};

const getDayAndHHMM = (rawDate) => {
  const date = parse(rawDate, 'yyyy-MM-dd HH:mm', new Date());
  return format(date, 'EEEE, h:mm a');
};

const CurrentWeather = ({ data, location }) => {
  const { localtime, name } = location;
  const {
    temp_c,
    condition,
    feelslike_c,
    maxtemp_c,
    mintemp_c,
    wind_kph,
    humidity,
    uv,
  } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Main Temp Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 flex flex-col justify-between shadow-lg">
         <div className="flex justify-between items-start">
            <div>
               <h2 className="text-3xl font-bold tracking-wide">{name}</h2>
               <p className="text-blue-100 mt-1">{getDayAndHHMM(localtime)}</p>
            </div>
            <div className="bg-orange-500/20 px-3 py-1 rounded-full text-sm font-medium text-orange-100">
               Live
            </div>
         </div>
         
         <div className="flex items-center gap-4 mt-6">
            <h1 className="text-7xl font-bold">{Math.round(temp_c)}°</h1>
            <div className="flex flex-col">
               <span className="text-xl font-medium">{condition.text}</span>
               <span className="text-white/60">Feels like {Math.round(feelslike_c)}°</span>
            </div>
         </div>
      </div>

      {/* Details Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 grid grid-cols-2 gap-4 shadow-lg">
         <div className="flex flex-col gap-1">
            <span className="text-white/60 text-sm">Wind</span>
            <span className="text-2xl font-semibold">{wind_kph} <span className="text-sm font-normal text-white/60">km/h</span></span>
            <span className="text-xs text-white/50">{getWindDescription(wind_kph)}</span>
         </div>
         <div className="flex flex-col gap-1">
            <span className="text-white/60 text-sm">Humidity</span>
            <span className="text-2xl font-semibold">{humidity}%</span>
            <span className="text-xs text-white/50">{getHumidityDescription(humidity)}</span>
         </div>
         <div className="flex flex-col gap-1">
            <span className="text-white/60 text-sm">UV Index</span>
            <span className="text-2xl font-semibold">{uv}</span>
            <span className="text-xs text-white/50">{getUVDescription(uv)}</span>
         </div>
         <div className="flex flex-col gap-1">
            <span className="text-white/60 text-sm">High / Low</span>
            <span className="text-2xl font-semibold">{Math.round(maxtemp_c)}° / {Math.round(mintemp_c)}°</span>
         </div>
      </div>
    </div>
  );
};

export default CurrentWeather;