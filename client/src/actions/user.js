import axios from "axios";
import { API_URL } from "../config";
import { setAuthError, setRegError, setUser } from "../reducers/userReducer";

export const registration = (email, password, name) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}api/auth/registration`, {
        email,
        password,
        name,
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      dispatch(setRegError(e.response.data.message));
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}api/auth/login`, {
        email,
        password,
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      dispatch(setAuthError(e.response.data.message));
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}api/auth/auth`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      localStorage.removeItem("token");
    }
  };
};
