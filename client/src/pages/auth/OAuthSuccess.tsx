import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

 const accessToken = params.get('accessToken');
const refreshToken = params.get('refreshToken');
const userParam = params.get('user');

if (accessToken && refreshToken && userParam) {
  const user = JSON.parse(decodeURIComponent(userParam));
  login(accessToken, refreshToken, user);
  navigate('/dashboard');
}
else {
      navigate('/login');
    }
  }, [login, navigate]);

  return <p className="text-center mt-20">Signing you in with Google...</p>;
};

export default OAuthSuccess;
