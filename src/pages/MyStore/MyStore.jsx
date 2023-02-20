import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import './mystore.css'
import { motion } from 'framer-motion'
import { BsArrowBarLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import Card from '../../components/Card/Card'
import fetchDb from '../../axios/fetchDb'

function MyStore() {

  const userId = localStorage.getItem('userId')
  const [currentStore, setCurrentStore] = useState('products')
  const [products, setProducts] = useState([])
  const [services, setServices] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    loadProducts()
    loadUser()
  }, [])

  const loadUser = async () => {
    const res = await fetchDb.get(`/user/${userId}`)
    const userName = res.data.userName
    setUser(userName)
  }

  const loadProducts = async () => {
    const res = await fetchDb.get('/product')
    setProducts(res.data.filter(products => products.productOwner === userId))
  }

  const loadServices = async () => {
    const res = await fetchDb.get('/service')
    setServices(res.data.filter(services => services.serviceOwner === userId))
  }

  const loadStore = (type) => {
    if (type === 'products') {
      setCurrentStore('products')
      loadProducts()
    } 
    
    if (type === 'services') {
      setCurrentStore('services')
      loadServices()
    }
  }

  const handleStore = (type) => {
    setCurrentStore(type)
    loadStore(type)
  }

  const goTo = (id) => {
    if (currentStore === 'products') {
      window.location.href = `/product/${id}`
    } else if (currentStore === 'services') {
      window.location.href = `/service/${id}`
    }
  }

  const deleteProduct = async (id) => {
      const res = await fetchDb.delete(`/product/${id}`).then( 
        window.location.reload()
      )
  }

  const deleteService = async (id) => {
    await fetchDb.delete(`/service/${id}`).then( 
      window.location.reload()
    )
  }


  return (
    <>
      <Header />
      <div className="mystore-container">

      <div className="mystore-header">
        <motion.h1 initial={{opacity: 0 }} animate={{opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className='mystore-section-title'>{user}</motion.h1>
          <div className="buttons-container">
            <button onClick={(e) => handleStore('products')} className="choose-products-button">ver produtos</button>
            <button onClick ={(e) => handleStore('services')}className="choose-services-button">ver serviços</button>
          </div>
      </div>

      <div className="current-store">
        {currentStore === 'products' && products.length>0 && products.map((product, key) => (
          <>
          <Card
            onClick={(e) => goTo(product._id)}
            image={product.productPic.url}
            name={product.productName}
            price={product.productPrice}
            id={product._id}
            type='product'
            key={key} />
          
            {user && (
              <motion.div initial={{opacity: 0 }} animate={{opacity:1 }} transition={{ ease: "easeOut", duration: 0.9 }} className='card-tools'>
                <button onClick={(e) => deleteProduct(product._id)} className="delete-product"><RiDeleteBin2Fill /></button>
              </motion.div>
            )}
            </>
         ))}

         {currentStore === 'products' && products.length === 0 && (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <motion.h1 initial={{opacity: 0 }} animate={{opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className='no-products'>você ainda não tem produtos cadastrados :(</motion.h1>
              <motion.h1 initial={{opacity: 0 }} animate={{opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className='include'>
                <Link to='/store'>mas pode cadastrar clicando aqui!</Link>
              </motion.h1>
            </div>
          )}

        {currentStore === 'services' && services.length>0 && services.map((service, key) => (
          <>
          <Card   
            onClick={(e) => goTo(service._id)}
            image={service.servicePic.url}
            name={service.serviceName}
            price={service.servicePrice}
            id={service._id}
            type='service'
            key={key} />

            {user && (
              <motion.div initial={{opacity: 0 }} animate={{opacity:1 }} transition={{ ease: "easeOut", duration: 0.9 }} className='card-tools'>
                <button onClick={(e) => deleteService(service._id)} className="delete-product"><RiDeleteBin2Fill /></button>
              </motion.div>
            )}
          </>
        ))}

        {currentStore === 'services' && services.length === 0 && (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <motion.h1 initial={{opacity: 0 }} animate={{opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className='no-products'>você ainda não tem serviços cadastrados :(</motion.h1>
            <motion.h1 initial={{opacity: 0 }} animate={{opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className='include'>
              <Link to='/store'>mas pode cadastrar clicando aqui!</Link> 
            </motion.h1>
          </div>
          )}
      </div>

      <Link className='back-btn' to='/home'><BsArrowBarLeft /> Voltar</Link>

      </div>
    </>
  )
}

export default MyStore
