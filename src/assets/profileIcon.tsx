import React from 'react';

const ProfileIcon = ({ size, stroke }: any) => (
    <svg
        width={size || '20'}
        height={size || '20'}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.9987 9.99935C12.2999 9.99935 14.1654 8.13387 14.1654 5.83268C14.1654 3.5315 12.2999 1.66602 9.9987 1.66602C7.69751 1.66602 5.83203 3.5315 5.83203 5.83268C5.83203 8.13387 7.69751 9.99935 9.9987 9.99935Z"
            stroke={stroke || '#131313'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M17.1565 18.3333C17.1565 15.1083 13.9482 12.5 9.99817 12.5C6.04817 12.5 2.83984 15.1083 2.83984 18.3333"
            stroke={stroke || '#131313'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default ProfileIcon;
