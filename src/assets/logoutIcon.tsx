import React from 'react';

const LogoutIcon = ({ size, stroke }: any) => (
    <svg
        width={size || '20'}
        height={size || '20'}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M7.41797 6.29922C7.6763 3.29922 9.21797 2.07422 12.593 2.07422H12.7013C16.4263 2.07422 17.918 3.56589 17.918 7.29089V12.7242C17.918 16.4492 16.4263 17.9409 12.7013 17.9409H12.593C9.24297 17.9409 7.7013 16.7326 7.4263 13.7826"
            stroke={stroke || '#131313'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12.499 10H3.01562"
            stroke={stroke || '#131313'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M4.8737 7.20898L2.08203 10.0007L4.8737 12.7923"
            stroke={stroke || '#131313'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default LogoutIcon;
