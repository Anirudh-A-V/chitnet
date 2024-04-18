import React from 'react'
import Sidebar from './Sidebar'
import Winner from '../Winner';
import { useAuth } from '@/context/authContext';

const Layout = ({ children }) => {
  const { winner, setWinner } = useAuth();
  return (
    <div className='flex overflow-hidden'>
      <div className='w-60'>
        <Sidebar />
      </div>
      <div className='overflow-y-auto flex-1 min-h-screen'>
        {children}
      </div>
      <Winner winner={winner} setWinner={setWinner} />
    </div>
  )
}

export default Layout