const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const SET_REG_ERROR = "SET_REG_ERROR";
const SET_AUTH_ERROR = "SET_AUTH_ERROR";
const SET_ERROR_S1 = "SET_ERROR_S1";
const SET_ERROR_S2 = "SET_ERROR_S2";

const defaultState = {
  currentUser: {},
  isAuth: false,
  regErrors: "",
  isER: false,
  authErrors: "",
  isEA: false,
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
        authErrors: [],
      };

    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        currentUser: {},
        isAuth: false,
      };

    case SET_REG_ERROR:
      return {
        ...state,
        regErrors: action.payload,
        isER: true,
      };

    case SET_AUTH_ERROR:
      return {
        ...state,
        authErrors: action.payload,
        isEA: true,
      };

    case SET_ERROR_S1:
      return {
        ...state,
        regErrors: "",
        isER: false,
      };

    case SET_ERROR_S2:
      return {
        ...state,
        authErrors: "",
        isEA: false,
      };

    default:
      return state;
  }
}

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const logOut = () => ({ type: LOG_OUT });
export const setRegError = (error) => ({
  type: SET_REG_ERROR,
  payload: error,
});
export const setAuthError = (error) => ({
  type: SET_AUTH_ERROR,
  payload: error,
});
export const setErrorS1 = () => ({ type: SET_ERROR_S1 });
export const setErrorS2 = () => ({ type: SET_ERROR_S2 });
