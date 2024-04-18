import { collection, doc, getDocs, query, where, updateDoc, getDoc, documentId } from "firebase/firestore";
import { firestore } from "./firebase";
import Cookies from "js-cookie";

export const getJoinedChitfunds = async () => {
    const uid = JSON.parse(Cookies.get("admin")).localId;
    const snapshot = await getDoc(doc(firestore, "Users", uid));
    const data = snapshot.data();
    const chitfunds = data?.joinedChitfunds
    if (chitfunds.length === 0) {
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
    console.log("Chitfunds : ", chitfunds);
    return chitfunds;
}

export const getChitfund = async (id) => {
    const chitfundRef = doc(firestore, "Chitfunds", id);
    const snapshot = await getDoc(chitfundRef);
    return { ...snapshot.data(), id: snapshot.id };
}

export const joinChitfund = async ({ id, uid }) => {
    const chitfund = await getChitfund(id);
    const joinedUsers = chitfund.joinedUsers;
    const noOfSubscribers = chitfund.noOfSubscribers;
    const chitfundRef = doc(firestore, "Chitfunds", id);
    await updateDoc(chitfundRef, {
        joinedUsers: [...joinedUsers, uid],
        noOfSubscribers: noOfSubscribers + 1,
        status: noOfSubscribers + 1 === chitfund.maxSubscribers ? "STARTED" : "NOT STARTED",
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
    await updateDoc(chitfundRef, {
        biddedValues: [...biddedValues, { uid, bidAmount }],
    });
}

export const startAuction = async ({ id }) => {
    const chitfundRef = doc(firestore, "Chitfunds", id);
    await updateDoc(chitfundRef, {
        status: "AUCTION",
    });
    const chitfund = await getChitfund(id);
    const biddedValues = chitfund.biddedValues;
    const minBid = Math.min(...biddedValues.map((bid) => bid.bidAmount));
    const winners = biddedValues.filter((bid) => bid.bidAmount === minBid.toString());
    const winner = winners[Math.floor(Math.random() * winners.length)].uid;
    await updateDoc(chitfundRef, {
        paidUsers: [],
        biddedValues: [],
        currentWinner: winner,
        previousWinners: [...chitfund.previousWinners, winner],
        status: "STARTED",
        currentMonth: chitfund.currentMonth + 1 <= chitfund.duration ? chitfund.currentMonth + 1 : chitfund.duration,
    });
}

export const addBalance = async ({ uid, amount }) => {
    const userRef = doc(firestore, "Users", uid);
    const user = await getDoc(userRef);
    const balance = user.data().balance + amount;
    await updateDoc(userRef, {
        balance: balance,
    });
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
    "id": "hiPEFroaruKFQ17Hvn2s"
}
 */