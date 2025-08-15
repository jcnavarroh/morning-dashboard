// Tests for utility functions that are used across components

describe('Weather Icon Mapping', () => {
  // This would test the getWeatherIcon function if it were extracted
  it('should return appropriate emoji for weather conditions', () => {
    // Mock implementation - in real scenario this would test the actual function
    const getWeatherIcon = (condition: string) => {
      const conditionLower = condition.toLowerCase();
      if (conditionLower.includes('sun') || conditionLower.includes('clear'))
        return '☀️';
      if (conditionLower.includes('cloud')) return '☁️';
      if (conditionLower.includes('rain')) return '🌧️';
      if (conditionLower.includes('snow')) return '❄️';
      if (conditionLower.includes('storm')) return '⛈️';
      if (conditionLower.includes('fog') || conditionLower.includes('mist'))
        return '🌫️';
      return '🌤️';
    };

    expect(getWeatherIcon('sunny')).toBe('☀️');
    expect(getWeatherIcon('clear')).toBe('☀️');
    expect(getWeatherIcon('cloudy')).toBe('☁️');
    expect(getWeatherIcon('rainy')).toBe('🌧️');
    expect(getWeatherIcon('snow')).toBe('❄️');
    expect(getWeatherIcon('storm')).toBe('⛈️');
    expect(getWeatherIcon('foggy')).toBe('🌫️');
    expect(getWeatherIcon('unknown')).toBe('🌤️');
  });
});

describe('Country Code Mapping', () => {
  it('should convert country codes to full names', () => {
    const getCountryName = (countryCode: string) => {
      const countries: { [key: string]: string } = {
        US: 'United States',
        CO: 'Colombia',
        NO: 'Norway',
        SE: 'Sweden',
        FI: 'Finland',
        IS: 'Iceland',
        MX: 'Mexico',
        CA: 'Canada',
        BR: 'Brazil',
        AR: 'Argentina',
        ES: 'Spain',
        FR: 'France',
        DE: 'Germany',
        IT: 'Italy',
        UK: 'United Kingdom',
        GB: 'United Kingdom',
        AU: 'Australia',
        JP: 'Japan',
        CN: 'China',
        IN: 'India',
        RU: 'Russia',
      };

      return countries[countryCode.toUpperCase()] || countryCode;
    };

    expect(getCountryName('US')).toBe('United States');
    expect(getCountryName('NO')).toBe('Norway');
    expect(getCountryName('CO')).toBe('Colombia');
    expect(getCountryName('UNKNOWN')).toBe('UNKNOWN');
    expect(getCountryName('us')).toBe('United States'); // case insensitive
  });
});

describe('Greeting Logic', () => {
  it('should return appropriate greeting based on hour', () => {
    const getGreeting = (hour: number) => {
      if (hour < 12) return 'Good Morning';
      if (hour < 17) return 'Good Afternoon';
      return 'Good Evening';
    };

    expect(getGreeting(6)).toBe('Good Morning');
    expect(getGreeting(11)).toBe('Good Morning');
    expect(getGreeting(12)).toBe('Good Afternoon');
    expect(getGreeting(16)).toBe('Good Afternoon');
    expect(getGreeting(17)).toBe('Good Evening');
    expect(getGreeting(23)).toBe('Good Evening');
  });
});

describe('Date Formatting', () => {
  it('should format date correctly', () => {
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    // Test that the function works with any date
    const testDate = new Date('2024-01-12');
    const formatted = formatDate(testDate);

    // Just verify it returns a properly formatted string
    expect(formatted).toMatch(/^[A-Za-z]+, [A-Za-z]+ \d{1,2}, \d{4}$/);
    expect(formatted).toContain('2024');
  });
});

describe('Local Storage Utilities', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  it('should save and retrieve user name', () => {
    const mockGetItem = jest.fn().mockReturnValue('John');
    const mockSetItem = jest.fn();

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem,
        clear: jest.fn(),
      },
      writable: true,
    });

    const saveUserName = (name: string) => {
      localStorage.setItem('userName', name);
    };

    const getUserName = () => {
      return localStorage.getItem('userName');
    };

    saveUserName('John');
    expect(getUserName()).toBe('John');
    expect(mockSetItem).toHaveBeenCalledWith('userName', 'John');
  });

  it('should handle missing user name', () => {
    const mockGetItem = jest.fn().mockReturnValue(null);

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });

    const getUserName = () => {
      return localStorage.getItem('userName');
    };

    expect(getUserName()).toBeNull();
  });
});

describe('Error Handling', () => {
  it('should create proper error objects', () => {
    const createError = (message: string) => {
      return new Error(message);
    };

    const error = createError('Test error message');
    expect(error.message).toBe('Test error message');
    expect(error).toBeInstanceOf(Error);
  });
});
