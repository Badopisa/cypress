import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { categoryReducer } from "./categoryReducer";
import { msgReducer } from "./msgReducer";
import {teamReducer} from "./teamReducer"
import {playerReducer} from "@/store/reducers/playerReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  msg: msgReducer,
  player: playerReducer,
  team: teamReducer,
  category: categoryReducer
});

export default rootReducer;
