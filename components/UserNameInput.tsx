/* eslint-disable react/jsx-no-bind */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface UserNameInputProps {
  onNameSubmit: (_name: string) => void;
  isVisible: boolean;
}

export default function UserNameInput({
  onNameSubmit,
  isVisible,
}: UserNameInputProps) {
  const [name, setName] = useState('');
  const [hasStoredName, setHasStoredName] = useState<boolean | null>(null);

  // Check if user has stored name (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('userName');
      setHasStoredName(!!storedName);

      if (isVisible && storedName) {
        setName(storedName);
      }

      if (storedName && !isVisible) {
        onNameSubmit(storedName);
      }
    }
  }, [isVisible, onNameSubmit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('userName', name.trim());
      }
      onNameSubmit(name.trim());
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50'
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className='glass-effect p-8 rounded-2xl max-w-md w-full mx-4'
      >
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-3xl font-bold gradient-text text-center flex-1'>
            {hasStoredName ? 'Change Your Name' : 'Welcome to Your Dashboard'}
          </h2>
          <button
            onClick={() => onNameSubmit(name || '')}
            className='text-gray-400 hover:text-white transition-colors duration-200'
          >
            ✕
          </button>
        </div>
        <p className='text-gray-300 text-center mb-6'>
          {hasStoredName
            ? 'Enter your new name to update your dashboard'
            : 'Please enter your name to personalize your experience'}
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={
                hasStoredName ? 'Enter your new name...' : 'Enter your name...'
              }
              className='w-full px-4 py-3 bg-black/30 border border-aurora-green/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green/60 focus:ring-2 focus:ring-aurora-green/20 transition-all duration-200'
              autoFocus
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={!name.trim()}
            className='w-full px-6 py-3 bg-aurora-green/20 hover:bg-aurora-green/30 disabled:bg-gray-600/20 disabled:cursor-not-allowed text-aurora-green border border-aurora-green/50 rounded-lg transition-all duration-200 font-semibold'
          >
            {hasStoredName ? 'Update Name' : 'Get Started'}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
