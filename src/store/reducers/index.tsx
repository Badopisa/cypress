import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { msgReducer } from "./msgReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  msg: msgReducer
});
export default rootReducer;