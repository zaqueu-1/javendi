import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import './store.css'
import serviceImg from '../../img/card-services.png'
import productImg from '../../img/card-products.png'
import { motion } from 'framer-motion'
import { BsArrowBarLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import fetchDb from '../../axios/fetchDb'
import { toast } from 'react-toastify'
import { ProductsConsumer } from '../../contexts/ProductContext'
import { ServicesConsumer } from '../../contexts/ServiceContext'

function Store() {

  const [screen, setScreen] = useState('question-screen')

  const {
    productName,
    productQtd,
    productPrice,
    productDesc,
    productCond,
    productTags,
    productPic,
    productOwner,
    setProductName,
    setProductQtd,
    setProductPrice,
    setProductDesc,
    setProductCond,
    setProductTags,
    setProductPic,
    setProductOwner,
  } = ProductsConsumer()

  const {
    serviceName,
    servicePrice,
    servicePic,
    serviceDesc,
    serviceOwner,
    serviceTags,
    setServiceName,
    setServicePrice,
    setServicePic,
    setServiceDesc,
    setServiceOwner,
    setServiceTags,
  } = ServicesConsumer()

  useEffect(() => {
    const userId = localStorage.getItem("userId")

    setServiceOwner(userId)
    setProductOwner(userId)
  }, [])

  const handleScreen = (type) => {
    setScreen(type)
  }

  const [fileLoading, setFileLoading] = useState(false)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    setFileToBase(file)
  }

  const setFileToBase = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    if (screen==='product-screen') {
      reader.onloadend = () => {
        setProductPic(reader.result)
        setFileLoading(true)
      }
    }

    if (screen==='service-screen') {
      reader.onloadend = () => {
        setServicePic(reader.result)
        setFileLoading(true)
      }
    }
  } 

  const handleSubmitProduct = async (e) => {
    e.preventDefault()

    if (fileLoading) {

      let newProduct = {
        productName,
        productPic,
        productCond,
        productDesc,
        productTags,
        productPrice,
        productQtd,
        productOwner,
       }  
 
     if (!productName || !productQtd || !productPrice || !productDesc || !productCond || !productTags || !productPic) {
       toast.error('preencha todos os campos!')
       return
     }
 
     console.log(newProduct)
   
     const res = await fetchDb.post('/product', newProduct)
     window.location = '/store'
    }
  }

  const handleSubmitService = async (e) => {
    e.preventDefault()

    if (fileLoading) {
      
      let newService = {
        serviceName,
        servicePrice,
        servicePic,
        serviceDesc,
        serviceOwner,
        serviceTags,
      }
  
      if (!serviceName || !servicePrice || !serviceDesc || !serviceTags || !servicePic) {
        toast.error('preencha todos os campos!')
        return
      }
  
      console.log(newService)
    
      const res = await fetchDb.post('/service', newService)
      window.location = '/store'
    }
  }

  return (
    <>
      <Header />
      <div className="store-container">

      {screen === 'question-screen' && (
        <>
        <motion.h1 initial={{opacity: 0 }} animate={{opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className='store-section-title'>o que vai anunciar hoje?</motion.h1>

        <motion.div initial={{y: 40, opacity: 0 }} animate={{ y: 0 , opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className="options">
          <button onClick={(e) => handleScreen('product-screen')} className="option-product">
          <img src={productImg} alt="product" className="product-pic" />
          </button>

          <button onClick={(e) => handleScreen('service-screen')} className="option-service">
            <img src={serviceImg} alt="service" className="service-pic" />
          </button>
        </motion.div>

        <Link to='/home'><BsArrowBarLeft /> Voltar</Link>
        </>
      )}

      {screen === 'product-screen' && (
        <>
        <motion.form initial={{opacity: 0 }} animate={{opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className='submit-form'>
          <h1 className='form-title'>anuncie seu produto</h1>

          <label className='label' htmlFor="image">foto do produto:</label>
          <input id='input-img' name='image' type='file' required onChange={handleImageUpload} accept="image/*" />

          <label className='label' htmlFor="name">nome do produto:</label>
          <input type="text" value={productName} name='name' required onChange={(e) => setProductName(e.target.value)} placeholder="Nome do produto" />

          <label className='label' htmlFor="desc">descrição do produto:</label>
          <input className='desc-box'  type="text" value={productDesc} name='desc'required onChange={(e) => setProductDesc(e.target.value)} placeholder="Descrição" />

          <div className="bigWrapper">
            <div className="wrapper">
              <label className='label' htmlFor="qtd">quantidade:</label>
              <input className='input-small' type="number" value={productQtd} required onChange={(e) => setProductQtd(e.target.value)} placeholder="Quantidade" />
            </div>

            <div className="wrapper">
              <label className='label' htmlFor="price">valor:</label>
              <input className='input-small' type="number" value={productPrice} required onChange={(e) => setProductPrice(e.target.value)} placeholder="Preço" />
            </div>

            <div className="wrapper">
            <label className='label' htmlFor="cond">condição:</label>
            <select className='input-small' value={productCond} onChange={(e) => setProductCond(e.target.value)}>
              <option value="novo">novo</option>
              <option value="usado">usado</option>
            </select>
          </div>

          <div className="wrapper">
            <label className='label' htmlFor="tag">categoria:</label>
            <select className='input-small' value={productTags} onChange={(e) => setProductTags(e.target.value)}>
              <option value="brinquedos">brinquedos</option>
              <option value="eletronicos">eletrônicos</option>
              <option value="eletrodomesticos">eletrodomésticos</option>
              <option value="esportes">esportes</option>
              <option value="moveis">móveis</option>
              <option value="musica">música</option>
              <option value="veiculos">veículos</option>
              <option value="roupas">roupas</option>
              <option value="utensílios">utensílios</option>
              <option value="outros">outros</option>
            </select>
          </div>

          </div>

        </motion.form>
        <button className="submit-products" onClick={(e) => handleSubmitProduct(e)}>Anunciar!</button>
        <Link className='back-btn' to='/home'><BsArrowBarLeft /> Voltar</Link>
        </>
      )}

      {screen === 'service-screen' && (
        <>
        <motion.form initial={{opacity: 0 }} animate={{opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className='submit-form'>
          <h1 className='form-title'>anuncie seu serviço</h1>

          <label className='label' htmlFor="image">foto do serviço:
          <input id='input-img' type='file' required onChange={handleImageUpload} accept="image/*" />
          </label>

          <label className='label' htmlFor="name">nome do serviço:</label>
          <input type="text" value={serviceName} required onChange={(e) => setServiceName(e.target.value)} placeholder="Nome do serviço" />

          <label className='label' htmlFor="desc">descrição do serviço:</label>
          <input className='desc-box' type="text" value={serviceDesc} required onChange={(e) => setServiceDesc(e.target.value)} placeholder="Descrição" />




          <div className="bigWrapper">
            <div className="wrapper">
              <label className='label' htmlFor="price">valor:</label>
              <input className='input-small' type="number" value={servicePrice} required onChange={(e) => setServicePrice(e.target.value)} placeholder="Preço" />
            </div>

            <div className="wrapper">
              <label className='label' htmlFor="tag">categoria:</label>
              <select className='input-small' value={serviceTags} onChange={(e) => setServiceTags(e.target.value)}>
              <option value="consertos gerais">consertos gerais</option>
              <option value="limpeza e organização">limpeza e organização</option>
              <option value="financeiro">financeiro</option>
              <option value="saúde e beleza">saúde e beleza</option>
              <option value="educação">educação</option>
              </select>
            </div>
          </div>

        </motion.form>
        <button className="submit-products" onClick={(e) => handleSubmitService(e)}>Anunciar!</button>
        <Link className='back-btn' to='/home'><BsArrowBarLeft /> Voltar</Link>
        </>
      )}

      </div>
    </>
  )
}

export default Store
