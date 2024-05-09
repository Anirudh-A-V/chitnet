import { collection, doc, getDocs, query, where, updateDoc, getDoc, documentId, addDoc, setDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import { useException } from "@/context/exceptionContext";
import Cookies from "js-cookie";

export const getJoinedChitfunds = async () => {
    const uid = JSON.parse(Cookies.get("admin")).localId;
    const snapshot = await getDoc(doc(firestore, "Users", uid));
    const data = snapshot.data();
    const chitfunds = data?.joinedChitfunds
    console.log("Chitfunds joined by user : ", data);
    if (chitfunds.length === 0) {
        console.log("No chitfunds joined by user");
        return [];
    }
    const chitfundQuery = query(collection(firestore, "Chitfunds"), where(documentId(), "in", chitfunds));
    const snapshot2 = await getDocs(chitfundQuery);
    const chitfundsData = snapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return chitfundsData;
}


export const getAvailableChitfunds = async () => {
    const availableChitfund = query(collection(firestore, "Chitfunds"), where("status", "==", "NOT STARTED"));
    const snapshot = await getDocs(availableChitfund);
    const chitfunds = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    if (chitfunds.length !== 0) {
        console.log("Chitfunds : ", chitfunds);
    }
    return chitfunds;
}

export const getChitfund = async (id) => {
    const chitfundRef = doc(firestore, "Chitfunds", id);
    const snapshot = await getDoc(chitfundRef);
    return { ...snapshot.data(), id: snapshot.id };
}

export const joinChitfund = async ({ id, uid }) => {
    const userRef = doc(firestore, "Users", uid);
    const user = await getDoc(userRef);
    const joinedChitfunds = user.data().joinedChitfunds;
    const chitfund = await getChitfund(id);
    const joinedUsers = chitfund.joinedUsers;
    const noOfSubscribers = chitfund.noOfSubscribers;
    const chitfundRef = doc(firestore, "Chitfunds", id);
    await updateDoc(chitfundRef, {
        joinedUsers: [...joinedUsers, uid],
        noOfSubscribers: noOfSubscribers + 1,
        status: noOfSubscribers + 1 === chitfund.maxSubscribers ? "STARTED" : "NOT STARTED",
    });
    await updateDoc(userRef, {
        joinedChitfunds: [...joinedChitfunds, id],
    });
}

export const payChitAmount = async ({ id, uid }) => {
    
    const user = await getDoc(doc(firestore, "Users", uid));
    const chitfund = await getChitfund(id);
    const balance = user.data().balance - chitfund.monthlyAmount;
    if (balance < 0) {
        throw new Error("Insufficient balance");
    }
    const paidUsers = chitfund.paidUsers;
    const chitfundRef = doc(firestore, "Chitfunds", id);
    await updateDoc(chitfundRef, {
        chitBalance: chitfund.chitBalance + chitfund.monthlyAmount,
        paidUsers: [...paidUsers, uid],
    });
    const userRef = doc(firestore, "Users", uid);
    await updateDoc(userRef, {
        balance: balance,
    });
}

export const placeBid = async ({ id, uid, bidAmount }) => {
    
    const chitfund = await getChitfund(id);
    const biddedValues = chitfund.biddedValues;
    const chitfundRef = doc(firestore, "Chitfunds", id);
    if (bidAmount == 0) {
        const proxies = chitfund.proxies;
        const proxyAmount = proxies.filter((proxy, index) => proxy.uid === uid);
        await updateDoc(chitfundRef, {
            biddedValues: [...biddedValues, { uid, proxyAmount: proxyAmount[0], isProxy: true }],
        });
    } else {
        if (biddedValues.some((bid) => bid.uid === uid)) {
            throw new Error("User already placed bid");
        }
        if (bidAmount < chitfund.chitAmount * 0.75) {
            throw new Error("Bid amount should be greater than chit amount");
        }
        await updateDoc(chitfundRef, {
            biddedValues: [...biddedValues, { uid, bidAmount }],
        });
    }
}

export const manageProxy = async ({ id, uid, proxyAmount, startDate, endDate, duration }) => {
    const chitfund = await getChitfund(id);
    const proxies = chitfund.proxies;
    const chitfundRef = doc(firestore, "Chitfunds", id);
    await updateDoc(chitfundRef, {
        proxies: [...proxies, { uid, proxyAmount, startDate, endDate, duration }],
    });
}

export const startAuction = async ({ id }) => {
    const chitfundRef = doc(firestore, "Chitfunds", id);
    await updateDoc(chitfundRef, {
        status: "AUCTION",
    });
    const chitfund = await getChitfund(id);
    const chitAmount = chitfund.chitAmount;
    const biddedValues = chitfund.biddedValues;

    if (biddedValues.length === 0) {
        const minbid = chitfund.monthlyAmount * 0.75;
        const allUsers = chitfund.joinedUsers;
        const winner = allUsers[Math.floor(Math.random() * allUsers.length)];
        await updateDoc(chitfundRef, {
            paidUsers: [],
            biddedValues: [],
            chitBalance: 0,
            currentWinner: winner,
            previousWinners: [...chitfund.previousWinners, winner],
            status: "STARTED",
            currentMonth: chitfund.currentMonth + 1 <= chitfund.duration ? chitfund.currentMonth + 1 : chitfund.duration,
        });
        await addBalanceToUser({ uid: winner, amount: minbid });
        const otherThanWinner = allUsers.filter((user) => user !== winner);
        const promises = otherThanWinner.map((uid) => addBalanceToUser({ uid, amount: chitAmount / otherThanWinner.length }));
        await Promise.all(promises);
        return;
    }

    const minBid = Math.min(...biddedValues.map((bid) => bid.bidAmount));
    const winners = biddedValues.filter((bid) => bid.bidAmount === minBid.toString());
    const winner = winners[Math.floor(Math.random() * winners.length)].uid;
    await updateDoc(chitfundRef, {
        paidUsers: [],
        biddedValues: [],
        chitBalance: 0,
        currentWinner: winner,
        previousWinners: [...chitfund.previousWinners, winner],
        status: "STARTED",
        currentMonth: chitfund.currentMonth + 1 <= chitfund.duration ? chitfund.currentMonth + 1 : chitfund.duration,
    });
    await addBalanceToUser({ uid: winner, amount: minBid });
    const otherThanWinner = biddedValues.filter((bid) => bid.uid !== winner);

    const promises = otherThanWinner.map(uid => addBalanceToUser({ uid, amount: (chitAmount - minBid) / otherThanWinner.length }));
    await Promise.all(promises);
}



export const createChitfund = async ({ chitAmount, maxSubscribers, monthlyAmount, duration, startDate }) => {
    const chitfundRef = doc(collection(firestore, "Chitfunds"));
    await setDoc(chitfundRef, {
        status: "NOT STARTED",
        duration: parseInt(duration) || duration,
        maxSubscribers: parseInt(maxSubscribers) || maxSubscribers,
        startDate: startDate,
        joinedUsers: [JSON.parse(Cookies.get("admin")).localId],
        chitAmount: parseInt(chitAmount) || chitAmount,
        chitBalance: 0,
        noOfSubscribers: 1,
        monthlyAmount: parseInt(monthlyAmount) || monthlyAmount,
        owner: JSON.parse(Cookies.get("admin")).localId,
        currentWinner: "",
        previousWinners: [],
        paidUsers: [],
        biddedValues: [],
        currentMonth: 1,
        address: "0xb8f43EC36718ecCb339B75B727736ba14F174d77",
        proxies: []
    });
    const userRef = doc(firestore, "Users", JSON.parse(Cookies.get("admin")).localId);
    const user = await getDoc(userRef)
    const joinedChitfunds = user.data().joinedChitfunds;
    await updateDoc(userRef, {
        joinedChitfunds: [...joinedChitfunds, chitfundRef.id],
    });
}

export const addBalanceToUser = async ({ uid, amount }) => {
    const userRef = doc(firestore, "Users", uid);
    const user = await getDoc(userRef);
    console.log("User : ", user.data());
    const balance = parseInt(user.data().balance) + parseInt(amount);
    console.log("Balance : ", balance);
    await updateDoc(userRef, {
        balance: balance,
    });
}

export const withdrawBalance = async ({ uid, amount }) => {
    console.log("Withdraw amount : ", amount);
    console.log("User id : ", uid);
    
    const userRef = doc(firestore, "Users", uid);
    const user = await getDoc(userRef);
    const balance = parseInt(user.data().balance) - parseInt(amount);
    console.log("Balance : ", balance);

    if (balance < 0) {
        throw new Error("Insufficient balance");
    }
    await updateDoc(userRef, {
        balance: balance,
    });
}

export const checkAllUsersPaid = async ({ id }) => {
    const chitfund = await getChitfund(id);
    const joinedUsers = chitfund.joinedUsers;
    const paidUsers = chitfund.paidUsers;
    console.log("Joined users : ", joinedUsers);
    return joinedUsers.length === paidUsers.length;
}


export const getUserDetails = async (uid) => {
    const user = await getDoc(doc(firestore, "Users", uid));
    return user.data();
}

/**
 * 
 * {
    "status": "NOT STARTED",
    "duration": 60,
    "maxSubscribers": 60,
    "startDate": "18 Apr 2024",
    "joinedUsers": [],
    "chitAmount": 600000,
    "chitBalance": 0,
    "address": "0x02180dD815cA64898F6126f3911515B06D17acaD",
    "noOfSubscribers": 59,
    "monthlyAmount": 10000,
    "currentWinner": "",
    "previousWinners": [],
    "paidUsers": [],
    "biddedValues": [],
    "currentMonth": 1,
    "id": "hiPEFroaruKFQ17Hvn2s",

}
 */