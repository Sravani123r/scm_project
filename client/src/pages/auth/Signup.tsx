// src/pages/auth/signup/Signup.tsx
import { Button, Input, Textarea } from '@heroui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

type SignUpForm = {
  email: string;
  userName: string;
  password: string;
  contactNumber: string;
  about: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [error, setError] = React.useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid }
  } = useForm<SignUpForm>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      userName: '',
      password: '',
      contactNumber: '',
      about: ''
    }
  });

  const onSubmit = async (data: SignUpForm) => {
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      navigate('/login');
      reset(); // clear form on success
    } catch (err) {
      const e = err as Error;
      setError(e.message || 'An error occurred during registration');
    }
  };

  const handleReset = () => {
    reset();
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-3 rounded-xl shadow-sm">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Create account</h2>
          <h3 className="text-sm text-gray-400">Start managing contacts on cloud</h3>
          <p className="mt-1 text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg flex items-start mb-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Input
              label="User Name"
              type="text"
              variant="bordered"
              placeholder="Enter user name"
              className="p-2 font-bold"
              isInvalid={!!errors.userName}
              errorMessage={errors.userName?.message}
              isRequired
              {...register('userName', {
                required: 'User name is required',
                minLength: { value: 3, message: 'User name must be at least 3 characters long' },
                maxLength: { value: 20, message: 'User name must be at most 20 characters long' }
              })}
            />

            <Input
              label="Email"
              type="email"
              variant="bordered"
              placeholder="Enter email"
              className="p-2 font-bold"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              isRequired
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address'
                }
              })}
            />

            <Input
              label="Password"
              type="password"
              variant="bordered"
              placeholder="Create a password"
              className="p-2 font-bold"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              isRequired
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                maxLength: { value: 20, message: 'Password must be at most 20 characters long' }
              })}
            />

            <Input
              label="Phone"
              type="tel"
              variant="bordered"
              placeholder="Enter phone number"
              className="p-2 font-bold"
              isInvalid={!!errors.contactNumber}
              errorMessage={errors.contactNumber?.message}
              {...register('contactNumber', {
                minLength: { value: 10, message: 'Contact number must be at least 10 digits long' },
                maxLength: { value: 15, message: 'Contact number must be at most 15 digits long' }
              })}
            />

            <Textarea
              label="About"
              variant="bordered"
              placeholder="Tell us about yourself..."
              className="p-2 font-bold"
              isInvalid={!!errors.about}
              errorMessage={errors.about?.message}
              {...register('about', {
                minLength: { value: 10, message: 'About must be at least 10 characters long' },
                maxLength: { value: 100, message: 'About must be at most 100 characters long' }
              })}
            />
          </div>

          <div className="pl-2 flex gap-2">
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="flex flex-wrap gap-4 items-center bg-primary"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-1.5 h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create account'
              )}
            </Button>

            <Button color="default" variant="bordered" type="button" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
