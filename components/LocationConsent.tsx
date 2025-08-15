/* eslint-disable react/jsx-no-bind */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LocationConsentProps {
  onConsent: (_consent: boolean) => void;
  isVisible: boolean;
}

export default function LocationConsent({
  onConsent,
  isVisible,
}: LocationConsentProps) {
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already made a choice
    if (typeof window !== 'undefined') {
      const savedConsent = localStorage.getItem('locationConsent');
      if (savedConsent !== null) {
        setHasConsented(savedConsent === 'true');
        onConsent(savedConsent === 'true');
      }
    }
  }, [onConsent]);

  const handleConsent = (_consent: boolean) => {
    setHasConsented(_consent);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locationConsent', _consent.toString());
    }
    onConsent(_consent);
  };

  if (!isVisible || hasConsented !== null) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className='glass-effect p-8 rounded-2xl max-w-md w-full text-center'
      >
        <div className='text-4xl mb-4'>🌍</div>
        <h3 className='text-2xl font-bold gradient-text mb-4'>
          Location Access
        </h3>
        <p className='text-gray-300 mb-6'>
          We&apos;d like to show you weather information for your location. We
          can use your IP address for approximate location, or you can choose to
          use our default location (Tromsø, Norway).
        </p>

        <div className='space-y-3'>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={function () {
              handleConsent(true);
            }}
            className='w-full px-6 py-3 bg-aurora-green/20 hover:bg-aurora-green/30 text-aurora-green border border-aurora-green/50 rounded-lg transition-all duration-200'
          >
            ✅ Use My Location
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={function () {
              handleConsent(false);
            }}
            className='w-full px-6 py-3 bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 border border-gray-600/50 rounded-lg transition-all duration-200'
          >
            🏔️ Use Default Location
          </motion.button>
        </div>

        <p className='text-xs text-gray-500 mt-4'>
          Your choice is saved locally and can be changed anytime in settings.
        </p>
      </motion.div>
    </motion.div>
  );
}
