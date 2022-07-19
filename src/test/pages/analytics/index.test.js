// import Analytics from '@/pages/dashboard/analytics';
// import React from 'react';
// import { fireEvent, render, screen } from '../../text-utils';
// import { useRouter } from 'next/router';

// jest.mock('next/router', () => ({
//     useRouter: jest.fn()
// }));

// describe('Analytics Home Page', () => {
//     const push = jest.fn();
//     useRouter.mockImplementation(() => ({
//         push,
//         pathname: '/',
//         route: '/',
//         asPath: '/',
//         query: ''
//     }));

//     test('should render the heading', () => {
//         render(<Analytics />);

//         const heading = screen.getByTestId('heading');

//         expect(heading).toBeInTheDocument();
//     });
//     test('click video analytics button', () => {
//         render(<Analytics />);
//         const button = screen.getByTestId('open-video-analytics');
//         fireEvent.click(button);
//         expect(push).toHaveBeenCalledWith('/dashboard/analytics/all-videos');
//     });
//     test('click player analytics button', () => {
//         render(<Analytics />);
//         const button = screen.getByTestId('open-player-analytics');
//         fireEvent.click(button);
//         expect(push).toHaveBeenCalledWith('/dashboard/analytics/all-videos');
//     });
// });
