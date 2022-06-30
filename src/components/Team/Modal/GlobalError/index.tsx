import Image from 'next/image';
import React from 'react';
type ErrorType = {
    setGlobalError: any;
};
const GlobalError = ({ setGlobalError }: ErrorType) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <Image
                    className="modal-image"
                    width={'100px'}
                    height={'100px'}
                    src={'/icons/error.svg'}
                    alt="Error"
                />
                <button className="btn" onClick={() => setGlobalError(false)}>
                    TRY AGAIN
                </button>
            </div>
        </div>
    );
};

export default GlobalError;
