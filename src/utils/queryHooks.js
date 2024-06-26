import { useMutation, useQuery } from "react-query";

import { getAvailableChitfunds, getJoinedChitfunds, joinChitfund, getChitfund, payChitAmount, placeBid, startAuction, createChitfund, addBalanceToUser, getUserDetails, manageProxy, withdrawBalance, checkAllUsersPaid } from "./queries";


export const useActiveChifunds = () => {
    return useQuery({
        queryKey: [`Available Chitfunds`],
        queryFn: () => getAvailableChitfunds(),
        select: (res) => {
            const data = res;
            return data;
        },
    });
}


export const useJoinedChitfunds = () => {
    return useQuery({
        queryKey: [`Joined Chitfunds`],
        queryFn: () => getJoinedChitfunds(),
        select: (res) => {
            const data = res;
            return data;
        },
    });
}

export const useJoinChitfund = (handleSuccess, handleError) => {
    return useMutation(joinChitfund, {
        onSuccess(res) {
            handleSuccess(res);
        },
        onError(err) {
            handleError(err);
        },
    });
}

export const useGetChitfund = (id) => {
    return useQuery({
        queryKey: [`Chitfund ${id}`],
        queryFn: () => getChitfund(id),
        select: (res) => {
            const data = res;
            return data;
        },
    });
}

export const usePayChitAmount = (handleSuccess, handleError) => {
    return useMutation(payChitAmount, {
        onSuccess(res) {
            handleSuccess(res);
        },
        onError(err) {
            handleError(err);
        },
    });
}

export const usePlaceBid = (handleSuccess, handleError) => {
    return useMutation(placeBid, {
        onSuccess(res) {
            handleSuccess(res);
        },
        onError(err) {
            handleError(err);
        },
    });
}

export const useManageProxy = (handleSuccess, handleError) => {
    return useMutation(manageProxy, {
        onSuccess(res) {
            handleSuccess(res);
        },
        onError(err) {
            handleError(err);
        },
    });
}

export const useStartAuction = (handleSuccess, handleError) => {
    return useMutation(startAuction, {
        onSuccess(res) {
            handleSuccess(res);
        },
        onError(err) {
            handleError(err);
        },
    });
}

export const useCreateChitfund = (handleSuccess, handleError) => {
    return useMutation(createChitfund, {
        onSuccess(res) {
            handleSuccess(res);
        },
        onError(err) {
            handleError(err);
        },
    });
}

export const useAddBalance = (handleSuccess, handleError) => {
    return useMutation(addBalanceToUser, {
        onSuccess(res) {
            handleSuccess(res);
        },
        onError(err) {
            handleError(err);
        },
    });
}

export const useWithdrawBalance = (handleSuccess, handleError) => {
    return useMutation(withdrawBalance, {
        onSuccess(res) {
            handleSuccess(res);
        },
        onError(err) {
            handleError(err);
        },
    });
}

export const useCheckAllUsersPaid = (id) => {
    return useQuery({
        queryKey: [`Check All Users Paid ${id}`],
        queryFn: () => checkAllUsersPaid(id),
        onSuccess: (data) => {
            console.log("Data : ", data);
            return data;
        },
        refetchInterval: 5000
    });
}

export const useGetUserDetails = (id) => {
    return useQuery({
        queryKey: [`User Details`],
        queryFn: () => getUserDetails(id),
        select: (res) => {
            const data = res;
            return data;
        },
    });
}