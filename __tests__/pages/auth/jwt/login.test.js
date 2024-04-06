import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Login from 'src/pages/auth/jwt/login';

jest.mock('src/hooks/use-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Login Page', () => {
  it('renders login form', async () => {
    const { getByLabelText, getByText } = render(<Login />);

    const emailInput = getByLabelText('Correo Electrónico');
    const passwordInput = getByLabelText('Contraseña');
    const submitButton = getByText('Iniciar Sesión');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
