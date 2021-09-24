import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cardReducer";
import ordersReducer from "./ordersReducer";
import themeReducer from "./themeReducer";

let reducers = combineReducers({
  cartReducer: cartReducer,
  themeReducer: themeReducer,
  ordersReducer: ordersReducer,
  authReducer: authReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
