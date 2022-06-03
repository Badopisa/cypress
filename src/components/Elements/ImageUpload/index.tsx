import React, {useRef, useEffect, useState} from 'react'
import {Image, NextChakraImageProps} from '@/components/Elements/Image/Image'
import {Text} from "@chakra-ui/react";

interface ImageUploadProps extends NextChakraImageProps {
    defaultImage: string
    setSelectedImage: (file: File | null) => void
    selectedImage: File | null
}

const ImageUpload = ({
                         defaultImage,
                         setSelectedImage,
                         selectedImage,
                         ...rest
                     }: Omit<ImageUploadProps, 'src'>) => {
    const imageRef = useRef<HTMLInputElement | null>(null)
    const [defaultUserImage, setDefaultUserImage] = useState(defaultImage)

    useEffect(() => {
        if (selectedImage) {
            const objectURL = URL.createObjectURL(selectedImage)
            setDefaultUserImage(objectURL)
            // Clean up the selection to avoid memory leak
            return () => URL.revokeObjectURL(objectURL)
        } else {
            setDefaultUserImage(defaultImage)
        }
        return () => {
        }
    }, [defaultImage, selectedImage])

    // On each change let user have access to a selected file
    const handleChange = (event: any) => {
        const file = event.target.files[0]
        setSelectedImage(file)
    }

    const removeImage = () => {
        setSelectedImage(null)
    }

    return (
        <>
            <input
                type="file"
                id="file"
                accept="image/png, image/jpeg"
                ref={imageRef}
                style={{display: 'none'}}
                onChange={handleChange}
            />
            <Image
                {...rest}
                cursor="pointer"
                overflow="hidden"
                bgColor="#000000"
                position="relative"
                _hover={{
                    _after: {
                        content: '""',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        bottom: '0',
                        right: '0',
                        bg: 'rgba(0, 0, 0, 0.5)',
                    },
                    _before: {
                        content: 'url(/images/edit_icon.svg)',
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 999,
                    },
                }}
                src={defaultUserImage}
                onClick={() => imageRef.current?.click()}
            />
            {
                selectedImage ? (
                    <Text
                        onClick={removeImage}
                        cursor="pointer"
                        color="#5597FF"
                        decoration="underline"
                        textAlign='center'>
                        Remove Logo
                    </Text>
                ) : (
                    <Text
                        onClick={() => imageRef.current?.click()}
                        cursor="pointer"
                        color="#5597FF"
                        decoration="underline"
                        textAlign='center'>
                        Upload Your Logo
                    </Text>
                )
            }
        </>
    )
}

export default ImageUpload
