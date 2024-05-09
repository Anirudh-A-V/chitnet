// ExceptionContext.js
import React, { createContext, useContext, useState } from 'react';

const ExceptionContext = createContext();

export const useException = () => useContext(ExceptionContext);

export const ExceptionProvider = ({ children }) => {
  const [exception, setException] = useState(null);

  const clearException = () => {
    setException(null);
  };

  return (
    <ExceptionContext.Provider value={{ exception, setException, clearException }}>
      {children}
    </ExceptionContext.Provider>
  );
};
