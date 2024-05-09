import React from 'react'
import Sidebar from './Sidebar'
import Winner from '../Winner';
import { useAuth } from '@/context/authContext';
import { useException } from '@/context/exceptionContext';
import ExceptionDialog from '../ExceptionDialog';

const Layout = ({ children }) => {
  const { winner, setWinner } = useAuth();
  const { exception, clearException } = useException();
  return (
    <div className='flex overflow-hidden'>
      <div className='w-60'>
        <Sidebar />
      </div>
      <div className='overflow-y-auto flex-1 min-h-screen'>
        {children}
      </div>
      <Winner winner={winner} setWinner={setWinner} />
      <ExceptionDialog isOpen={exception !== null} onClose={clearException} exception={exception} />
    </div>
  )
}

export default Layout