import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'test@example.com');

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'password123');

    expect(passwordInput).toHaveValue('password123');
  });

  it('should call login function when login button is clicked', async () => {
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByPlaceholderText('Email');
    const passwordInput = await screen.getByPlaceholderText('Password');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    expect(mockLogin).toBeCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
