import { NextResponse } from 'next/server';
import { geolocation } from '@vercel/edge';

export const runtime = 'edge'; // Use the Vercel Edge Runtime for speed

export function GET(request: Request) {
  try {
    const location = geolocation(request);

    // For local development, geolocation will be empty. Provide a fallback.
    const city = location?.city || 'Bogota';
    const latitude = location?.latitude || '4.6097';
    const longitude = location?.longitude || '-74.0817';
    const country = location?.country || 'CO';
    const region = location?.region || 'Bogota';

    const locationData = {
      city,
      latitude,
      longitude,
      country,
      region
    };

    // Set cache headers for location data (doesn't change often)
    const response = NextResponse.json(locationData);
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
    
    return response;
  } catch (error) {
    console.error('Error getting location:', error);
    return NextResponse.json({ error: 'Failed to determine location' }, { status: 503 });
  }
}