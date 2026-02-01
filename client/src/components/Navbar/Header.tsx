import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';

import { CiLight } from 'react-icons/ci';
import { MdDarkMode } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import image from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <Navbar maxWidth="xl" isBordered className="fixed top-0 z-50 bg-white dark:bg-gray-900">
      {/* LEFT */}
      <NavbarBrand>
        <Link to="/" className="flex items-center gap-2">
          <img src={image} className="h-8 w-8 rounded-full shadow" alt="SCM Logo" />
          <span className="text-xl font-semibold text-gray-900 dark:text-white">SCM 2.0</span>
        </Link>
      </NavbarBrand>

      {/* RIGHT */}
      <NavbarContent justify="end" className="gap-2">
        {/* BEFORE LOGIN */}
        {!isAuthenticated && (
          <>
            <NavbarItem>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'font-semibold text-blue-600' : '')}>
                <Button size="sm" variant="flat">
                  Login
                </Button>
              </NavLink>
            </NavbarItem>

            <NavbarItem>
              <NavLink to="/register">
                <Button size="sm" color="primary">
                  Signup
                </Button>
              </NavLink>
            </NavbarItem>
          </>
        )}

        {/* AFTER LOGIN */}
        {isAuthenticated && (
          <>
            <NavbarItem>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'font-semibold text-blue-600' : '')}>
                Dashboard
              </NavLink>
            </NavbarItem>

            <NavbarItem>
              <NavLink to="/contacts" className={({ isActive }) => (isActive ? 'font-semibold text-blue-600' : '')}>
                Contacts
              </NavLink>
            </NavbarItem>

            <NavbarItem>
              <Button size="sm" variant="flat">
                {user?.name || 'User'}
              </Button>
            </NavbarItem>

            <NavbarItem>
              <Button size="sm" color="danger" onPress={logout}>
                Logout
              </Button>
            </NavbarItem>
          </>
        )}

        {/* THEME TOGGLE */}
        <NavbarItem>
          <Button size="sm" variant="bordered" isIconOnly onPress={toggleTheme}>
            {theme === 'dark' ? <CiLight size={18} /> : <MdDarkMode size={18} />}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
