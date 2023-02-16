import React from 'react';

const BackIcon = ({ size, stroke }: any) => (
    <svg
        width={size || '24'}
        height={size || '24'}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke={stroke || '#131313'}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M13.2602 15.5307L9.74023 12.0007L13.2602 8.4707"
            stroke={stroke || '#131313'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default BackIcon;
