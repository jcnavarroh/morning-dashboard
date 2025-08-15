import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';

// Mock SWR to avoid complex setup
jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: undefined,
    error: undefined,
    mutate: jest.fn(),
  })),
}));

describe('Dashboard', () => {
  it('renders basic dashboard structure', () => {
    render(<Dashboard />);

    // Check for main heading
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders weather and quote sections', () => {
    render(<Dashboard />);

    // Check for weather section
    expect(screen.getByText('Current Weather')).toBeInTheDocument();

    // Check for quote section
    expect(screen.getByText('Quote of the Day')).toBeInTheDocument();
  });

  it('renders with proper accessibility structure', () => {
    render(<Dashboard />);

    // Check for main heading
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    // Check for weather heading
    expect(
      screen.getByRole('heading', { level: 2, name: 'Current Weather' })
    ).toBeInTheDocument();

    // Check for quote heading
    expect(
      screen.getByRole('heading', { level: 2, name: 'Quote of the Day' })
    ).toBeInTheDocument();
  });
});
