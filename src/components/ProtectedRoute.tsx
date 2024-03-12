import { ProtectedRouteProps } from '../interfaces/Interfaces';
import { Navigate, Outlet } from 'react-router-dom';
import { NavBar } from './ui';
import React from 'react';
import { useAuth } from '../Auth/AuthContext';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAllowed, children, redirectTo = "/" }) => {
  const { user } = useAuth()
  const empresa = user ? user.empresa : '';

  if (!isAllowed) {
    return <Navigate to={redirectTo} />
  }

  return (
    <>
      <section className='w-full'>
        <NavBar />
      </section>
      <section className='h-[92vh] overflow-auto'>
        {children ? children : <Outlet />}
      </section>

      <div className="text-black absolute bottom-0 p-2">
        <p className="font-semibold">Database: 
          <span className="text-red-500"> {empresa} </span>
        </p>
      </div>
    </>
  )
}