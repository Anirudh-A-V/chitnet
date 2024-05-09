import React, { useEffect, useState } from 'react'
import Countdown from './Countdown';
import { usePlaceBid } from '@/utils/queryHooks';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { useException } from '@/context/exceptionContext';
import CountdownTime from './CountdownTime';
import { useCheckAllUsersPaid } from '@/utils/queryHooks';
import { checkAllUsersPaid } from '@/utils/queries';

const Bidder = () => {
    const [bid, setBid] = useState(0);
    const [bidStarted, setBidStarted] = useState(false);
    const { setException } = useException();
    const router = useRouter()
    const queryClient = useQueryClient();

    const { id } = router.query;

    const handleSuccess = (data) => {
        console.log("Response for placing bid : ", data);
        queryClient.invalidateQueries({ queryKey: [`Chitfund ${id}`] });
        toast.success('Bid Placed Successfully');
    }

    const handleError = (data) => {
        console.log("Response for placing bid : ", data);
        toast.error("Failed to place bid");
        setException(data.message);

    }

    const { mutate, isLoading: isPlacingBid } = usePlaceBid(handleSuccess, handleError);
    const allUsersPaid = checkAllUsersPaid({ id });

    useEffect(() => {
        if (allUsersPaid) {
            setBidStarted(true);
            console.log("All users paid : ", allUsersPaid);
        }
        console.log("All users paid : ", allUsersPaid);
    }, [allUsersPaid])


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
                        Bid Starts in <CountdownTime endTime={"09:00:00"} format={"HH:mm:ss"} styles={""} setBidStarted={setBidStarted} />
                    </button>
                )
            }

        </>
    )
}

export default Bidder