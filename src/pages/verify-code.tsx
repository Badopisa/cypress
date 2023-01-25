import { Box, Flex, GridItem, HStack, Input, Text, useToast } from '@chakra-ui/react';
import { FormDetails } from '@/components/Form';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import NavBar from '@/components/Layout/NavBar';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import { useRouter } from 'next/router';
import { verifyToken } from '@/store/actions/authActions';
import {UserDataType} from "@/types/AuthDataType";

let currentPinIndex = 0;
const VerifyCode = () => {
    const { forgotPasswordEmail }: any = useSelector((state: RootStateOrAny) => state.auth);
    const [pin, setPin] = useState<string[]>(new Array(4).fill(''));
    const [activePinIndex, setActivePinIndex] = useState<number>(0);
    const [pinPassed, setPinPassed] = useState<boolean>(false);
    const [loading, setLoading] = useState<any>(false);
    const [error, setError] = useState<string>('');
    const dispatch = useDispatch();
    const toast = useToast();
    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [activePinIndex]);

    useEffect(() => {
        console.log('activePinIndex', activePinIndex);
        console.log('pin', pin);
        console.log('pin join', pin.join());
        if (activePinIndex === 4) {
            setLoading(true);
            setPinPassed(true);
            const payload = {
                token: pin.join('')
            };
            dispatch(verifyToken(payload, toast, router, setPinPassed, setError, setLoading));
            // setTimeout(() => {
            //     if (pin.join('') === '3333') {
            //         setError('');
            //         setPinPassed(true);
            //         submit();
            //     } else {
            //         setPinPassed(false);
            //         setError('Wrong pin, try again');
            //     }
            //     setLoading(false);
            //     // submit()
            // }, 1000);
        }
    }, [activePinIndex, pin]);

    const submitPin = useCallback(() => {
        console.log('activePinIndex', activePinIndex);
        console.log('pin', pin);
        console.log('pin join', pin.join());
        if (activePinIndex === 4) {
            setLoading(true);
            setPinPassed(true);
            const payload = {
                token: pin.join('')
            };
            dispatch(verifyToken(payload, toast, router, setPinPassed, setError, setLoading));
            // setTimeout(() => {
            //     if (pin.join('') === '3333') {
            //         setError('');
            //         setPinPassed(true);
            //         submit();
            //     } else {
            //         setPinPassed(false);
            //         setError('Wrong pin, try again');
            //     }
            //     setLoading(false);
            //     // submit()
            // }, 1000);
        }
    }, [pin, activePinIndex]);

    const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = target;
        const newPin: string[] = [...pin];
        newPin[currentPinIndex] = value.substring(value.length - 1);

        if (!value) setActivePinIndex(currentPinIndex - 1);
        else setActivePinIndex(currentPinIndex + 1);

        setPin(newPin);
    };

    const handleOnKeyDown = ({ keyCode }: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        currentPinIndex = index;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (keyCode === 'Backspace') setActivePinIndex(currentPinIndex - 1);
    };
    return (
        <>
            <NavBar />
            <Flex
                direction={'column'}
                bg="white"
                color={'black'}
                minHeight="completeY"
                alignItems="center"
                justifyContent="center">
                <FormDetails
                    hasAccount={true}
                    buttonText="Continue"
                    title="Verify email address"
                    subtitle={`Input token sent to ${forgotPasswordEmail || 'your email'}`}
                    disableButton={!pinPassed}
                    loading={loading}
                    handleButtonClick={submitPin}>
                    <GridItem colSpan={1}>
                        <HStack justifyContent={'space-between'}>
                            {pin.map((_, index) => {
                                return (
                                    <React.Fragment key={`key${index}`}>
                                        <Input
                                            ref={index === activePinIndex ? inputRef : null}
                                            focusBorderColor={error ? 'red' : 'purple'}
                                            borderColor={error ? 'red' : 'grey5'}
                                            _placeholder={{
                                                opacity: 1,
                                                color: 'grey3',
                                                fontSize: '16px',
                                                fontWeight: '400'
                                            }}
                                            placeholder="-"
                                            borderRadius="6px"
                                            pl="25px"
                                            w="87"
                                            h="60px"
                                            onKeyDown={(e) => handleOnKeyDown(e, index)}
                                            value={pin[index]}
                                            onChange={handleOnChange}
                                        />
                                        {index === pin.length - 1 ? null : (
                                            <Box as="span" w="16px" />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </HStack>
                        {!!error && (
                            <Text color="#F87171" fontSize="11px" fontWeight="400">
                                {error}
                            </Text>
                        )}
                    </GridItem>
                </FormDetails>
            </Flex>
        </>
    );
};

export default VerifyCode;
