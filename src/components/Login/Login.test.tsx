import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../../contexts/UserContext';

test('renders login form', () => {
  render(
    <UserProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </UserProvider>
  );
  expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
});

test('shows error when fields are empty', () => {
  render(
    <UserProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </UserProvider>
  );
  fireEvent.click(screen.getByText(/ingresar/i));
  expect(screen.getByText(/todos los campos son obligatorios/i)).toBeInTheDocument();
});