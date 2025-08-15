import { render, screen } from '@testing-library/react';
import QuoteOfTheDay from '../QuoteOfTheDay';

const mockQuoteData = {
  content:
    "It's the unknown we fear when we look upon death and darkness, nothing more.",
  author: 'Albus Dumbledore',
};

describe('QuoteOfTheDay', () => {
  it('renders loading state when no data and no error', () => {
    render(<QuoteOfTheDay data={undefined} error={null} />);

    expect(
      screen.getByText('Fetching inspirational quote...')
    ).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument(); // LoadingSpinner
  });

  it('renders error state when there is an error', () => {
    const error = new Error('Quote API error');
    render(<QuoteOfTheDay data={undefined} error={error} />);

    expect(screen.getByText('Quote Unavailable')).toBeInTheDocument();
    expect(
      screen.getByText(/We couldn't fetch an inspirational quote/i)
    ).toBeInTheDocument();
  });

  it('renders quote data when available', () => {
    render(<QuoteOfTheDay data={mockQuoteData} error={null} />);

    expect(screen.getByText('Quote of the Day')).toBeInTheDocument();
    expect(screen.getByText(/It's the unknown we fear/)).toBeInTheDocument();
    expect(screen.getByText('Albus Dumbledore')).toBeInTheDocument();
  });

  it('renders quote with proper formatting', () => {
    render(<QuoteOfTheDay data={mockQuoteData} error={null} />);

    // Check for quote content
    expect(screen.getByText(/It's the unknown we fear/)).toBeInTheDocument();

    // Check for author attribution
    expect(screen.getByText('— Albus Dumbledore')).toBeInTheDocument();
  });
});
