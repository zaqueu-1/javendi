import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './products.css'
import Card from '../../components/Card/Card'
import { motion } from 'framer-motion'
import fetchDb from '../../axios/fetchDb'

function Products({user}) {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  const loadProducts = async () => {
    const res = await fetchDb.get('/product')
    setProducts(res.data)
    setFilteredProducts(res.data)
  }

  useEffect(() => {
    loadProducts()
  }, [])

    const [selectedTag, setSelectedTag] = useState('todos')

    const handleSelectedTag = (tag) => {
        setSelectedTag(tag)

        if (tag === 'todos') {
            loadProducts()
        }

        if (tag !== 'todos') {
            const filteredProducts = products.filter(product => product.productTags === tag)
            setFilteredProducts(filteredProducts)
        }
    }

    if (!user) {
      return <Navigate to="/login" />;
    }

  return (
    <>
      <Navbar />
      <motion.div initial={{y: 20, opacity: 0 }} animate={{ y: 0 , opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className="products-wrapper-container">
        <div className="categories">
            <h1>filtrar por categoria:</h1>
            <select value={selectedTag} onChange={(e) => handleSelectedTag(e.target.value)} className="categories-container">
                <option value="todos">todos</option>
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
        <div className="products-title">
          <h1>produtos</h1>
          <p>procurando algo especial?</p>
        </div>
        <div className="products-container">
        {filteredProducts.map((product, key) => (
          <Card
            image={product.productPic.url}
            name={product.productName}
            price={product.productPrice}
            id={product._id}
            type='product'
            key={key} />
            ))}
        </div>
      </motion.div>
    </>
  )
}

export default Products
