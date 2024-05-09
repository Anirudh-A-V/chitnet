// ExceptionDialog.js
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function ExceptionDialog({ isOpen, onClose, exception }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-white rounded-lg p-6 min-w-[512px] z-10">
              <Dialog.Title className="text-xl font-bold mb-4">Oops</Dialog.Title>
              <p className="text-red-500 text-lg font-medium">{exception}</p>
              <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md" onClick={onClose}>Close</button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
