import { Button, Input } from '@heroui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Login failed');
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      login(result.token, result.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>

        {error && <p className="text-red-600 bg-red-100 p-2 rounded text-center">{error}</p>}

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

          <Button color="primary" type="submit" className="w-full">
            Login
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
