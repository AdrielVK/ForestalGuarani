import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import LoginFormSkeleton from '../../Components/Skeletons/AuthSkeleton';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { fetchUserByToken, fetchUserLoading, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserByToken();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (fetchUserLoading) {
    return (
      <main className='antialiased '>
        <LoginFormSkeleton />
      </main>
    );
  }

  return <main>{children}</main>;
}
