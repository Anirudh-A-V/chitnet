"use client"
import React, { Fragment, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, Transition } from '@headlessui/react';
import { useCreateChitfund } from '@/utils/queryHooks';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { handleSendTransaction } from '@/utils/functions';

const CreateChitfund = ({ openModel, setOpenModel }) => {
    const queryClient = useQueryClient();
    const { handleSubmit, control } = useForm();
    const [details, setDetails] = useState({
        chitAmount: 0,
        maxSubscribers: 0,
        monthlyAmount: 0,
        startDate: new Date(),
        duration: 0,
    });

    const { mutate: createChitfundMutation } = useCreateChitfund(
        (res) => {
            console.log('Creation successful:', res);
            queryClient.invalidateQueries({ queryKey: ["Available Chitfunds"] });
            queryClient.invalidateQueries({ queryKey: ["Joined Chitfunds"] });
            toast.success('Chitfund created successfully');
        },
        (err) => {
            console.error('Creation failed:', err);
            toast.error('Failed to create chitfund');
        }
    );

    const onSubmit = async (data) => {
        //2023-12-14T19:49
        console.log(data)
        const dataForCreate = {
            chitAmount: data.chitAmount,
            maxSubscribers: data.maxSubscribers,
            monthlyAmount: data.monthlyAmount,
            startDate: data.startDate,
            duration: data.duration,
        };
        console.log("Data for Create : ", dataForCreate)
        // handleSendTransaction();
        createChitfundMutation({ ...dataForCreate });
        setOpenModel(false);
    };


    return (
        <Transition appear show={openModel} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setOpenModel(false)}>
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
                            <Dialog.Panel className="w-full max-w-lg max-h-[600px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <form onSubmit={handleSubmit(onSubmit)} className='relative w-full h-full overflow-hidden'>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Create Chitfund
                                    </Dialog.Title>
                                    <div className="flex flex-col mt-2 justify-center items-start gap-6 mb-20 scrollbar">
                                        <p className="text-sm my-1 text-gray-500">
                                            <span className="font-semibold">Chit Amount: </span>
                                            <div className="ml-4 mt-2 flex flex-col gap-2">
                                                <div className='flex gap-1 items-center'>
                                                    <Controller
                                                        name={`chitAmount`}
                                                        control={control}
                                                        defaultValue={details?.chitAmount}
                                                        render={({ field }) => (
                                                            <input
                                                                type="number"
                                                                {...field}
                                                                placeholder={details?.chitAmount}
                                                                className="border rounded px-2 py-1"
                                                                onChange={(e) => {
                                                                    setDetails({ ...details, chitAmount: e.target.value })
                                                                    field.onChange(e)
                                                                }}
                                                            />
                                                        )}

                                                    />
                                                </div>
                                            </div>
                                        </p>
                                        <p className="text-sm my-1 text-gray-500">
                                            <span className="font-semibold">Maximum Subscribers : </span>
                                            <div className="ml-4 mt-2 flex flex-col gap-2">
                                                <div className='flex gap-1 items-center'>
                                                    <Controller
                                                        name={`maxSubscribers`}
                                                        control={control}
                                                        defaultValue={details?.maxSubscribers}
                                                        render={({ field }) => (
                                                            <input
                                                                type="number"
                                                                {...field}
                                                                placeholder={details?.maxSubscribers}
                                                                className="border rounded px-2 py-1"
                                                                onChange={(e) => {
                                                                    setDetails({ ...details, maxSubscribers: e.target.value })
                                                                    field.onChange(e)
                                                                }}
                                                            />
                                                        )}

                                                    />
                                                </div>
                                            </div>
                                        </p>
                                        <p className="text-sm my-1 text-gray-500">
                                            <span className="font-semibold">Monthly Chit Amount : </span>
                                            <div className="ml-4 mt-2 flex flex-col gap-2">
                                                <div className='flex gap-1 items-center'>
                                                    <Controller
                                                        name={`monthlyAmount`}
                                                        control={control}
                                                        defaultValue={details?.monthlyAmount}
                                                        render={({ field }) => (
                                                            <input
                                                                type="number"
                                                                {...field}
                                                                placeholder={details?.monthlyAmount}
                                                                className="border rounded px-2 py-1"
                                                                onChange={(e) => {
                                                                    setDetails({ ...details, monthlyAmount: e.target.value })
                                                                    field.onChange(e)
                                                                }}
                                                            />
                                                        )}

                                                    />
                                                </div>
                                            </div>
                                        </p>
                                        <p className="text-sm my-1 text-gray-500">
                                            <span className="font-semibold">Start Date : </span>
                                            <div className="ml-4 mt-2 flex flex-col gap-2">
                                                <div className='flex gap-1 items-center'>
                                                    <Controller
                                                        name={`startDate`}
                                                        control={control}
                                                        defaultValue={new Date()}
                                                        render={({ field }) => (
                                                            <input
                                                                {...field}
                                                                type="date"
                                                                className="border rounded px-2 py-1 w-full"
                                                                value={field.value}
                                                                onChange={(date) => field.onChange(date)}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </p>
                                        <p className="text-sm my-1 text-gray-500">
                                            <span className="font-semibold">Duration (in Months) : </span>
                                            <div className="ml-4 mt-2 flex flex-col gap-2">
                                                <div className='flex gap-1 items-center'>
                                                    <Controller
                                                        name={`duration`}
                                                        control={control}
                                                        defaultValue={details?.duration}
                                                        render={({ field }) => (
                                                            <input
                                                                type="number"
                                                                {...field}
                                                                placeholder={details?.duration}
                                                                className="border rounded px-2 py-1"
                                                                onChange={(e) => {
                                                                    setDetails({ ...details, duration: e.target.value })
                                                                    field.onChange(e)
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </p>
                                        {/* <div className="text-sm my-1 max-h-56 text-gray-500 flex flex-col items-start justify-center w-full gap-4 scrollbar">
                                            <span className="font-semibold">Past Services: </span>
                                            <div className='w-full overflow-auto scrollbar'>
                                                <div className="flex flex-col justify-center items-start w-[95%] ">
                                                    {details?.pastServices?.map((service, index) => (
                                                        <div key={index} className={`w-full text-sm py-2 flex justify-between items-start ${index !== pastServices.length - 1 ? "border-b border-gray-200" : ""}`}>
                                                            {service.name}
                                                            <div className='flex text-xs flex-col gap-[1px] justify-center items-start'>
                                                                <p>{service.date}</p>
                                                                <p>{service.location}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                {addService && (
                                                    <div className={`w-[95%] flex flex-col gap-2 justify-center items-start ${details?.pastServices?.length > 0 ? "border-t-2 border-gray-300" : ""} pt-4`}>
                                                        <Controller
                                                            name={`pastServices[${details?.pastServices?.length}].name`}
                                                            control={control}
                                                            defaultValue=""
                                                            render={({ field }) => (
                                                                <select
                                                                    {...field}
                                                                    className="border rounded px-2 py-1 w-full"
                                                                >
                                                                    <option value="" disabled>Select Service Type</option>
                                                                    {serviceTypes.map((type, index) => (
                                                                        <option key={index} value={type}>{type}</option>
                                                                    ))}
                                                                </select>
                                                            )}
                                                        />
                                                        <Controller
                                                            name={`startDate`}
                                                            control={control}
                                                            defaultValue={new Date()}
                                                            render={({ field }) => (
                                                                <input
                                                                    {...field}
                                                                    type="date"
                                                                    className="border rounded px-2 py-1 w-full"
                                                                    value={field.value}
                                                                    onChange={(date) => field.onChange(date)}
                                                                />
                                                            )}
                                                        />
                                                        <Controller
                                                            name={`pastServices[${details?.pastServices?.length}].location`}
                                                            control={control}
                                                            defaultValue=""
                                                            render={({ field }) => (
                                                                <input
                                                                    {...field}
                                                                    placeholder="Location"
                                                                    className="border rounded px-2 py-1 w-full"
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                )}
                                                <div className='flex justify-center items-center w-full mt-4'>
                                                    <button className='border border-gray-200 px-4 rounded-lg py-2 w-fit '
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setAddService(!addService)
                                                        }}
                                                    >
                                                        Add Service
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                        <p className="text-sm my-1 text-gray-500">
                                            <span className="font-semibold">Payment Date: </span>
                                            <Controller
                                                name="paymentDate"
                                                control={control}
                                                defaultValue={details?.paymentDate}
                                                render={({ field }) => (
                                                    <input
                                                        type="datetime-local"
                                                        {...field}
                                                        placeholder={details?.paymentDate}
                                                        className="border rounded px-2 py-1"
                                                    />
                                                )}
                                            />
                                        </p> */}
                                    </div>

                                    <div className="mt-4 flex justify-between items-center absolute bg-white bottom-0 w-full">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm my-1 font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        >
                                            Create
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm my-1 font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            onClick={() => setOpenModel(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default CreateChitfund