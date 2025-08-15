import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserNameInput from '../UserNameInput';

describe('UserNameInput', () => {
  const mockOnNameSubmit = jest.fn();

  beforeEach(() => {
    mockOnNameSubmit.mockClear();
    localStorage.clear();
  });

  it('renders nothing when not visible', () => {
    render(<UserNameInput onNameSubmit={mockOnNameSubmit} isVisible={false} />);

    expect(
      screen.queryByText('Welcome to Your Dashboard')
    ).not.toBeInTheDocument();
  });

  it('renders welcome message for new users', () => {
    render(<UserNameInput onNameSubmit={mockOnNameSubmit} isVisible={true} />);

    expect(screen.getByText('Welcome to Your Dashboard')).toBeInTheDocument();
    expect(
      screen.getByText('Please enter your name to personalize your experience')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your name...')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Get Started' })
    ).toBeInTheDocument();
  });

  it('handles form submission with valid name', async () => {
    const user = userEvent.setup();

    render(<UserNameInput onNameSubmit={mockOnNameSubmit} isVisible={true} />);

    const input = screen.getByPlaceholderText('Enter your name...');
    const submitButton = screen.getByRole('button', { name: 'Get Started' });

    await user.type(input, 'John');
    await user.click(submitButton);

    expect(mockOnNameSubmit).toHaveBeenCalledWith('John');
  });

  it('disables submit button when input is empty', () => {
    render(<UserNameInput onNameSubmit={mockOnNameSubmit} isVisible={true} />);

    const submitButton = screen.getByRole('button', { name: 'Get Started' });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when input has content', async () => {
    const user = userEvent.setup();

    render(<UserNameInput onNameSubmit={mockOnNameSubmit} isVisible={true} />);

    const input = screen.getByPlaceholderText('Enter your name...');
    const submitButton = screen.getByRole('button', { name: 'Get Started' });

    expect(submitButton).toBeDisabled();

    await user.type(input, 'John');

    expect(submitButton).not.toBeDisabled();
  });

  it('has proper accessibility attributes', () => {
    render(<UserNameInput onNameSubmit={mockOnNameSubmit} isVisible={true} />);

    const input = screen.getByPlaceholderText('Enter your name...');
    expect(input).toHaveAttribute('type', 'text');
  });
});
