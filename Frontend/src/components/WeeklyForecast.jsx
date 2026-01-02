import { format, parseISO } from 'date-fns';
const WeeklyForecast = ({ data }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 h-full shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-white/90">7-Day Forecast</h3>
      <div className="flex flex-col gap-4">
        {data.map((day, index) => (
          <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors" key={index}>
            <div className="w-16 font-medium text-white/80">{format(parseISO(day.date), 'EEE')}</div>
            
            <div className="flex items-center gap-2 flex-1 justify-center">
               <img src={day.day.condition.icon} alt="icon" className="w-8 h-8" />
               <span className="text-sm text-white/70 hidden sm:block">{day.day.condition.text}</span>
            </div>

            <div className="flex gap-3 text-white font-semibold">
               <span>{Math.round(day.day.maxtemp_c)}°</span>
               <span className="text-white/50">{Math.round(day.day.mintemp_c)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;