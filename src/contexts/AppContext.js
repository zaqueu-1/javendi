import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext()

const AppProvider = ({ children }) => {
    const [userId, setUserId] = useState('')
 
    return (
    <AppContext.Provider value={{
      userId,
      setUserId,
     }} >
          {children}
        </AppContext.Provider>
      )
    }

const AppConsumer = () => useContext(AppContext)

export { AppContext, AppProvider, AppConsumer }