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

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      {isAuthenticated && <Sidebar />}

      <div className={`px-5 ${isAuthenticated ? 'sm:pl-64 pt-5' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
