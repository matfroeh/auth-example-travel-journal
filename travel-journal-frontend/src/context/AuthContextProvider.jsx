import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import Cookies from "universal-cookie";
import { checkAuth } from "@/data";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

// const cookies = new Cookies();
// const checkCookie = cookies.get("checkCookie");

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [checkSession, setCheckSession] = useState(true);

  console.log("CheckSession:", checkSession);

  useEffect(() => {
    // if (!checkSession) {
    //   // API call to remove cookie
    //   // setAuth(false);
    //   // setUser(null);
    //   return
    // }
    const checkToken = async () => {
      console.log("Checking token called");
      
      await checkAuth()
        .then((user) => {
          setUser(user);
          setAuth(true);
          toast.success(`Welcome back, ${user.firstName}!`);
        })
        .catch((err) => {
          toast.error(err.message);
          setAuth(false);
          setUser(null);
        });
    };
    checkToken();
  }, [checkSession]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser, setCheckSession }}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContextProvider };
