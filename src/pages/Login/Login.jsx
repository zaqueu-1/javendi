import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Signup from '../../components/Signup/Signup'
import './login.css'
import { BiLogIn } from 'react-icons/bi'
import fetchDb from '../../axios/fetchDb'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

function Login() {

    const [modalOpen, setModalOpen] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')

    const openSignup = () => {
        (modalOpen ? setModalOpen(false) : setModalOpen(true))
    }

    const handleAuth = async (e) => {
      e.preventDefault();
  
      const userCredentials = {
          userEmail,
          userPass,
      };
  
      if (!userEmail || !userPass) {
          toast.error('Preencha todos os campos!');
          return;
      }
  
      try {
          const res = await fetchDb.post('/login', userCredentials);
          const userId = res.data.userId
          const { token } = res.data.token

          localStorage.setItem('userId', userId);
          localStorage.setItem('token', token);
          window.location.href = '/home';

      } catch (error) {
          toast.error('Email ou senha incorretos!');
          console.log(error);
          console.log(userPass)
      }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <motion.form initial={{y: 40, opacity: 0 }} animate={{ y: 0 , opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className="login-form">
            <h1 className="login-title">e aí? já vendeu?</h1>
            <input className="login-input" value={userEmail} required onChange={(e) => setUserEmail(e.target.value)} type="text" placeholder="E-mail" />
            <input className="login-input" value={userPass} required onChange={(e) => setUserPass(e.target.value)} type="password" placeholder="********" />
            <button className="login-button" onClick={(e) => handleAuth(e)} type="submit">Entrar</button>
        </motion.form>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity:1 }} transition={{ ease: "easeOut", duration: 1.0 }}className="divider"></motion.div>

        <motion.div initial={{y: 40, opacity: 0 }} animate={{ y: 0 , opacity:1 }} transition={{ ease: "easeOut", duration: 0.7 }} className="signup-container">
            <h1>ainda não é cadastrado?</h1>
            <button className="signup-button" onClick={openSignup}><BiLogIn /> Cadastrar</button>
        </motion.div>
      </div>
      {modalOpen && (
                    <Signup modalOpen={modalOpen} setModalOpen={setModalOpen}/>
                )}
    </>
  )
}

export default Login
 