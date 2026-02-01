import { Button, Input } from '@heroui/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authError, authLoading, googleLogin, loginUser } from './common/service';
import type { LoginType } from './common/types';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState<LoginType>({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: LoginType) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      login(res.accessToken, res.refreshToken, res.user);

      navigate('/dashboard');
    } catch {
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl text-white-900 mt-2 font-bold text-center">Login to Your Account</h2>

        {authError.value && <p className="text-red-600 bg-red-100 p-2 rounded text-center">{authError.value}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="bordered"
            className="w-full"
            isRequired
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="bordered"
            className="w-full"
            isRequired
          />

          <Button color="primary" type="submit" className="w-full" isLoading={authLoading.value}>
            Login
          </Button>

          <Button
            type="button"
            variant="bordered"
            className="w-full flex items-center justify-center gap-2"
            onPress={googleLogin}
          >
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </Button>
        </form>

        <p className="text-center text-sm">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
