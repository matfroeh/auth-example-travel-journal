import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/context";
import { toast } from "react-toastify";

const Navbar = () => {
  const { auth, setAuth, user, setUser, setCheckSession } = useAuth();

  const handleLogOut = () => {
    // this will be handled by deleting the cookie by the API
    setAuth(false);
    setUser(null);
    // setCheckSession(true); 

    toast.success("Successfully logged out!");
  };


  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Travel journal
          <span role="img" aria-labelledby="airplane">
            🛫
          </span>
          <span role="img" aria-labelledby="heart">
            ❤️
          </span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {auth ? (
            <>
              <li>
                <NavLink to="/create">Create post</NavLink>
              </li>
              <li>
                <NavLink to="/profile">{user?.email}</NavLink>
              </li>
              <li>
                <NavLink onClick={handleLogOut}>Logout</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
