import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { access, logger } from "./middleware";
import authReducer from "./redux/auth/auth.reducer";

const rootReducer = combineReducers({
  user: authReducer
});
const middleware = [access, thunk, logger];
const composeEnhanchers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "development"
    ? composeEnhanchers(applyMiddleware(...middleware))
    : compose(applyMiddleware(...middleware))
);

export default store;