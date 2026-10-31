import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    
    <footer className="Footer">
        <h1>
            Copyrights &copy; {year} Nova. All Rights Reserved.
        </h1>
    </footer>
  )
}

export default Footer