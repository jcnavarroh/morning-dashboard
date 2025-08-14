"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiStormShowers, WiFog } from 'react-icons/wi';
import { FaQuoteLeft, FaMapMarkerAlt, FaThermometerHalf, FaTint, FaWind } from 'react-icons/fa';
import { MdLocationOn, MdRefresh } from 'react-icons/md';
import useSWR from 'swr';
import WeatherInfo from './WeatherInfo';
import QuoteOfTheDay from './QuoteOfTheDay';
import LoadingSpinner from './ui/LoadingSpinner';
import ErrorBoundary from './ui/ErrorBoundary';

// Enhanced fetcher with better error handling
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.message = await res.text();
    throw error;
  }
  return res.json();
};

// Custom hook for greeting based on time
const useGreeting = () => {
  const [greeting, setGreeting] = useState('Good Morning');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 17) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return greeting;
};

export default function Dashboard() {
  const greeting = useGreeting();

  // 1. Fetch Location Data with retry logic
  const { data: locationData, error: locationError, mutate: retryLocation } = useSWR(
    '/api/location', 
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  // 2. Fetch Weather Data (dependent on location)
  const weatherApiKey = locationData ? `/api/weather?lat=${locationData.latitude}&lon=${locationData.longitude}` : null;
  const { data: weatherData, error: weatherError, mutate: retryWeather } = useSWR(
    weatherApiKey, 
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  // 3. Fetch Quote Data
  const { data: quoteData, error: quoteError, mutate: retryQuote } = useSWR(
    '/api/quote', 
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  const isLoading = !locationData && !locationError;
  const hasErrors = locationError || weatherError || quoteError;

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen"
      >
        <motion.div 
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <LoadingSpinner size="lg" className="mb-6" />
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-semibold mb-2 gradient-text"
          >
            Loading your dashboard...
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400"
          >
            Preparing your personalized morning experience
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  if (locationError) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen"
      >
        <motion.div 
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <motion.div 
            initial={{ rotate: -180 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-6xl mb-4"
          >
            <MdLocationOn className="text-aurora-green mx-auto" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-semibold mb-2 text-aurora-green"
          >
            Location Unavailable
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 mb-6"
          >
            We couldn&apos;t determine your location. This might be due to network restrictions or privacy settings.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => retryLocation()}
            className="px-6 py-3 bg-aurora-green/20 hover:bg-aurora-green/30 text-aurora-green border border-aurora-green/50 rounded-lg transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            <MdRefresh className="text-lg" />
            Try Again
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-fade-in">
        {/* Header Section */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            {greeting}, {locationData?.city || 'User'}!
          </h1>
          <p className="text-xl text-gray-300">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

                 {/* Dashboard Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
           <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
             <WeatherInfo 
               data={weatherData} 
               error={weatherError} 
             />
           </div>
           <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
             <QuoteOfTheDay 
               data={quoteData} 
               error={quoteError} 
             />
           </div>
         </div>

        {/* Error Summary */}
        {hasErrors && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-bounce-in">
            <h3 className="text-lg font-semibold text-red-400 mb-2">Some data couldn't be loaded</h3>
            <p className="text-gray-400 text-sm">
              Don't worry, you can still enjoy your dashboard. Try refreshing the page or check your connection.
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Built with ❤️ using Next.js, React, and Tailwind CSS</p>
          <p className="mt-1">Data provided by WeatherAPI.com and Quotable.io</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}