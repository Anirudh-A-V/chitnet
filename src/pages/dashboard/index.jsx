import { Fragment } from 'react';
import withAuth from '@/components/HOCs/withAuth';;
import { useAuth } from '@/context/authContext';
import Layout from '@/components/dashboard/Layout';
import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react'
import Head from 'next/head';
import JoinedChitfunds from '@/components/JoinedChitfunds';
import { useJoinedChitfunds } from '@/utils/queryHooks';


const Dashboard = () => {
  const { logout } = useAuth();

  const { isLoading: isLoadingJoined, isError: isErrorJoined, data: joinedChitfunds, error: errorJoinedChitfunds } = useJoinedChitfunds();
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout>
        <div className='flex flex-col justify-start w-full relative overflow-hidden bg-[#FFFFFF] min-h-screen h-full'>
          <div className='flex justify-between w-full p-5'>
            <h1 className='text-2xl font-bold text-[#252C32]'>Dashboard</h1>
            <div className='flex flex-row justify-center items-center gap-3 mr-2'>
              <button className='flex justify-center items-center'>
                <Image src='/Dashboard/Bell.svg' width={30} height={30} alt='plus' />
              </button>
              <Menu as="div" className="">
                <Menu.Button className="flex justify-center items-center">
                  <Image src='/Dashboard/User.svg' width={30} height={30} alt='plus' />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-5 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? 'bg-primary-blue text-white' : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            onClick={logout}
                          >
                            Log Out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

            </div>
          </div>
          <div className='w-full  border border-b-[#E5E9EB] border-t-0 border-x-0'></div>
          {/* <div className='flex flex-row justify-center items-center h-full'>
            <div className='flex flex-col justify-center items-center w-full'>
              <Image src='/Dashboard/Logo-bg.svg' width={300} height={300} alt='logo' />
              <p className='text-[#7d7f81] text-4xl font-bold mt-10'>Welcome to the dashboard</p>
              <p className='text-[#ababac] text-base font-normal mt-2'>
                Goto Users section and perform actions
              </p>
            </div>
          </div> */}
          <div className=' flex flex-col justify-start items-start p-10 w-full h-full'>

            <div className='flex flex-row justify-start gap-10 w-full'>
              <div className='flex flex-col justify-start relative p-6 min-w-[300px] h-[180px] items-start rounded-xl'
                style={{
                  background: 'linear-gradient(90deg, #3D59B9 0%, #2E4BAD 100%)'
                }}
              >
                <p className='text-white text-base font-medium '>balance</p>
                <p className='text-white text-5xl font-semibold'>₹ 30000</p>
                <button
                  className='absolute bottom-4 right-4 bg-white text-primary-blue px-4 py-1 rounded-md font-medium'
                >
                  Add Balance
                </button>
              </div>

              <div className='flex flex-col justify-start relative  p-6 min-w-[300px] h-[180px] items-start rounded-xl'
                style={{
                  background: 'linear-gradient(90deg, #E3E7F4 0%, #C6CFEB 100%)'
                }}
              >
                <p className='text-primary-blue text-base font-medium '>Chitfunds Joined</p>
                <p className='text-primary-blue text-5xl font-semibold'>2</p>
              </div>

              <div className='flex flex-col justify-start relative p-6 w-full h-[180px] items-start rounded-xl'
                style={{
                  background: 'linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 100%)'
                }}
              >
                <p className='text-primary-blue text-base font-medium '>Anirudh A V</p>
                <p className='text-primary-blue text-base font-semibold'>anirudh.av02@gmail.com</p>
                <p className='text-primary-blue text-base font-semibold'>BZPPV2628L</p>
              </div>
            </div>

            <div className='flex flex-col justify-start items-start w-screen mt-10'>
              <h1 className='text-2xl font-bold text-[#252C32]'>Joined Chitfunds</h1>
              <JoinedChitfunds loading={isLoadingJoined} chitfunds={joinedChitfunds} />
            </div>

          </div>

        </div>
      </Layout>
    </>
  );
};

export default withAuth(Dashboard)
