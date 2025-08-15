import { NextResponse } from 'next/server';
import { geolocation } from '@vercel/edge';

export const runtime = 'edge'; // Use the Vercel Edge Runtime for speed

// Fallback function to get location from ip-api.com (with user consent)
async function getLocationFromIP() {
  try {
    const response = await fetch('http://ip-api.com/json/', {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Morning-Dashboard/1.0',
      },
    });

    if (!response.ok) {
      throw new Error('IP API request failed');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return {
        city: data.city,
        latitude: data.lat.toString(),
        longitude: data.lon.toString(),
        country: data.countryCode,
        region: data.regionName,
        source: 'ip-api',
      };
    }

    throw new Error('IP API returned unsuccessful status');
  } catch (error) {
    console.error('Error fetching location from IP API:', error);
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const useIPGeolocation = searchParams.get('useIP') === 'true';

    // First, try Vercel's geolocation (most privacy-friendly)
    const location = geolocation(request);

    let locationData;

    if (location?.city && location?.latitude && location?.longitude) {
      // Use Vercel geolocation if available (server-side, no additional consent needed)
      locationData = {
        city: location.city,
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
        country: location.country || 'Unknown',
        region: location.region || 'Unknown',
        source: 'vercel-edge',
      };
    } else if (useIPGeolocation) {
      // Only use IP-based geolocation if user explicitly consents
      const ipLocation = await getLocationFromIP();

      if (ipLocation) {
        locationData = ipLocation;
      } else {
        // Fallback to Tromsø, Norway (aurora borealis city)
        locationData = {
          city: 'Tromsø',
          latitude: '69.6492',
          longitude: '18.9553',
          country: 'NO',
          region: 'Troms og Finnmark',
          source: 'fallback',
        };
      }
    } else {
      // Default fallback without IP geolocation
      locationData = {
        city: 'Tromsø',
        latitude: '69.6492',
        longitude: '18.9553',
        country: 'NO',
        region: 'Troms og Finnmark',
        source: 'fallback',
      };
    }

    // Set cache headers for location data (doesn't change often)
    const response = NextResponse.json(locationData);
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=7200'
    );

    return response;
  } catch (error) {
    console.error('Error getting location:', error);

    // Return fallback location even on error
    const fallbackLocation = {
      city: 'Tromsø',
      latitude: '69.6492',
      longitude: '18.9553',
      country: 'NO',
      region: 'Troms og Finnmark',
      source: 'fallback',
    };

    return NextResponse.json(fallbackLocation);
  }
}
