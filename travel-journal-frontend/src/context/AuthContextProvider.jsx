import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import Cookies from "universal-cookie";
import { checkAuth } from "@/data";
import { AuthContext } from "./AuthContext";

// this could be used instead of the checkSession state
// const cookies = new Cookies();
// const checkCookie = cookies.get("checkCookie");

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [checkSession, setCheckSession] = useState(true);

  // will be used as a toggle effect
  useEffect(() => {
    console.log("checkSession called");
    
    const checkToken = async () => {
      await checkAuth()
        .then((user) => {
          setUser(user);
          setAuth(true);
        })
        .catch(() => {
          setAuth(false);
          setUser(null);
        }).finally(() => {
          setCheckSession(false);
        });
    };
    checkToken();
  }, [checkSession]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, user, setUser, setCheckSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContextProvider };
