import React from 'react';

const ComparisonIcon = ({ size, stroke }: any) => (
    <svg
        width={size || '20'}
        height={size || '20'}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M7.2263 11.666H3.33464C2.41797 11.666 1.66797 12.416 1.66797 13.3327V18.3327H7.2263V11.666Z"
            stroke={stroke || '#131313'}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M11.1065 8.33398H8.88151C7.96484 8.33398 7.21484 9.08398 7.21484 10.0007V18.334H12.7732V10.0007C12.7732 9.08398 12.0315 8.33398 11.1065 8.33398Z"
            stroke={stroke || '#131313'}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M16.6651 14.166H12.7734V18.3327H18.3318V15.8327C18.3318 14.916 17.5818 14.166 16.6651 14.166Z"
            stroke={stroke || '#131313'}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10.4345 1.72436L10.8762 2.6077C10.9345 2.7327 11.0928 2.84936 11.2262 2.86603L12.0262 2.99936C12.5345 3.0827 12.6595 3.45768 12.2928 3.81601L11.6678 4.44101C11.5595 4.54935 11.5012 4.74935 11.5345 4.89102L11.7095 5.6577C11.8512 6.26603 11.5262 6.49937 10.9928 6.1827L10.2428 5.74104C10.1095 5.6577 9.8845 5.6577 9.75117 5.74104L9.00117 6.1827C8.46783 6.49937 8.14283 6.26603 8.2845 5.6577L8.4595 4.89102C8.49284 4.74935 8.4345 4.54101 8.32617 4.44101L7.7095 3.82436C7.34283 3.45769 7.4595 3.09101 7.97617 3.00768L8.77617 2.87437C8.9095 2.84937 9.06784 2.7327 9.12617 2.61604L9.56783 1.73268C9.8095 1.24935 10.1928 1.24936 10.4345 1.72436Z"
            stroke={stroke || '#4F4F4F'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default ComparisonIcon;
