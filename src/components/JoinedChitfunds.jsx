import React from "react";
import Loading from "./Loading";
import moment from 'moment-timezone';
import { truncate } from "@/utils/functions";
import Link from "next/link";

const TableCell = ({ style, children }) => (
    <td className={style}>{children}</td>
);

const Chitfund = ({ chitfund, isLastChild }) => {

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

                    <Link className='bg-primary-blue px-4 py-1 text-base text-white font-medium rounded-lg cursor-pointer max-w-20'
                        href={`/dashboard/chitfunds/${chitfund.id}`}
                    >
                        View
                    </Link>


                </div>
            </td>
        </tr>
    )
};


const JoinedChitfunds = ({ chitfunds, loading }) => {
    return (
        <div className="p-3">
            <table className="boredr-spacing-y w-full min-w-[1000px] table-auto">
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
                    You have not joined any chitfunds yet.
                </div>
            ) : null}


        </div>
    );
};

export default JoinedChitfunds;
