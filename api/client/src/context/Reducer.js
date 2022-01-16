import { Actions } from "./Actions";

const Reducer = (state, action) => {
  switch (action.type) {
    case Actions.LOGIN_REQUEST:
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case Actions.LOGIN_SUCCESS:
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case Actions.LOGIN_FAILURE:
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case Actions.LOGOUT:
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    case Actions.USER_UPDATE:
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default Reducer;
