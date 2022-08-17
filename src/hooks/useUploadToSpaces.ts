import { useState, useEffect } from 'react';
import { updateIsLoading } from '@/store/actions/msgAction';
import { updateFileName, updateImageFile } from '@/store/actions/authActions';
import { useDispatch } from 'react-redux';
import SocketIOClient from 'socket.io-client';

let socket: any;

const useUploadToSpaces = (file: any, globalLoading = true) => {
    const [spaceURL, setSpaceURL] = useState('');
    const [spaceError, setSpaceError] = useState(null);
    const [spaceIsLoading, setSpaceIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);
    const dispatch = useDispatch();

    useEffect(async () => {
        // connect to socket server
        socket = SocketIOClient.connect(process.env.NEXT_PUBLIC_APP_BASE_URL, {
            path: '/api/socket'
        });

        // log socket connection
        socket.on('connect', () => {
            console.log('SOCKET CONNECTED!', socket.id);
        });

        // update chat on new message dispatched
        socket.on('uploadProgress', (progress: any) => {
            console.log('message recieved in hook useeffect', progress);
            const percentCompleted = Math.round((progress.loaded * 100) / progress.total);
            setProgress(percentCompleted);
            console.log('percentCompleted', percentCompleted);
        });

        // socket disconnect onUnmount if exists
        if (socket) return () => socket.disconnect();
    }, []);

    useEffect(() => {
        setSpaceError(null);
        if (file === '') {
            setSpaceError(null);
        }
        const uploadFile = async () => {
            dispatch(updateIsLoading(true));
            setSpaceIsLoading(true);
            console.log('Uploading file to Spaces');

            // Create FormData and pass picked file with other necessary details
            const userId = 'user';
            const formData = new FormData();
            formData.append('file', file);
            formData.append('id', userId);
            try {
                const uploadFileRes = await fetch('/api/digital-ocean/uploader', {
                    method: 'POST',
                    body: formData
                });
                const uploadFileData = await uploadFileRes.json();
                // Retrieve url and show it to user?
                // Update UI to show file has been uploaded
                console.log('uploadFileData', uploadFileData);
                return uploadFileData.url;
            } catch (e: any) {
                console.log('upload error', e);
                setSpaceError(e);
                dispatch(updateIsLoading(false));
                return '';
                // Update UI to show file upload failed
            }
        };

        if (file) {
            if (typeof file === 'string') {
                const extension = file.split('=')[1]?.toLowerCase();
                if (extension === 'sharing') {
                    uploadFile()
                        .then((url: any) => {
                            setSpaceURL(url);
                            console.log('File uploaded to Spaces', url);
                            dispatch(updateFileName(url));
                            dispatch(updateIsLoading(!globalLoading));
                            setIsSuccess(true);
                            console.log('success');
                            setSpaceIsLoading(false);
                        })
                        .catch((e: any) => {
                            console.log('Upload 2 error', e);
                            setSpaceError(e);
                            dispatch(updateIsLoading(!globalLoading));
                        });
                }
                setSpaceURL(file);
                dispatch(updateFileName(file));
                dispatch(updateImageFile(file));
                dispatch(updateIsLoading(false));
            } else {
                uploadFile()
                    .then((url: any) => {
                        setSpaceURL(url);
                        console.log('File uploaded to Spaces', url);
                        dispatch(updateFileName(url));
                        dispatch(updateIsLoading(!globalLoading));
                        setIsSuccess(true);
                        console.log('success');
                        setSpaceIsLoading(false);
                    })
                    .catch((e: any) => {
                        console.log('Upload 2 error', e);
                        setSpaceError(e);
                        dispatch(updateIsLoading(!globalLoading));
                    });
            }
        }
        return () => setProgress(0);
    }, [file]);

    return {
        spaceURL,
        isSuccess,
        spaceIsLoading,
        spaceError,
        progress
    };
};

export default useUploadToSpaces;
