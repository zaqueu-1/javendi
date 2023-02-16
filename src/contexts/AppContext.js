import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext()

const AppProvider = ({ children }) => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [createdBy, setCreatedBy] = useState('')

 
    return (
    <AppContext.Provider value={{
      userName,
      setUserName,
      userEmail,
      setUserEmail,
      userPass,
      setUserPass,
      confirmPass,
      setConfirmPass,
      createdBy,
      setCreatedBy
     }} >
          {children}
        </AppContext.Provider>
      )
    }

const AppConsumer = () => useContext(AppContext)

export { AppContext, AppProvider, AppConsumer }