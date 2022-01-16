export const Actions = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
  USER_UPDATE: "USER_UPDATE",
};

export const loginRequest = () => ({
  type: Actions.LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: Actions.LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = () => ({
  type: Actions.LOGIN_FAILURE,
});

export const logout = () => ({
  type: Actions.LOGOUT,
});

export const userUpdate = (user) => ({
  type: Actions.USER_UPDATE,
  payload: user,
});
