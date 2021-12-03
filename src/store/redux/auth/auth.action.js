import * as AUTH_ACTION_TYPE from "./auth.action.type";

export const userLogin = (data, dispatch) => {
  dispatch({
    type: AUTH_ACTION_TYPE.USER_LOGIN,
    payload: { data },
  });
  return Promise.resolve();
};

export const userLogout = (dispatch) => {
  dispatch({
    type: AUTH_ACTION_TYPE.USER_LOGOUT,
  });
  return Promise.resolve();
};
