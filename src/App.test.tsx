import React from 'react';
import App from "./App";
import { render } from '@testing-library/react';

it('renders the landing page', () => {
  render(<App />);
});