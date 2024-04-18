import { useAuth } from '@/context/authContext';
import Cookies from 'js-cookie';
import React from 'react'

const CreateAccount = () => {
  const { login, invalidCredentials, loading } = useAuth();

  const createAccount = () => {
    login("admin@gmail.com", "123456")
    Cookies.set("firstTime", "false")
  }

  return (
    <div className='flex min-h-screen max-h-screen overflow-hidden bg-main-dark-bg'>
      <div className='flex flex-1 flex-col justify-center items-center z-10'>
        <div className='flex flex-col justify-center items-center w-full'>
          <p className='text-[#7d7f81] text-4xl font-bold mt-10'>Create Account</p>
          <p className='text-[#ababac] text-base font-normal mt-2'>
            Enter your details to create account
          </p>
        </div>
        <div className='flex flex-col justify-center items-center w-1/3 mt-10'>
          <input
            type='text'
            placeholder='Enter your Name'
            className='w-full border border-primary-blue rounded-md px-4 py-2'
          />
          <input
            type='email'
            placeholder='Enter your email'
            className='w-full border border-primary-blue rounded-md px-4 py-2 mt-4'
          />
          <input
            type='text'
            placeholder='Enter your PAN'
            className='w-full border border-primary-blue rounded-md px-4 py-2 mt-4 mb-6'
          />
        </div>
        <button className='bg-primary-blue px-32 py-5 text-white font-bold rounded-md flex justify-center items-center' type='submit' onClick={createAccount}>
          {
            loading && !invalidCredentials ? <div className="custom-loader"></div> : "CREATE ACCOUNT"
          }
        </button>
      </div>
    </div>
  )
}

export default CreateAccount