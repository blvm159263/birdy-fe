import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span className="logo">Birdy Chat</span>
      <div className="user">

      </div>
    </div>
  )
}

export default Navbar