import { MsgDataType } from '@/types/MsgDataType';
import * as actionTypes from './actionTypes';

export const updateAlertMsg = (toast: any, message: MsgDataType, position = 'top') => {
    toast({
        description: message.message,
        status: message.type,
        position: position,
        duration: 3000,
        isClosable: true
    });
};

export const updateIsLoading = (data: boolean) => {
    return {
        type: actionTypes.UPDATE_LOADING_STATE,

        payload: data
    };
};

export const updateMessage = (data: string) => {
    return {
        type: actionTypes.UPDATE_MESSAGE_STATE,

        payload: data
    };
};
