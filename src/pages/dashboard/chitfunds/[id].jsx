import Auction from '@/components/Auction';
import Bidder from '@/components/Bidder';
import Countdown from '@/components/Countdown';
import Layout from '@/components/dashboard/Layout';
import Loading from '@/components/Loading';
import ManageProxy from '@/components/ManageProxy';
import { useException } from '@/context/exceptionContext';
import { useGetChitfund, usePayChitAmount } from '@/utils/queryHooks';
import Cookies from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/router'
import React from 'react'
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const ChitFund = () => {
    const queryClient = useQueryClient();
    const router = useRouter()
    const { setException } = useException();

    const { id } = router.query;
    const { data: chitfund, isLoading, isError, error } = useGetChitfund(id);

    if (isError) {
        // temperory fix
        console.log("Chitfund error : ", error);
        return null;
    }

    const handleSuccess = (data) => {
        console.log("Response for paying to chitfund : ", data);
        queryClient.invalidateQueries({ queryKey: [`Chitfund ${id}`] });
        toast.success('Paid Successfully');
    };

    const handleError = (data) => {
        console.log("Response for paying to chitfund : ", data);
        toast.error("Failed to pay");
        setException(data.message);
    };

    const { mutate, isLoading: isPaying } = usePayChitAmount(handleSuccess, handleError);

    return (
        <>
            <Head>
                <title>Chitfund</title>
            </Head>
            <Layout>
                <div>
                    <div className="flex px-7 py-4 gap-4">
                        <button onClick={() => router.back()} className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>

                        </button>
                        <h3 className="text-2xl font-semibold">Chitfund Details</h3>
                    </div>
                </div>
                <div className="h-0.5 w-full bg-slate-200"></div>
                {
                    isLoading ? <Loading /> :
                        (
                            <>
                                <div className="px-7 py-5 w-full">
                                    <div className="flex w-fit transition-all">
                                        <div className="w-full">
                                            <div className="flex justify-between">
                                                <div className="flex gap-4">
                                                    <div className="text-primary-black font-semibold">Chitfund Address</div>
                                                    <div className="text-primary-black">{chitfund?.address}</div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="text-primary-black font-semibold">Chitfund Amount</div>
                                                    <div className="text-primary-black">{chitfund?.chitAmount}</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="flex gap-4">
                                                    <div className="text-primary-black font-semibold">Monthly Amount</div>
                                                    <div className="text-primary-black">{chitfund?.monthlyAmount}</div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="text-primary-black font-semibold">Duration</div>
                                                    <div className="text-primary-black">{chitfund?.duration}</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="flex gap-4">
                                                    <div className="text-primary-black font-semibold">Start Date</div>
                                                    <div className="text-primary-black">{chitfund?.startDate}</div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="text-primary-black font-semibold">No of Subscribers</div>
                                                    <div className="text-primary-black">{chitfund?.noOfSubscribers}</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="flex gap-4">
                                                    <div className="text-primary-black font-semibold">Max Subscribers</div>
                                                    <div className="text-primary-black">{chitfund?.maxSubscribers}</div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="text-primary-black font-semibold">Chitfund Status</div>
                                                    <div className="text-primary-black">{chitfund?.status}</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="flex gap-4">
                                                    <div className="text-primary-black font-semibold">Chitfund Current Winner</div>
                                                    <div className="text-primary-black">{chitfund?.currentWinner}</div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="text-primary-black font-semibold">Chitfund Previous Winners</div>
                                                    {chitfund?.previousWinners.map((winner, index) => (
                                                        <div key={index} className="text-primary-black">{winner}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center py-3'>
                                    <ManageProxy id={id}/>
                                </div>
                                {
                                    chitfund?.biddedValues.some(bid => bid.uid === JSON.parse(Cookies.get("admin")).localId) ? (
                                        <>
                                            <Auction />
                                        </>
                                    ) : (
                                        chitfund?.paidUsers.includes(JSON.parse(Cookies.get("admin")).localId) ? (
                                            <div className='flex justify-center py-3'>
                                                <Bidder />
                                            </div>
                                        ) : (
                                            <div className='flex justify-center py-3'>
                                                <button className={` px-4 py-1 ${chitfund?.status === "NOT STARTED" ? "bg-green-400 cursor-not-allowed" : "bg-green-500"} text-base text-white font-medium rounded-lg cursor-pointer`}
                                                    disabled={chitfund?.status === "NOT STARTED" ? true : false}
                                                    onClick={() => {
                                                        mutate({ id: chitfund?.id, uid: JSON.parse(Cookies.get("admin")).localId });
                                                    }} >
                                                    Pay Chit Amount
                                                </button>
                                            </div>
                                        )
                                    )
                                }
                            </>
                        )
                }
            </Layout>
        </>
    )
}

export default ChitFund