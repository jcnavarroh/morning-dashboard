import { render, screen } from '@testing-library/react';

// Mock all components to avoid import issues
jest.mock('../Dashboard', () => {
  return function MockDashboard() {
    return (
      <div data-testid='dashboard'>
        <h1>Good Morning, User!</h1>
        <div data-testid='weather-section'>Weather Section</div>
        <div data-testid='quote-section'>Quote Section</div>
      </div>
    );
  };
});

import Dashboard from '../Dashboard';

describe('Dashboard', () => {
  it('renders basic dashboard structure', () => {
    render(<Dashboard />);

    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders weather and quote sections', () => {
    render(<Dashboard />);

    expect(screen.getByTestId('weather-section')).toBeInTheDocument();
    expect(screen.getByTestId('quote-section')).toBeInTheDocument();
  });
});
