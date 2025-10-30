import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MyProfile from '../components/MyProfile';
import '@testing-library/jest-dom/extend-expect';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthToken } from "../AuthTokenContext";

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn(),
}));

jest.mock('../AuthTokenContext', () => ({
  useAuthToken: jest.fn(),
}));

// Mocking global fetch
const mockedUseAuth0 = useAuth0;
const mockedUseAuthToken = useAuthToken;

beforeEach(() => {
  mockedUseAuth0.mockReturnValue({
    isAuthenticated: false,
    user: { email: '', nickname: '', email_verified: false },
    loginWithRedirect: jest.fn(),
  });

  mockedUseAuthToken.mockReturnValue({
    accessToken: 'token',
  });

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ nickname: 'userNickname' }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

// Test for Unauthenticated Users
test('prompts unauthenticated users to log in', () => {
  render(<MyProfile />);
  const heading = screen.getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent(/Please/i);
  expect(heading).toHaveTextContent(/log in/i);
});

// Test for Authenticated Users
test('shows profile information when authenticated', async () => {
  mockedUseAuth0.mockReturnValue({
    isAuthenticated: true,
    user: {
      email: 'user@test.com',
      nickname: 'testuser',
      sub: 'auth0|123456',
      email_verified: true,
    },
    loginWithRedirect: jest.fn(),
  });
  
  render(<MyProfile />);
  
  expect(await screen.findByText('Nick Name: testuser')).toBeInTheDocument();
  expect(screen.getByText('Email: user@test.com')).toBeInTheDocument();
  expect(screen.getByText('Email verified: true')).toBeInTheDocument();
});


// Test Profile Update Function
test('allows the user to update their nickname', async () => {
  mockedUseAuth0.mockReturnValue({
    user: {
      email: 'user@test.com',
      nickname: 'testuser',
      email_verified: true,
    },
    loginWithRedirect: jest.fn(),
  });

  render(<MyProfile />);

  // Wait for the fetch to complete and nickname to be set
  const input = await screen.findByDisplayValue('testuser');

  // inputting a new nickname
  fireEvent.change(input, { target: { value: 'newnickname' } });
  fireEvent.click(screen.getByRole('button', { name: /update nickname/i }));

  // check for updated value
  await waitFor(() => {
    expect(screen.getByText('Nick Name: newnickname')).toBeInTheDocument();
  });
});