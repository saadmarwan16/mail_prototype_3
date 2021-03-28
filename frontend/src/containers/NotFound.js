import React from 'react'
import { Helmet } from 'react-helmet'

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>Not Found - Mail</title>

                <meta 
                    name="We searched up and down but could not find the page you requested" 
                    content="Not found page" 
                />
            </Helmet>
            
            <div className="notfound">
                <h1 className="notfound__heading">404 Not Found</h1>
                <p className="notfound__paragraph">
                    We looked up and down but could not find the link you requested
                </p>
            </div>
        </>
    )
}

export default NotFound