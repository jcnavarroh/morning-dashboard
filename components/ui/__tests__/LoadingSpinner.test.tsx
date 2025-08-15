import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it('renders with custom size', () => {
    render(<LoadingSpinner size='lg' />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<LoadingSpinner className='custom-class' />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('custom-class');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<LoadingSpinner size='sm' />);
    let spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();

    rerender(<LoadingSpinner size='md' />);
    spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();

    rerender(<LoadingSpinner size='lg' />);
    spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });
});
