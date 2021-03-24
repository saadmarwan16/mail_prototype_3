import React from 'react'
import Navbar from '../components/Navbar'

const Layout = (props) => {
    return (
        <div>
            <div className="main">
                <div className="container">
                    <Navbar />

                    <div className="container">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout