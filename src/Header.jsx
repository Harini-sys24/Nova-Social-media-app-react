import React from 'react'
import {FaLaptop,FaTabletAlt,FaMobileAlt} from 'react-icons/fa'
const Header = ({title,width}) => {
  return (
    <header className="Header">
        <h1>{title}</h1>
        {width < 768 ? (
            <FaMobileAlt size={30} />
        ) : width <992 ? (
            <FaTabletAlt size={30} />
        ) : (
            <FaLaptop size={30} />
        )}
    </header>
  )
}

export default Header