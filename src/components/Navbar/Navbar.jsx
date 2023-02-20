import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import Logo from '../../img/logo.png'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { BiSearch } from 'react-icons/bi'
import { BsFillGearFill } from 'react-icons/bs'
import { motion } from 'framer-motion'

function Navbar() {
    const handleSignout = () => {
        localStorage.clear()
        window.location.href = '/login'
    }

    const handleHome = () => {
        window.location.href = '/home'
    }

  return (
    <div className='navbar'>
        <div className="logo-wrapper" onClick={handleHome}>
            <motion.img initial={{x: -80, opacity: 0 }} animate={{ x: 0 , opacity:1 }} transition={{ ease: "easeOut", duration: 0.9 }} src={Logo} alt="logo" />
            <h1>já.vendi</h1>
        </div>

        <div className="searchbar">
            <input type="text" placeholder="Pesquisar" />
            <BiSearch style={{fontSize: '1.4rem', color: '#959595'}}/>
        </div>

        <div className="menu">
            <ul>
                <Link to={'/home'} className='pages'>home</Link>
                <Link to={'/products'} className='pages'>produtos</Link>
                <Link to={'/services'} className='pages'>serviços</Link>
                <Link to={'/mystore'} className='pages'>minha loja</Link>
                <button className='gear'><Link to={'/user'}><BsFillGearFill /></Link></button>
                <li className='simple-divider'>|</li>
                <Link to={'/store'} id='myStore'>quero anunciar!</Link>
                <button onClick={handleSignout} className='signout-button'><RiLogoutBoxRFill /></button>
            </ul>
        </div>

    </div>
  )
}

export default Navbar
