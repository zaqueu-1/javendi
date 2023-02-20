import React, { useEffect, useRef, useState } from 'react'
import './signup.css'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import fetchDb from '../../axios/fetchDb'

function Signup({ modalOpen, setModalOpen }) {

    const modalRef = useRef(null);

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    useEffect(() => {
        if (modalOpen) {
          document.addEventListener("click", handleClickOutside);
        } else {
          document.removeEventListener("click", handleClickOutside);
        }
      
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, []);
      

    function handleClickOutside(e) {
        if (e.target === modalRef.current) {
          setModalOpen(false);
        }
      }

      const handleSignUp = async (e) => {
        e.preventDefault();
      
        const newUser = {
          userName,
          userEmail,
          userPass,
        }
      
        if (userName && userEmail && userPass && confirmPass) {
          if (userPass === confirmPass) {
            const res = await fetchDb.post('/user', newUser)

            if (res.status === 200) {
              toast.error('E-mail já cadastrado!')
            }
        
            if (res.status === 201) {
              toast.success('Cadastrado com sucesso!')
              setModalOpen(false)
            } 

          } else {
            toast.error('As senhas precisam ser iguais!')
          }
        } else { 
          toast.error('Preencha todos os campos!')
        }
      }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.2 } }} ref={modalRef} className='modal-container'>
      <motion.form initial={{y:20}} animate={{ y: 0}} transition={{ ease: "easeOut", duration: 0.8 }} className="signup-box">
        <h1>cadastre-se</h1>
        <p>ou clique fora da caixa para voltar</p>
        <form style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'}}>
          <input className='signup-input' type='text' required value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Nome' />
          <input className='signup-input' type='text' required value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder='E-mail' />
          <input className='signup-input' type='password' required value={userPass} onChange={(e) => setUserPass(e.target.value)} placeholder='Senha' />
          <input className='signup-input' type='password' required value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder='Confirmar senha' />
          <button className='signup-button' type='submit' onClick={(e) => handleSignUp(e)}>Cadastrar</button>
        </form>
      </motion.form>
    </motion.div>
  )
}

export default Signup
 