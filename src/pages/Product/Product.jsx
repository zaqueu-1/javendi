import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import fetchDb from '../../axios/fetchDb'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { BsWhatsapp } from 'react-icons/bs'
import { BsArrowBarLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import './product.css'

function Product() {

  const { id } = useParams()
  const [product, setProduct] = useState([])
  const [image, setImage] = useState('')
  const [productOwner, setProductOwner] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [showData, setShowData] = useState(false)

  const loadProduct = async () => {
    const res = await fetchDb.get(`/product/${id}`)
    const img = res.data.productPic.url
    setProduct(res.data)
    setImage(img)
  }

  const ownerName = async () => {

    setShowData(true)

    const owner = product.productOwner

    const res = await fetchDb.get(`/user/${owner}`)
    const name = res.data.userName
    const tel  = res.data.userPhone
    const email = res.data.userEmail

    setProductOwner(name)
    setUserPhone(tel)
    setUserEmail(email)
  }

  useEffect(() => {
    loadProduct()
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
            <p className='product-desc'>{product.productDesc}</p>
          </motion.div>

          <motion.div initial={{y:-20, opacity: 0 }} animate={{y:0, opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className="right-box">
            <h1 className='product-name'>{product.productName}</h1>
            <p className="product-price">R${product.productPrice}</p>
            <button className="product-button" onClick={(e) => ownerName()}>Exibir dados do vendedor</button>

            {showData && (
              <motion.div initial={{opacity: 0 }} animate={{opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }}>
                <p className='product-owner'>{productOwner}</p>
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

export default Product
