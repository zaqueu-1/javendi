import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import fetchDb from '../../axios/fetchDb'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { BsWhatsapp } from 'react-icons/bs'
import { BsArrowBarLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import './service.css'

function Service() {

  const { id } = useParams()
  const [service, setService] = useState([])
  const [image, setImage] = useState('')
  const [serviceOwner, setServiceOwner] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [showData, setShowData] = useState(false)

  const loadService = async () => {
    const res = await fetchDb.get(`/service/${id}`)
    const img = res.data.servicePic.url
    setService(res.data)
    setImage(img)
  }

  const ownerName = async () => {

    setShowData(true)

    const owner = service.serviceOwner

    const res = await fetchDb.get(`/user/${owner}`)
    const name = res.data.userName
    const tel  = res.data.userPhone
    const email = res.data.userEmail

    setServiceOwner(name)
    setUserPhone(tel)
    setUserEmail(email)
  }

  useEffect(() => {
    loadService()
  }, [])


  return (
    <>
      <Header />
      <div className="products-wrapper">  
        <div className="product-container">
          <motion.div initial={{y:20, opacity: 0 }} animate={{y:0, opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className="left-box">
            <div className="product-info">
              <img className="product-image" alt='product' src={image}/>
            </div>
            <p className='desc-title'>Descrição:</p>
            <p className='product-desc'>{service.serviceDesc}</p>
          </motion.div>

          <motion.div initial={{y:-20, opacity: 0 }} animate={{y:0, opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className="right-box">
            <h1 className='product-name'>{service.serviceName}</h1>
            <p className="product-price">R${service.servicePrice}</p>
            <button className="product-button" onClick={(e) => ownerName()}>Exibir dados do vendedor</button>

            {showData && (
              <motion.div initial={{opacity: 0 }} animate={{opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }}>
                <p className='product-owner'>{serviceOwner}</p>
                <a className='owner-contact' target='_blank' rel='noreferrer' href={`https://wa.me/55${userPhone}`}><p><BsWhatsapp />{userPhone}</p></a>
              </motion.div>
            )}
          </motion.div>
        </div>
        <Link className='back-btn' to='/home'><BsArrowBarLeft /> Voltar</Link>
      </div>
    </>
  )
}

export default Service
