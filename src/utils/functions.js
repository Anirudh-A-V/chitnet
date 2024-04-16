export const truncate = (str, n) => {
    return str?.length > n ? str?.substring(0, n - 1) + "..." : str;
  };
  
  export const checkLimitReached = (currentValue, limit) => {
    if (currentValue >= limit) {
      return true;
    }
    return false;
  };
  