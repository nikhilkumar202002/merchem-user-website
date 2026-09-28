import React from 'react'
import Image from 'next/image'
import '../styles/Layout.css'
import Logo from "../../../public/Main_logo.png"

const Header = () => {
  return (
    <>
        <nav className='main-navbar'>
            <header className='main-navbar-content'>
                <div className="main-navbar-container">
                    <div className="main-navbar-flex">
                        <div className="main-navbar-logo">
                            <Image
                                src={Logo}
                                alt='Logo'
                                width={100}
                                height={100}
                            />
                        </div>
                        <div className="main-navbar-menu-items">
                            <div className="main-navbar-menu-topbar"></div>
                            <div className="main-navbar-menu-bottom"></div>
                        </div>
                    </div>
                </div>
            </header>
        </nav>
    </>
  )
}

export default Header