import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import { loginUser, registerUser } from "../services/auth-service";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem("token") || "",
  loading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case "AUTH_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, user: null, token: "", loading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.token) localStorage.setItem("token", state.token);
    else localStorage.removeItem("token");
  }, [state.token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          dispatch({ type: "LOGOUT" });
        } else {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user: decoded, token },
          });
        }
      } catch (err) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = useCallback(async (credentials) => {
    dispatch({ type: "START_LOADING" });
    try {
      const res = await loginUser(credentials);
      const { token } = res.data;
      const user = jwtDecode(token);
      dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });
      return { success: true };
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        payload:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Login failed",
      });
      return { success: false };
    }
  }, []);

  const register = useCallback(async (userData) => {
    dispatch({ type: "START_LOADING" });
    try {
      const res = await registerUser(userData);
      console.log("register success", res);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      return { success: true };
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        payload:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Registration failed",
      });
      return { success: false };
    }
  }, []);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
