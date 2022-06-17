import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { categoryReducer } from "./categoryReducer";
import { msgReducer } from "./msgReducer";
import {teamReducer} from "./teamReducer"
import {playerReducer} from "@/store/reducers/playerReducer";
import {staffReducer} from "@/store/reducers/staffReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  msg: msgReducer,
  staff: staffReducer,
  player: playerReducer,
  team: teamReducer,
  category: categoryReducer
});

export default rootReducer;
