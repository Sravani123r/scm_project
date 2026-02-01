import { Button, Form, Input, Textarea } from '@heroui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authError, authLoading, googleLogin, signupUser } from './common/service';
import type { SignUpType } from './common/types';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<SignUpType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      email: '',
      userName: '',
      password: '',
      contactNumber: '',
      about: ''
    }
  });

  const onSubmit = async (data: SignUpType) => {
    try {
      await signupUser(data);
      reset();
      navigate('/login');
    } catch {
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 pt-3 px-10 flex justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white-900">Create your account</h2>
          <p className="text-sm text-gray-500 mt-1">Start managing your contacts on cloud</p>
          <p className="mt-2 text-sm text-gray-400 dark:text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 dark:text-blue-300 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {authError.value && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
            {authError.value}
          </div>
        )}

        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="User Name"
            variant="bordered"
            placeholder="Enter your name"
            isInvalid={!!errors.userName}
            errorMessage={errors.userName?.message}
            isRequired
            {...register('userName', {
              required: 'User name is required',
              minLength: { value: 3, message: 'Minimum 3 characters' },
              maxLength: { value: 20, message: 'Maximum 20 characters' }
            })}
          />

          <Input
            label="Email"
            type="email"
            variant="bordered"
            placeholder="Enter your email"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            isRequired
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email'
              }
            })}
          />

          <Input
            label="Password"
            type="password"
            variant="bordered"
            placeholder="Create a password"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            isRequired
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Min 8 characters' },
              maxLength: { value: 20, message: 'Max 20 characters' }
            })}
          />

          <Input
            label="Phone"
            type="tel"
            variant="bordered"
            placeholder="Enter phone number"
            isInvalid={!!errors.contactNumber}
            errorMessage={errors.contactNumber?.message}
            {...register('contactNumber', {
              minLength: { value: 10, message: 'Min 10 digits' },
              maxLength: { value: 15, message: 'Max 15 digits' }
            })}
          />

          <Textarea
            label="About"
            variant="bordered"
            placeholder="Tell us about yourself"
            isInvalid={!!errors.about}
            errorMessage={errors.about?.message}
            {...register('about', {
              minLength: { value: 10, message: 'Min 10 characters' },
              maxLength: { value: 100, message: 'Max 100 characters' }
            })}
          />

          <div className="flex gap-3 pt-2">
            <Button type="submit" color="primary" className="flex-1" isLoading={authLoading.value || isSubmitting}>
              Create Account
            </Button>

            <Button type="button" variant="bordered" className="flex-1" onPress={handleReset}>
              Reset
            </Button>
          </div>

          <div className="flex items-center gap-2 py-2">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <Button
            type="button"
            variant="bordered"
            className="w-full flex items-center justify-center gap-2"
            onPress={googleLogin}
          >
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
            Sign up with Google
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
