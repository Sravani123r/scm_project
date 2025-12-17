import { NavLink } from 'react-router-dom';
import userImage from '../assets/user.jpg';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800 border-r">
      <div className="h-full pt-16 px-3 py-4 overflow-y-auto">
        <div className="flex flex-col items-center mb-8">
          <img src={userImage} className="h-24 w-24 rounded-full shadow-md object-cover" alt="Profile" />
          <span className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{user?.name || 'User Name'}</span>
          <span className="text-lg font-semibold dark:text-white">Welcome to SCM</span>
        </div>

        {/* Menu items */}
        <ul className="space-y-2 text-sm font-medium">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <i className="fa-solid fa-gauge w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <i className="fa-regular fa-user w-5 h-5 mr-3" />
              <span>Profile</span>
            </NavLink>
          </li>

          <li>
            <div className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
              <i className="fa-regular fa-address-book w-5 h-5 mr-3" />
              <span>Contacts</span>
              <i className="fa-solid fa-chevron-down ml-auto text-xs" />
            </div>
            <ul className="ml-4 mt-1 space-y-1">
              <li>
                <NavLink
                  to="/contacts/add"
                  className={({ isActive }) =>
                    `flex items-center p-2 text-sm rounded-lg ${
                      isActive
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <i className="fa-solid fa-plus w-4 h-4 mr-3" />
                  <span>Add Contact</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contacts"
                  className={({ isActive }) =>
                    `flex items-center p-2 text-sm rounded-lg ${
                      isActive
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <i className="fa-regular fa-address-book w-4 h-4 mr-3" />
                  <span>View Contacts</span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <i className="fa-regular fa-heart w-5 h-5 mr-3" />
              <span>Favorites</span>
            </NavLink>
          </li>

          <li>
            <button
              type="button"
              className="w-full flex items-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <i className="fa-solid fa-circle-half-stroke w-5 h-5 mr-3" />
              <span>Dark / Light</span>
            </button>
          </li>

          <li>
            <NavLink
              to="/feedback"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <i className="fa-solid fa-pen w-5 h-5 mr-3" />
              <span>Feedback</span>
            </NavLink>
          </li>

          <li>
            <button
              type="button"
              onClick={logout}
              className="w-full flex items-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <i className="fa-solid fa-arrow-right-from-bracket w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
