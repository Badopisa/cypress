import React from 'react';
import { render, screen } from '../text-utils';
import Login from '../../pages/login';

describe('Login Page', () => {
  it('should render the heading', () => {
    render(<Login />);

    const heading = screen.getByText(/Continue Your Analysis Coach/i);

    expect(heading).toBeInTheDocument();
  });
});
