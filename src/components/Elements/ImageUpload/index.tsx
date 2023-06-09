import React, { useRef, useEffect, useState } from 'react';
import { Image, NextChakraImageProps } from '@/components/Elements/Image/Image';
import { Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateImageFile } from '@/store/actions/authActions';

interface ImageUploadProps extends NextChakraImageProps {
    defaultImage: string;
    setSelectedImage: any;
    selectedImage: File | null | string;
    title?: string;
}

const ImageUpload = ({
    defaultImage,
    setSelectedImage,
    selectedImage,
    title = 'Select picture from files',
    ...rest
}: Omit<ImageUploadProps, 'src'>) => {
    const dispatch = useDispatch();
    const imageRef = useRef<any>(null);
    const [defaultUserImage, setDefaultUserImage] = useState(defaultImage);

    useEffect(() => {
        // dispatch(updateImageFile(imageRef?.current?.files[0]));
        // dispatch(updateFileName(imageRef?.current?.files[0]?.name.replace(/\..+$/, "")));
        if (selectedImage) {
            //check if the seleceted image is a string
            if (typeof selectedImage === 'string') {
                setDefaultUserImage(selectedImage);

                return;
            }
            const objectURL = URL.createObjectURL(selectedImage);
            setDefaultUserImage(objectURL);
            // Clean up the selection to avoid memory leak
            return () => URL.revokeObjectURL(objectURL);
        } else {
            setDefaultUserImage(defaultImage);
        }
    }, [defaultImage, selectedImage]);

    // On each change let user have access to a selected file
    const handleChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        dispatch(updateImageFile(file));
    };

    const removeImage = () => {
        setSelectedImage(null);
        dispatch(updateImageFile(''));
    };

    return (
        <>
            <input
                type="file"
                id="file"
                accept="image/png, image/jpeg"
                ref={imageRef}
                style={{ display: 'none' }}
                onChange={handleChange}
                name="picture"
            />
            <Image
                {...rest}
                cursor="pointer"
                overflow="hidden"
                bgColor="grey6"
                objectFit={'contain'}
                position="relative"
                _hover={{
                    _after: {
                        content: '""',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        bottom: '0',
                        right: '0',
                        bg: 'rgba(0, 0, 0, 0.5)'
                    },
                    _before: {
                        content: 'url(/images/edit_icon.svg)',
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 999
                    }
                }}
                src={defaultUserImage}
                onClick={() => imageRef.current?.click()}
            />
            {selectedImage ? (
                <Text
                    onClick={removeImage}
                    cursor="pointer"
                    color="red"
                    fontSize="16px"
                    fontWeight={'400'}
                    decoration="underline"
                    textAlign="center">
                    Remove Logo
                </Text>
            ) : (
                <Text
                    onClick={() => imageRef.current?.click()}
                    cursor="pointer"
                    color="green"
                    fontSize="16px"
                    fontWeight={'400'}
                    // decoration="underline"
                    textAlign="center">
                    {title}
                </Text>
            )}
        </>
    );
};

export default ImageUpload;
