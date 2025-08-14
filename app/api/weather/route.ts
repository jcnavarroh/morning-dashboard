import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const apiKey = process.env.WEATHER_API_KEY;

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json({ error: 'Weather API key not configured' }, { status: 500 });
  }

  try {
    const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;
    const res = await fetch(weatherApiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Morning-Dashboard/1.0'
      },
      next: { revalidate: 1800 } // Cache for 30 minutes
    });

    if (!res.ok) {
      throw new Error(`Weather API responded with status: ${res.status}`);
    }

    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    // Enhanced data with additional weather information
    const simplifiedData = {
      temp_c: data.current.temp_c,
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
      humidity: data.current.humidity,
      wind_kph: data.current.wind_kph,
      feelslike_c: data.current.feelslike_c,
    };

    // Set cache headers for better performance
    const response = NextResponse.json(simplifiedData);
    response.headers.set('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');
    
    return response;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 503 });
  }
}