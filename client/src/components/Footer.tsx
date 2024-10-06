import React from 'react'
import logo from '../assets/img/logo.png'


const Footer = () => {
  return (
    <div className='container-fluid footer text-white text-center py-4 mt-auto'>
      <div className="d-flex justify-content-center align-items-center gap-3">
        <img src={logo} alt="icon" />
        <h4>Beyond the pages</h4>
      </div>
    </div>
  )
}

export default Footer