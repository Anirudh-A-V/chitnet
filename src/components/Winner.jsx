import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ConfettiExplosion from 'react-confetti-explosion'
import Image from 'next/image'

const Winner = ({ winner, setWinner, id = "0x02180dD815cA64898F6126f3911515B06D17acaD" }) => {

    function closeModal() {
        setWinner(false)
    }

    return (
        <>
            {/* <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div> */}

            
            <Transition appear show={winner} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-medium leading-6 text-gray-900"
                                    >
                                        CONGRATULATIONS
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className='flex justify-center items-center'>
                                        <img src='/trophy.jpg' width={300} height={300} alt='trophy' />
                                        </div>
                                        <p className="text-base text-gray-500 text-wrap">
                                            {`Your are the Winner of the Chitfund ${id} this month`}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => {
                                                closeModal()
                                            }}
                                        >Hurray!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {winner &&
                <div
                    className='min-h-screen w-full fixed inset-0 flex items-center justify-center z-50'
                >
                    <ConfettiExplosion force={0.8} duration={3000} particleCount={250} width={1600} />
                </div>
            }
        </>
    )
}

export default Winner