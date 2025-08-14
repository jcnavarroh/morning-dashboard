import Image from 'next/image';
import LoadingSpinner from './ui/LoadingSpinner';

interface WeatherData {
  temp_c: number;
  condition: string;
  icon: string;
  humidity?: number;
  wind_kph?: number;
  feelslike_c?: number;
}

interface WeatherInfoProps {
  data: WeatherData | undefined;
  error: Error | null;
}

// Weather icon mapping for better fallbacks
const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('sun') || conditionLower.includes('clear')) return '☀️';
  if (conditionLower.includes('cloud')) return '☁️';
  if (conditionLower.includes('rain')) return '🌧️';
  if (conditionLower.includes('snow')) return '❄️';
  if (conditionLower.includes('storm')) return '⛈️';
  if (conditionLower.includes('fog') || conditionLower.includes('mist')) return '🌫️';
  return '🌤️';
};

export default function WeatherInfo({ data, error }: WeatherInfoProps) {
  const isLoading = !data && !error;
  
  return (
    <div className="glass-effect p-8 rounded-2xl card-hover">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold gradient-text">Current Weather</h2>
        <div className="text-2xl">🌤️</div>
      </div>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-400">Fetching weather data...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🌦️</div>
          <h3 className="text-xl font-semibold text-red-400 mb-2">Weather Unavailable</h3>
          <p className="text-gray-400 text-sm">
            We couldn&apos;t fetch the current weather information.
          </p>
        </div>
      )}
      
      {data && (
        <div className="space-y-6">
          {/* Main Weather Display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                {data.icon ? (
                  <Image 
                    src={`https:${data.icon}`} 
                    alt={data.condition} 
                    width={80} 
                    height={80}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="text-6xl">{getWeatherIcon(data.condition)}</div>
                )}
              </div>
              <div>
                <div className="text-5xl font-bold text-white">{data.temp_c}°C</div>
                <div className="text-xl text-gray-300 capitalize">{data.condition}</div>
              </div>
            </div>
          </div>

          {/* Additional Weather Details */}
          {(data.humidity || data.wind_kph || data.feelslike_c) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              {data.feelslike_c && (
                <div className="text-center">
                  <div className="text-2xl mb-1">🌡️</div>
                  <div className="text-sm text-gray-400">Feels Like</div>
                  <div className="text-lg font-semibold">{data.feelslike_c}°C</div>
                </div>
              )}
              {data.humidity && (
                <div className="text-center">
                  <div className="text-2xl mb-1">💧</div>
                  <div className="text-sm text-gray-400">Humidity</div>
                  <div className="text-lg font-semibold">{data.humidity}%</div>
                </div>
              )}
              {data.wind_kph && (
                <div className="text-center">
                  <div className="text-2xl mb-1">💨</div>
                  <div className="text-sm text-gray-400">Wind</div>
                  <div className="text-lg font-semibold">{data.wind_kph} km/h</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}