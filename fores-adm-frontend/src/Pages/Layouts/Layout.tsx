import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import SidebarMenu from '../../Components/Menu/Sidebar';
import MobileNavbar from '../../Components/Menu/Navbar';
import LayoutSkeleton from '../../Components/Skeletons/LayoutSkeleton';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { fetchUserByToken, fetchUserLoading, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserByToken();
  }, [fetchUserByToken]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (fetchUserLoading) {
    return (
      <LayoutSkeleton/>
    );
  }

  return(

    <main className='w-full antialiased'>
      <SidebarMenu/>
      <MobileNavbar/>
      <section className='mt-20 flex mx-4 box-content lg:mt-10 lg:ml-80 md:mx-12'>
        {children}

      </section>
    </main>
  ) 
}
