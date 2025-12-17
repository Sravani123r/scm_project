import { Button } from '@heroui/react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white border-b shadow-sm dark:bg-gray-900 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="./assets/image.png" className="h-8 w-8 rounded-full shadow" alt="SCM Logo" />
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">SCM 2.0</span>
        </Link>

        {/* RIGHT: menu */}
        <div className="flex items-center gap-3">
          {/* Contact link – always visible */}

          {/* BEFORE LOGIN */}
          {!isAuthenticated && (
            <>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `hidden sm:inline-block text-sm px-3 py-1.5 rounded ${
                    isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600'
                  }`
                }
              >
                Contact
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-sm px-3 py-1.5 rounded ${
                    isActive ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `text-sm px-3 py-1.5 rounded ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`
                }
              >
                Signup
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `hidden sm:inline-block text-sm px-3 py-1.5 rounded ${
                    isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600'
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  `hidden sm:inline-block text-sm px-3 py-1.5 rounded ${
                    isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600'
                  }`
                }
              >
                Contacts
              </NavLink>

              <Button size="sm" variant="flat" className="hidden sm:inline-flex">
                {user?.name || 'User'}
              </Button>

              <Button size="sm" color="danger" onPress={handleLogout} className="hidden sm:inline-flex">
                Logout
              </Button>
            </>
          )}

          {/* Dark/light toggle – just UI for now */}
          <Button size="sm" variant="bordered" className="flex items-center gap-1">
            <i className="fa-solid fa-circle-half-stroke" />
            <span className="text-xs">Light</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
