import React  from 'react'
import { Link } from 'react-router-dom'
import './card.css'
import { motion } from 'framer-motion'

function Card({ image, price, id, type }) {

  return (
    <Link to={`/${type}/${id}`}>
    <motion.div initial={{y:20, opacity: 0 }} animate={{y:0, opacity:1 }} transition={{ ease: "easeOut", duration: 0.5 }} className="product-card" >
        <div className="image-wrapper">
            <img className='card-img' src={image} alt="product" />
            <motion.h1 initial={{x:-20, opacity: 0 }} animate={{x:0, opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className='card-price'>R${price}</motion.h1>
        </div>
    </motion.div>
    </Link>
  )
}

export default Card
