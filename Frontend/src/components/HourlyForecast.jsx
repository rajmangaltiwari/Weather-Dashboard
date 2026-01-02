import { format, parse } from 'date-fns';

const HourlyForecast = ({ data }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg">
       <h3 className="text-xl font-semibold mb-4 text-white/90">Hourly Forecast</h3>
       <div className="flex overflow-x-auto gap-6 pb-2 scrollbar-hide">
          {data.map((hour, index) => (
             <div key={index} className="flex flex-col items-center min-w-20 p-3 rounded-2xl hover:bg-white/5 transition-colors">
                <span className="text-sm text-white/70">{format(parse(hour.time, 'yyyy-MM-dd HH:mm', new Date()), 'h a')}</span>
                <img src={hour.condition.icon} alt="icon" className="w-12 h-12 my-2" />
                <span className="text-lg font-bold">{Math.round(hour.temp_c)}°</span>
                <span className="text-xs text-blue-200 mt-1">{hour.chance_of_rain > 0 ? `${hour.chance_of_rain}%` : ''}</span>
             </div>
          ))}
       </div>
    </div>
  );
};

export default HourlyForecast;