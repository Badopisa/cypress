import React from 'react';

const DashboardIcon = ({ size, stroke }: any) => (
    <svg
        width={size || '20'}
        height={size || '20'}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M18.3333 9.08268V3.41602C18.3333 2.16602 17.8 1.66602 16.475 1.66602H13.1083C11.7833 1.66602 11.25 2.16602 11.25 3.41602V9.08268C11.25 10.3327 11.7833 10.8327 13.1083 10.8327H16.475C17.8 10.8327 18.3333 10.3327 18.3333 9.08268Z"
            stroke={stroke || '#4F4F4F'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M18.3333 16.584V15.084C18.3333 13.834 17.8 13.334 16.475 13.334H13.1083C11.7833 13.334 11.25 13.834 11.25 15.084V16.584C11.25 17.834 11.7833 18.334 13.1083 18.334H16.475C17.8 18.334 18.3333 17.834 18.3333 16.584Z"
            stroke={stroke || '#4F4F4F'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8.74935 10.916V16.5827C8.74935 17.8327 8.21602 18.3327 6.89102 18.3327H3.52435C2.19935 18.3327 1.66602 17.8327 1.66602 16.5827V10.916C1.66602 9.66602 2.19935 9.16602 3.52435 9.16602H6.89102C8.21602 9.16602 8.74935 9.66602 8.74935 10.916Z"
            stroke={stroke || '#4F4F4F'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8.74935 3.41602V4.91602C8.74935 6.16602 8.21602 6.66602 6.89102 6.66602H3.52435C2.19935 6.66602 1.66602 6.16602 1.66602 4.91602V3.41602C1.66602 2.16602 2.19935 1.66602 3.52435 1.66602H6.89102C8.21602 1.66602 8.74935 2.16602 8.74935 3.41602Z"
            stroke={stroke || '#4F4F4F'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default DashboardIcon;
