import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import Logo from '../../img/logo.png'
import { BsFillGearFill } from 'react-icons/bs'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { BiSearch } from 'react-icons/bi'
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
            <h1>já.vendi</h1>
            <motion.img initial={{x: 80, opacity: 0 }} animate={{ x: 0 , opacity:1 }} transition={{ ease: "easeOut", duration: 0.9 }} src={Logo} alt="logo" />
        </div>

        <div className="searchbar">
            <input type="text" placeholder="Pesquisar" />
            <BiSearch style={{fontSize: '1.4rem', color: '#959595'}}/>
        </div>

        <div className="menu">
            <ul>
                <Link className='pages'>home</Link>
                <Link className='pages'>produtos</Link>
                <Link className='pages'>serviços</Link>
                <li className='simple-divider'>|</li>
                <Link id='myStore'>minha loja</Link>
            </ul>
            <div className="tools">
                <button className='gear'><BsFillGearFill /></button>
                <button onClick={handleSignout} className='signout-button'><RiLogoutBoxRFill /></button>
            </div>
        </div>

    </div>
  )
}

export default Navbar
