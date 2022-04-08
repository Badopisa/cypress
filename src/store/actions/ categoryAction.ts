import { FetchCategories } from '@/services/categoryService';
import { CategoryDataType } from '@/types/CategoryDataType';
import * as Redux from 'redux';
import * as actionTypes from "./actionTypes"


type Dispatch = Redux.Dispatch<any>;

export const fetchCategories = () => {

    return async (dispatch:Dispatch) => {

      FetchCategories()

        .then(async (result) => {

            const {data} = result

            dispatch(saveCategoriesData(data.data))
          
        })
        
        .catch((err) => {

            console.log(err)
        });

    };

}

const saveCategoriesData = (data: CategoryDataType[]|null) => {

    return {
  
        type: actionTypes.SAVE_CATEGORY_DETAILS,
   
        payload: data
   
    }
}
