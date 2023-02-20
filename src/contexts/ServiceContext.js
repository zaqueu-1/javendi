import React, { createContext, useContext, useState } from 'react';

const ServiceContext = createContext()

const ServicesProvider = ({ children }) => {
    const [serviceName, setServiceName] = useState('')
    const [servicePrice, setServicePrice] = useState('')
    const [serviceDesc, setServiceDesc] = useState('')
    const [serviceTags, setServiceTags] = useState('')
    const [servicePic, setServicePic] = useState([])
    const [serviceOwner, setServiceOwner] = useState('')
 
    return (
    <ServiceContext.Provider value={{
        serviceName,
        servicePrice,
        serviceDesc,
        serviceTags,
        servicePic,
        serviceOwner,
        setServiceName,
        setServicePrice,
        setServiceDesc,
        setServiceTags,
        setServicePic,
        setServiceOwner,
     }} >
          {children}
        </ServiceContext.Provider>
      )
    }

const ServicesConsumer = () => useContext(ServiceContext)

export { ServiceContext, ServicesProvider, ServicesConsumer }