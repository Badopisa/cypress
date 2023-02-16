import React from 'react';

const VideoAnalyticsIcon = ({ size, stroke }: any) => (
    <svg
        width={size || '20'}
        height={size || '20'}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10.443 17.0158H5.1763C2.54297 17.0158 1.66797 15.2658 1.66797 13.5074V6.49076C1.66797 3.85742 2.54297 2.98242 5.1763 2.98242H10.443C13.0763 2.98242 13.9513 3.85742 13.9513 6.49076V13.5074C13.9513 16.1408 13.068 17.0158 10.443 17.0158Z"
            stroke={stroke || '#131313'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M16.2659 14.2501L13.9492 12.6251V7.36678L16.2659 5.74178C17.3992 4.95011 18.3326 5.43344 18.3326 6.82511V13.1751C18.3326 14.5668 17.3992 15.0501 16.2659 14.2501Z"
            stroke={stroke || '#131313'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M9.58203 9.16602C10.2724 9.16602 10.832 8.60637 10.832 7.91602C10.832 7.22566 10.2724 6.66602 9.58203 6.66602C8.89168 6.66602 8.33203 7.22566 8.33203 7.91602C8.33203 8.60637 8.89168 9.16602 9.58203 9.16602Z"
            stroke={stroke || '#131313'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default VideoAnalyticsIcon;
