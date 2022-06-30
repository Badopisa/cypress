import { useState, useEffect } from 'react';
import { updateIsLoading } from '@/store/actions/msgAction';
import axios from 'axios';
import { updateFileName, updateImageFile } from '@/store/actions/authActions';
import { useDispatch } from 'react-redux';

const useUploadToS3 = (file: any) => {
    const [s3URL, setS3URL] = useState('');
    const [s3Error, setError] = useState(null);
    const [s3IsLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const uploadImage = async () => {
            dispatch(updateIsLoading(true));
            setIsLoading(true);
            console.log('Uploading file to AWS S3');
            const config: any = {
                onUploadProgress: (progressEvent: any) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(percentCompleted);
                }
            };

            try {
                // Making a POST request to created API endpoint
                const { data } = await axios.post(
                    '/api/s3/uploadFile',
                    {
                        name: file.name,
                        type: file.type
                    },
                    config
                );
                console.log('data from created endpoint', data);

                // Fetching out a URL
                const url = data.url;
                console.log('url', url);

                // Uploading file to S3
                await axios.put(url, file, {
                    headers: {
                        'Content-Type': file.type,
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            } catch (e: any) {
                console.log('Upload 1 error', e);
                setError(e);
                dispatch(updateIsLoading(false));
            }
            return process.env.NEXT_PUBLIC_AWS_BUCKET_URL + file.name;
        };

        if (file) {
            uploadImage()
                .then((url: any) => {
                    setS3URL(url);
                    console.log('File uploaded to S3');
                    dispatch(updateFileName(process.env.NEXT_PUBLIC_AWS_BUCKET_URL + file.name));
                    dispatch(updateIsLoading(false));
                    setIsSuccess(true);
                    console.log('success');
                    setIsLoading(false);
                })
                .catch((e: any) => {
                    console.log('Upload 2 error', e);
                    setError(e);
                    dispatch(updateIsLoading(false));
                });
        }
    }, [file]);

    return { s3URL, isSuccess, s3IsLoading, s3Error, progress };
};

export default useUploadToS3;
