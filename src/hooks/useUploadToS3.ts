import { useState, useEffect } from 'react';
import { updateIsLoading } from '@/store/actions/msgAction';
import axios from 'axios';
import { updateFileName, updateImageFile } from '@/store/actions/authActions';
import { useDispatch } from 'react-redux';

const useUploadToS3 = (file: any, globalLoading = true) => {
    const [s3URL, setS3URL] = useState('');
    const [s3Error, setError] = useState(null);
    const [s3IsLoading, setIsLoading] = useState(false);
    const [progress] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setError(null);
        if (file === '') {
            setError(null);
        }
        const uploadImage = async () => {
            dispatch(updateIsLoading(true));
            setIsLoading(true);
            console.log('Uploading file');

            try {

                // Fetching out a URL
                const url = '/users/upload-image';

                // Uploading file
                const result = await axios.post(url, file, {
                    headers: {
                        'Content-Type': file.type,
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                console.log('result', result);
            } catch (e: any) {
                console.log('Upload 1 error', e);
                setError(e);
                dispatch(updateIsLoading(false));
            }
            return process.env.NEXT_PUBLIC_AWS_BUCKET_URL + file.name;
        };

        if (file) {
            if (typeof file === 'string') {
                setS3URL(file);
                dispatch(updateFileName(file));
                dispatch(updateImageFile(file));
                dispatch(updateIsLoading(false));
            } else {
                uploadImage()
                    .then((url: any) => {
                        setS3URL(url);
                        console.log('File uploaded to S3');
                        dispatch(
                            updateFileName(process.env.NEXT_PUBLIC_AWS_BUCKET_URL + file.name)
                        );
                        dispatch(updateIsLoading(!globalLoading));
                        setIsSuccess(true);
                        console.log('success');
                        setIsLoading(false);
                    })
                    .catch((e: any) => {
                        console.log('Upload 2 error', e);
                        setError(e);
                        dispatch(updateIsLoading(!globalLoading));
                    });
            }
        }
    }, [file]);

    return { s3URL, isSuccess, s3IsLoading, s3Error, progress };
};

export default useUploadToS3;
