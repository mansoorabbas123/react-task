import React, { useReducer } from "react";
import { useContext } from "react";
import { GlobalContext } from "./globalContext";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem("token")) ? true : false,
  user: null,
  token: JSON.parse(localStorage.getItem("token"))
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  role: JSON.parse(localStorage.getItem("role"))
    ? JSON.parse(localStorage.getItem("role"))
    : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("role", JSON.stringify(action.payload.role));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user_id,
        role: action.payload.role,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = `/admin/login`;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { dispatch: snackbarDispatch } = useContext(GlobalContext);
  React.useEffect(() => {
    //TODO
    if (state.isAuthenticated) {
      sdk
        .check(state?.role)
        .then((checkToken) => {
          if (checkToken.error) {
            tokenExpireError(dispatch, "TOKEN_EXPIRED");
            snackbarDispatch({
              type: "SNACKBAR",
              payload: { message: "session expired" },
            });
          }
        })
        .then((error) => console.log("error", error));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
