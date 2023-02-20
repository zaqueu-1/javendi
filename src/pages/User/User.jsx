import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import fetchDb from '../../axios/fetchDb'
import defaultPic from '../../img/defaultpic.png'
import './user.css'
import { Link } from 'react-router-dom'
import { BsArrowBarLeft } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

function User() {

  const userId = localStorage.getItem('userId')
  const [user, setUser] = useState([])
  const [editForm, setEditForm] = useState(false)

  const [userPic, setUserPic] = useState(defaultPic)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userBirth, setUserBirth] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [userCity, setUserCity] = useState('')

  const formatDate = (date) => {
    const newDate = new Date(date)

    let options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      timeZone: "UTC",
      hour12: false
    };

    let formattedDate = newDate.toLocaleString("pt-BR", options);
    return formattedDate
  }


  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const res = await fetchDb.get(`/user/${userId}`)
    setUser(res.data)
    console.log(res.data)
  }

  const handleEditForm = (e) => {
    e.preventDefault()
    setEditForm(true)
    setUserName(user.userName)
    setUserEmail(user.userEmail)
    setUserBirth(user.userBirth)
    setUserPhone(user.userPhone)
    setUserAddress(user.userAddress)
    setUserCity(user.userCity)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const updatedUser = {
      userName,
      userEmail,
      userBirth,
      userPhone,
      userAddress,
      userCity,
    }

    if (userName, userEmail, userBirth, userPhone, userAddress, userCity) {
      const res = await fetchDb.put(`/user/${userId}`, updatedUser)
      console.log(res.data)
      toast.success('usuário atualizado!')
      window.location.reload(true)
    } else {
      toast.error('preencha todos os campos!')
    }
  }


  return (
    <>
      <Header />
      <div className="user-container">

        <div className="user-wrapper">
          {editForm === false ? (
            <>
              <div className="user-pic">
                <img alt='avatar' className='user-pic' src={userPic} /> 
              </div>
              <div className="user-info">
                <p className="user-data">Nome: {user.userName}</p>
                <p className="user-data">E-mail: {user.userEmail}</p>
                <p className="user-data">Nascimento: {formatDate(user.userBirth)}</p>
                <p className="user-data">Telefone: {user.userPhone}</p>
                <p className="user-data">Endereço: {user.userAddress}</p>
                <p className="user-data">Cidade: {user.userCity}</p>
              </div>

              <button onClick={(e) => handleEditForm(e)} className="edit-button">Editar</button>
              <Link to='/home'><BsArrowBarLeft />Voltar</Link>
            </>
          ) : editForm === true ? (
            <>
              <div className="user-pic">
                <img alt='avatar' className='user-pic' src={userPic} /> 
              </div>
              <div className="user-info">
                <p className="user-data">Nome: <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} /></p>
                <p className="user-data">E-mail: <input type='text' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} /></p>
                <p className="user-data">Nascimento: <input type='date' value={userBirth} onChange={(e) => setUserBirth(e.target.value)} /></p>
                <p className="user-data">Telefone: <input type='number' value={userPhone} onChange={(e) => setUserPhone(e.target.value)} /></p>
                <p className="user-data">Endereço: <input type='text' value={userAddress} onChange={(e) => setUserAddress(e.target.value)} /></p>
                <p className="user-data">Cidade: <input type='text' value={userCity} onChange={(e) => setUserCity(e.target.value)} /></p>
              </div>

              <div className="controls">
                <button onClick={(e) => handleUpdate(e)} className="edit-button">Enviar</button>
                <button onClick={(e) => window.location.reload(true)} className="cancel-edit">Cancelar</button>
              </div>

            </>
          ) : 0}
        </div>
      </div>
    </>
  )
}

export default User
