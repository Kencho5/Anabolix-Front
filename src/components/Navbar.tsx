import { Link } from "preact-router/match";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { loggedIn, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-stone-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">
          <Link href="/" className="hover:text-stone-400 transition-colors">
            Anabolix
          </Link>
        </div>
        <ul className="flex space-x-4 font-semibold">
          <li>
            <Link
              href="/"
              activeClassName="text-yellow-500"
              className="text-white hover:text-stone-400 transition-colors"
            >
              Home
            </Link>
          </li>
          {loggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-stone-400 transition-colors"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                href="/login"
                activeClassName="text-yellow-500"
                className="text-white hover:text-stone-400 transition-colors"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
