import * as AUTH_ACTION_TYPE from "./auth.action.type";

const initialState = {
  auth: true,
  username: "",
};

const authReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case AUTH_ACTION_TYPE.USER_LOGIN:
      return {
        ...state,
        auth: true,
        username: payload.data.username,
      };
    case AUTH_ACTION_TYPE.USER_LOGOUT:
      return {
        auth: false,
        username: "",
      };

    default:
      return state;
  }
};

export default authReducer;