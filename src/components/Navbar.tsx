import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { loggedIn, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-stone-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-semibold text-white">
          <NavLink to="/">Anabolix</NavLink>
        </div>
        <ul className="flex space-x-4 font-semibold">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white transition-colors hover:text-stone-400 ${isActive ? "text-yellow-500" : ""}`
              }
              end
            >
              Home
            </NavLink>
          </li>
          {loggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="text-white transition-colors hover:text-stone-400"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-white transition-colors hover:text-stone-400 ${isActive ? "text-yellow-500" : ""}`
                }
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
