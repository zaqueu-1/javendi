import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext()

const ProductsProvider = ({ children }) => {
    const [productName, setProductName] = useState('')
    const [productQtd, setProductQtd] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productDesc, setProductDesc] = useState('')
    const [productCond, setProductCond] = useState('')
    const [productTags, setProductTags] = useState('')
    const [productPic, setProductPic] = useState([])
    const [productOwner, setProductOwner] = useState('')
 
    return (
    <ProductContext.Provider value={{
        productName,
        setProductName,
        productQtd,
        setProductQtd,
        productPrice,
        setProductPrice,
        productDesc,
        setProductDesc,
        productCond,
        setProductCond,
        productTags,
        setProductTags,
        productPic,
        setProductPic,
        productOwner,
        setProductOwner,
     }} >
          {children}
        </ProductContext.Provider>
      )
    }

const ProductsConsumer = () => useContext(ProductContext)

export { ProductContext, ProductsProvider, ProductsConsumer }