import Web3 from "web3";

export const truncate = (str, n) => {
  return str?.length > n ? str?.substring(0, n - 1) + "..." : str;
};

export const checkLimitReached = (currentValue, limit) => {
  if (currentValue >= limit) {
    return true;
  }
  return false;
};

export const handleSendTransaction = async () => {
  try {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    // Request account access if needed
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Initialize web3 provider
    const web3 = new Web3(window.ethereum);

    // Get user's accounts
    const [account] = await web3.eth.getAccounts();

    // Define transaction details
    const transactionObject = {
      from: account,
      to: '0xb48E20C8F35e213D2995a6eF6c94560F4faC7A87', // Replace with recipient's Ethereum address
      value: web3.utils.toWei('0.0001', 'ether'), // 0.1 ETH
      gas: 21000, // Gas limit
      gasPrice: await web3.eth.getGasPrice(), // Gas price (in wei)
    };

    // Send the transaction
    const transaction = await web3.eth.sendTransaction(transactionObject);
    setTransactionHash(transaction.transactionHash);

    console.log("Transaction : ", transaction);

    if (transaction.status) {
      return true
    }
    return false;
  } catch (error) {
    console.error(error);
  }
};
