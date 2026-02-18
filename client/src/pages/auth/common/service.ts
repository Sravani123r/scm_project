import { signal } from '@preact/signals-react';
import api from '../../../lib/axios';
import { AuthResponse, LoginType, SignUpType } from './types';

export const authLoading = signal(false);
export const authError = signal<string | null>(null);
export const loginUser = async (data: LoginType): Promise<AuthResponse> => {
  authLoading.value = true;
  authError.value = null;

  try {
    const res = await api.post<AuthResponse>('/auth/login', data);
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    return res.data;
  } catch (err: any) {
    authError.value = err?.response?.data?.message || 'Login failed';
    throw err;
  } finally {
    authLoading.value = false;
  }
};

export const signupUser = async (data: SignUpType) => {
  authLoading.value = true;
  authError.value = null;

  try {
    await api.post('/auth/register', data);
  } catch (err: any) {
    authError.value = err?.response?.data?.message || 'Signup failed';
    throw err;
  } finally {
    authLoading.value = false;
  }
};

export const googleLogin = () => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  if (!API_BASE_URL) {
    console.error('Backend URL not configured!');
    return;
  }

  window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
};


export const logoutUser = () => {
  localStorage.clear();
};
