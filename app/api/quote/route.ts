import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Using a different quotes API that's more reliable
    const quoteApiUrl = 'https://api.quotable.io/random?tags=inspirational|motivational';
    const res = await fetch(quoteApiUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Morning-Dashboard/1.0'
      }
    });

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }

    const data = await res.json();
    
    if (!data.content || !data.author) {
      throw new Error('Invalid data structure from API');
    }

    const simplifiedData = {
      content: data.content,
      author: data.author,
    };

    return NextResponse.json(simplifiedData);
  } catch (error) {
    console.error('Error fetching quote from API:', error);
    
    // If the primary API fails, try a backup API
    try {
      const backupApiUrl = 'https://zenquotes.io/api/random';
      const backupRes = await fetch(backupApiUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Morning-Dashboard/1.0'
        }
      });

      if (backupRes.ok) {
        const backupData = await backupRes.json();
        if (backupData[0] && backupData[0].q && backupData[0].a) {
          return NextResponse.json({
            content: backupData[0].q,
            author: backupData[0].a
          });
        }
      }
    } catch (backupError) {
      console.error('Backup API also failed:', backupError);
    }
    
    // If both APIs fail, return an error
    return NextResponse.json(
      { error: 'Unable to fetch quote from external APIs' }, 
      { status: 503 }
    );
  }
}