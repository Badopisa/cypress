import Analytics from '@/pages/dashboard/analytics';
import React from 'react';
import { fireEvent, render, screen } from '../../text-utils';

describe('Analytics Home Page', () => {
  test('should render the heading', () => {
    render(<Analytics />);

    const heading = screen.getByTestId('heading');

    expect(heading).toBeInTheDocument();
  });
  test('click video analytics button', () => {
    render(<Analytics />);
    const button = screen.getByTestId('open-video-analytics');
    fireEvent.click(button);
  });
  test('click player analytics button', () => {
    render(<Analytics />);
    const button = screen.getByTestId('open-player-analytics');
    fireEvent.click(button);
  });
});
