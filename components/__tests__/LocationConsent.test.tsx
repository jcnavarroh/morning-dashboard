import { render, screen, fireEvent } from '@testing-library/react';
import LocationConsent from '../LocationConsent';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('LocationConsent', () => {
  const mockOnConsent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('renders consent dialog when visible and no previous consent', () => {
    render(<LocationConsent onConsent={mockOnConsent} isVisible={true} />);

    expect(screen.getByText('Location Access')).toBeInTheDocument();
    expect(screen.getByText(/Use My Location/)).toBeInTheDocument();
    expect(screen.getByText(/Use Default Location/)).toBeInTheDocument();
  });

  it('does not render when not visible', () => {
    render(<LocationConsent onConsent={mockOnConsent} isVisible={false} />);

    expect(screen.queryByText('Location Access')).not.toBeInTheDocument();
  });

  it('calls onConsent with true when user consents to location', () => {
    render(<LocationConsent onConsent={mockOnConsent} isVisible={true} />);

    fireEvent.click(screen.getByText(/Use My Location/));

    expect(mockOnConsent).toHaveBeenCalledWith(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'locationConsent',
      'true'
    );
  });

  it('calls onConsent with false when user chooses default location', () => {
    render(<LocationConsent onConsent={mockOnConsent} isVisible={true} />);

    fireEvent.click(screen.getByText(/Use Default Location/));

    expect(mockOnConsent).toHaveBeenCalledWith(false);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'locationConsent',
      'false'
    );
  });

  it('loads previous consent from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('true');

    render(<LocationConsent onConsent={mockOnConsent} isVisible={true} />);

    expect(mockOnConsent).toHaveBeenCalledWith(true);
    expect(screen.queryByText('Location Access')).not.toBeInTheDocument();
  });

  it('shows privacy information', () => {
    render(<LocationConsent onConsent={mockOnConsent} isVisible={true} />);

    expect(
      screen.getByText(/We'd like to show you weather information/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Your choice is saved locally/)
    ).toBeInTheDocument();
  });
});
