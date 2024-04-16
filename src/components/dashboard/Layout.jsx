import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div className='flex overflow-hidden'>
      <div className='w-60'>
        <Sidebar />
      </div>
      <div className='overflow-y-auto flex-1 min-h-screen'>
        {children}
      </div>
    </div>
  )
}

export default Layout