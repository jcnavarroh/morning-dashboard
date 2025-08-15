import { render, screen } from '@testing-library/react';
import WeatherInfo from '../WeatherInfo';

const mockWeatherData = {
  temp_c: 20.3,
  condition: 'Partly cloudy',
  icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
  humidity: 46,
  wind_kph: 4.7,
  feelslike_c: 20.3,
};

const mockLocation = {
  city: 'Tromsø',
  country: 'NO',
  region: 'Troms og Finnmark',
};

describe('WeatherInfo', () => {
  it('renders loading state when no data and no error', () => {
    render(<WeatherInfo data={undefined} error={null} />);

    expect(screen.getByText('Fetching weather data...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument(); // LoadingSpinner
  });

  it('renders error state when there is an error', () => {
    const error = new Error('Weather API error');
    render(<WeatherInfo data={undefined} error={error} />);

    expect(screen.getByText('Weather Unavailable')).toBeInTheDocument();
    expect(
      screen.getByText(/We couldn't fetch the current weather information/i)
    ).toBeInTheDocument();
  });

  it('renders weather data when available', () => {
    render(<WeatherInfo data={mockWeatherData} error={null} />);

    expect(screen.getByText('Current Weather')).toBeInTheDocument();
    expect(screen.getAllByText('20.3°C')).toHaveLength(2); // Main temp and feels like
    expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
  });

  it('renders location when provided', () => {
    render(
      <WeatherInfo
        data={mockWeatherData}
        error={null}
        location={mockLocation}
      />
    );

    expect(screen.getByText('📍')).toBeInTheDocument();
    expect(screen.getByText('Tromsø, Norway')).toBeInTheDocument();
  });

  it('renders weather icon when available', () => {
    render(<WeatherInfo data={mockWeatherData} error={null} />);

    const weatherIcon = screen.getByAltText('Partly cloudy');
    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon).toHaveAttribute(
      'src',
      'https://cdn.weatherapi.com/weather/64x64/day/116.png'
    );
  });

  it('renders fallback emoji when no icon is available', () => {
    const dataWithoutIcon = { ...mockWeatherData, icon: '' };
    render(<WeatherInfo data={dataWithoutIcon} error={null} />);

    expect(screen.getByText('🌤️')).toBeInTheDocument();
  });
});
