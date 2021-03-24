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
                    The link you requested does not exist on our website.
                </p>
            </div>
        </>
    )
}

export default NotFound