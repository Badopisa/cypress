import Highlights from '@/pages/dashboard/analytics/highlights';
import React from 'react';
import { fireEvent, render, screen } from '../../text-utils';

describe('Highlights Page', () => {
  test('should render highlight header', () => {
    render(<Highlights />);

    const heading = screen.getByText(/Video Analytics/i);

    expect(heading).toBeInTheDocument();
  });
  test('click video analytics button', () => {
    render(<Highlights />);
    const button = screen.getByTestId('upload-and-analyze');
    fireEvent.click(button);
  });
});
