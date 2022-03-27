import * as Redux from 'redux';
import { AdminRegFormData, UserDataType } from "@/types/AuthDataType";
import {clubAdminRegistration} from "@/services/clubAdminService"
import * as actionTypes from "./actionTypes"
import { updateAlertMsg, updateIsLoading } from './msgAction';
import { saveAccessToken } from '@/utils/locaStorageActions';


type Dispatch = Redux.Dispatch<any>;

export const adminRegistration = (payload: AdminRegFormData, toast: any, router: any) => {

    return async (dispatch:Dispatch) => {

      dispatch(updateIsLoading(true))

      clubAdminRegistration(payload)

        .then(async (result) => {

            const {data} = result

            dispatch(saveAdminData(data.data.user))

            updateAlertMsg(toast, {type: "success", message:"Congratulations, Account successfully created"})

            saveAccessToken(data.data.auth_token)

            dispatch(updateIsLoading(false))

            router.push('/admin/subscription')
          
        })
        
        .catch((err) => {

            updateAlertMsg(toast, {type: "error", message: err.response.data.message})

            dispatch(updateIsLoading(false))

        });

    };

}

const saveAdminData = (data: UserDataType) => {

    return {
  
        type: actionTypes.SAVE_USER_DETAILS,
   
        payload: data
   
    }
}
