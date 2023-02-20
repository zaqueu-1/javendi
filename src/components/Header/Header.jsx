import React from 'react'
import Logo from '../../img/logo.png'
import './header.css'
import { motion } from 'framer-motion'

function header() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity:1 }} transition={{ ease: "easeOut", duration: 0.9 }} className='header'>
      <motion.img initial={{x: -80, opacity: 0 }} animate={{ x: 0 , opacity:1 }} transition={{ ease: "easeOut", duration: 0.9 }} src={Logo} alt="logo" />
      <h1>já.vendi</h1>
    </motion.div>
  )
}

export default header
