import React, { useEffect, useState } from 'react'
import Countdown from './Countdown'
import { useRouter } from 'next/router'
import { useStartAuction } from '@/utils/queryHooks'
import { useQueryClient } from 'react-query'
import { useAuth } from '@/context/authContext'
import CountdownTime from './CountdownTime'
import { checkAllUsersBid } from '@/utils/queries'

const Auction = () => {
    const queryClient = useQueryClient();
    const [auctionStarted, setAuctionStarted] = useState(false)
    const router = useRouter()
    const { id } = router.query;

    const { winner, setWinner } = useAuth();

    const handleSuccess = (data) => {
        console.log("Response for starting aution : ", data);
        queryClient.invalidateQueries({ queryKey: [`Chitfund ${id}`] });
        setWinner(true);
        // toast.success('Bid Placed Successfully');
    }

    const handleError = (data) => {
        console.log("Response for starting aution : ", data);
        // toast.error("Failed to place bid");
    }

    const { mutate, isLoading: isPlacingBid } = useStartAuction(handleSuccess, handleError);
    const allUsersBid = checkAllUsersBid({ id });

    useEffect(() => {
        if (allUsersBid) {
            setAuctionStarted(true);
            console.log("All users paid : ", allUsersBid);
        }
        console.log("All users paid : ", allUsersBid);
    }, [allUsersBid])

    useEffect(() => {
        if (auctionStarted) {
            console.log("Auction Started");
            mutate({ id: id });
        }
        return () => {
            console.log("Auction Ended");
        }
    } , [auctionStarted])

    return (
        <>
            <div className='flex justify-center py-3'>
                <button className="bg-secondary-blue px-4 py-1 text-base text-white font-medium rounded-lg cursor-default" disabled={true} >
                    <CountdownTime endTime={"10:00:00"} format={"HH:mm:ss"} styles={""} setBidStarted={setAuctionStarted} />
                </button>
            </div>
        </>
    )
}

export default Auction