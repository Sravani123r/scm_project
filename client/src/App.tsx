// App.tsx
import { Route, Routes } from 'react-router-dom';

import Header from './components/Navbar/Header';
import Home from './components/Navbar/Home';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

import Sidebar from './components/Sidebar';
import { useAuth } from './context/AuthContext';

import AddContact from './pages/contact/ContactForm';
import { ContactPage } from './pages/contact/ContactPage';
import { Favorites } from './pages/contact/Favorites';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/profile/Profile';

import OAuthSuccess from './pages/auth/OAuthSuccess';
import { AppRoutes } from './routes/AppRoutes';
import ProtectedRoute from './routes/Route';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      {isAuthenticated && <Sidebar />}

      <div className={`px-5 pt-16 ${isAuthenticated ? 'sm:pl-64 pt-5' : ''}`}>
        <Routes>
          <Route path={AppRoutes.HOME} element={<Home />} />
          <Route path={AppRoutes.LOGIN} element={<Login />} />
          <Route path={AppRoutes.REGISTER} element={<Signup />} />
          <Route path={AppRoutes.OAUTH_SUCCESS} element={<OAuthSuccess />} />
          <Route
            path={AppRoutes.DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.CONTACTS}
            element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.ADD_CONTACT}
            element={
              <ProtectedRoute>
                <AddContact />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.FAVORITES}
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.PROFILE}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path={AppRoutes.NOT_FOUND} element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
