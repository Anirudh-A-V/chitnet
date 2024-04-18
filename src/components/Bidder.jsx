import React, { useState } from 'react'
import Countdown from './Countdown';
import { usePlaceBid } from '@/utils/queryHooks';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const Bidder = () => {
    const [bid, setBid] = useState(0);
    const [bidStarted, setBidStarted] = useState(false);
    const router = useRouter()

    const { id } = router.query;

    const handleSuccess = (data) => {
        console.log("Response for placing bid : ", data);
        toast.success('Bid Placed Successfully');
    }

    const handleError = (data) => {
        console.log("Response for placing bid : ", data);
        toast.error("Failed to place bid");
    }

    const { mutate, isLoading: isPlacingBid } = usePlaceBid(handleSuccess, handleError);
    return (
        <>
            {
                bidStarted ? (
                    <div className='flex gap-1'>
                        <input 
                            type="number" 
                            placeholder='Enter your bid amount'
                            className='border-2 border-primary-blue px-2 py-1 text-base font-medium rounded-lg'
                            value={bid}
                            onChange={(e) => setBid(e.target.value)}
                        />
                        <button className='bg-primary-blue px-4 py-1 text-base text-white font-medium rounded-lg cursor-pointer'
                            onClick={() => {
                                mutate({ id: id, uid: JSON.parse(Cookies.get("admin")).localId, bidAmount: bid });
                            }}
                        >
                            Place Bid
                        </button>
                    </div>
                ) : (
                    <button className='bg-secondary-blue px-4 py-1 text-base text-white font-medium rounded-lg cursor-pointer' disabled>
                        Bid Starts in <Countdown duration={"00:00:10"} format={"HH:mm:ss"} styles={""} setBidStarted={setBidStarted} />
                    </button>
                )
            }

        </>
    )
}

export default Bidder