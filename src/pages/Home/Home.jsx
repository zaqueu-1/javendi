import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './home.css'
import Card from '../../components/Card/Card'
import { motion } from 'framer-motion'
import fetchDb from '../../axios/fetchDb'

function Home({ user }) {

  const [products, setProducts] = useState([])
  const [services, setServices] = useState([])

  useEffect(() => {
    const loadProducts = async () => {
      const res = await fetchDb.get('/product')
      setProducts(res.data.slice(-5))
    }

    const loadServices = async () => {
      const res = await fetchDb.get('/service')
      setServices(res.data.slice(-5))
    }

    loadProducts()
    loadServices()
  }, [])

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <motion.div initial={{y: 20, opacity: 0 }} animate={{ y: 0 , opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className="home-container">
        <div className="products-title">
          <h1>últimos produtos</h1>
          <p>que tal dar uma olhadinha nas novidades?</p>
        </div>
        <div className="products-container">
        {products.map((product, key) => (
          <Card
            image={product.productPic.url}
            name={product.productName}
            price={product.productPrice}
            id={product._id}
            type='product'
            key={key} />
            ))}
        </div>

        <div className="services-title">
            <h1>últimos serviços</h1>
            <p>precisando de uma ajudinha?</p>
          </div>
        <div className="services-container">
        {services.map((service, key) => (
          <Card   
            image={service.servicePic.url}
            name={service.serviceName}
            price={service.servicePrice}
            id={service._id}
            type='service'
            key={key} />
        ))}
        </div>
      </motion.div>
    </>
  )
}

export default Home
