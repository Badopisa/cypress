import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { msgReducer } from "./msgReducer";
import {teamReducer} from "./teamReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  msg: msgReducer,
  team: teamReducer,
});
export default rootReducer;