import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { categoryReducer } from "./categoryReducer";
import { msgReducer } from "./msgReducer";
import {teamReducer} from "./teamReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  msg: msgReducer,
  team: teamReducer,
  category: categoryReducer
});

export default rootReducer;