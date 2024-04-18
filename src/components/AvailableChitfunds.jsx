import React, {  } from "react";
import { toast } from "react-toastify";
import Loading from "./Loading";
import moment from 'moment-timezone';
import { truncate } from "@/utils/functions";
import { useJoinChitfund } from "@/utils/queryHooks";
import { useQueryClient } from "react-query";
import Cookies from "js-cookie";

const TableCell = ({ style, children }) => (
    <td className={style}>{children}</td>
);

const Chitfund = ({ chitfund, isLastChild }) => {
    const queryClient = useQueryClient();

    const handleSuccess = (data) => {
        console.log("Response for joining chitfund : ", data);
        queryClient.invalidateQueries({ queryKey: ["Available Chitfunds"] });
        toast.success('Joined Chitfund Successfully');
    };

    const handleError = (data) => {
        console.log("Response for joining chitfund : ", data);
        toast.error("Failed to join Chitfund");
    };
    const { mutate, isLoading } = useJoinChitfund(handleSuccess, handleError);

    return (
        <tr
            className={`relative text-sm text-gray-600 ${!isLastChild && "border-b"}`}
        >
            <TableCell style="py-3">
                <div className="flex items-center gap-3 h-11 w-fit max-w-[120px]">
                    {/* <div className=" rounded-full bg-gray-300"></div> */}
                    <div>
                        <div className="text-gray-950">{truncate(chitfund.address, 20)}</div>
                    </div>
                </div>
            </TableCell>
            <TableCell style="py-3">{chitfund.chitAmount}</TableCell>
            <TableCell style="py-3">{chitfund?.monthlyAmount}</TableCell>
            <TableCell style="py-3">{chitfund?.duration}</TableCell>
            <TableCell style="py-3">{moment(chitfund?.startDate).tz('Asia/Kolkata').format('YYYY-MM-DD')}</TableCell>
            <td className='py-3 w-fit'>
                <div className='flex justify-between'>
                    <p className='text-[#707070] text-base font-normal ml-3 text-clip'>{`${chitfund?.noOfSubscribers}/${chitfund?.maxSubscribers}`}</p>
                    {
                        chitfund?.joinedUsers.includes(JSON.parse(Cookies.get("admin")).localId) ? (
                            <button className='bg-primary-blue text-white text-base font-normal px-4 py-1 rounded-md cursor-default'>
                                Joined
                            </button>
                        ) : (
                            <button className="bg-green-500 px-4 py-1 text-base text-white font-medium rounded-lg max-w-20" onClick={() => {
                                mutate({ id: chitfund?.id, uid: JSON.parse(Cookies.get("admin")).localId });
                            }} >
                                {isLoading ? "Joining..." : "Join"}
                            </button>
                        )
                    }
                </div>
            </td>
        </tr>
    )
};


const AvailableChitfunds = ({ chitfunds, loading, setDetails, setDetailsModal }) => {
    return (
        <div className="p-3">
            <table className="boredr-spacing-y w-full table-auto">
                <thead>
                    <tr className="text-sm text-[#64748B]">
                        <TableCell style="py-1">Address</TableCell>
                        <TableCell style="py-1">Chit Amount</TableCell>
                        <TableCell style="py-1">Monthly Amount</TableCell>
                        <TableCell style="py-1">Duration</TableCell>
                        <TableCell style="py-1">Start Date</TableCell>
                        <TableCell style="py-1">Subscribers</TableCell>
                    </tr>
                </thead>
                <tbody>
                    {chitfunds?.map((chitfund, index) => (
                        <Chitfund chitfund={chitfund} isLastChild={index === chitfunds.length} key={index} />
                    ))}
                </tbody>
            </table>
            {loading && (
                <div className="flex justify-center py-3">
                    <Loading size={20} />
                </div>
            )}
            {!loading && chitfunds?.length === 0 ? (
                <div className="flex justify-center py-5 text-sm text-gray-600">
                    0 Available chitfunds
                </div>
            ) : null}


        </div>
    );
};

export default AvailableChitfunds;
