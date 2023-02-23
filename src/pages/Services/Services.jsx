import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './services.css'
import Card from '../../components/Card/Card'
import { motion } from 'framer-motion'
import fetchDb from '../../axios/fetchDb'

function Services({user}) {

  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])

  const loadServices = async () => {
    const res = await fetchDb.get('/service')
    setServices(res.data)
    setFilteredServices(res.data)
  }

  useEffect(() => {
    loadServices()
  }, [])

    const [selectedTag, setSelectedTag] = useState('todos')

    const handleSelectedTag = (tag) => {
        setSelectedTag(tag)

        if (tag === 'todos') {
            loadServices()
        }

        if (tag !== 'todos') {
            const filteredServices = services.filter(service => service.serviceTags === tag)
            setFilteredServices(filteredServices)
        }
    }

    if (!user) {
      return <Navigate to="/login" />;
    }

  return (
    <>
      <Navbar />
      <motion.div initial={{y: 20, opacity: 0 }} animate={{ y: 0 , opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className="services-wrapper-container">
        <div className="categories">
            <h1>filtrar por categoria:</h1>
            <select value={selectedTag} onChange={(e) => handleSelectedTag(e.target.value)} className="categories-container">
                <option value="todos">todos</option>
                <option value="consertos gerais">consertos gerais</option>
                <option value="limpeza e organização">limpeza e organização</option>
                <option value="financeiro">financeiro</option>
                <option value="saúde e beleza">saúde e beleza</option>
                <option value="educação">educação</option>
            </select>
        </div>
        <div className="products-title">
          <h1>produtos</h1>
          <p>procurando algo especial?</p>
        </div>
        <div className="products-container">
        {filteredServices.map((service, key) => (
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

export default Services
