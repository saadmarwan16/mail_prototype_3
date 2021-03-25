import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../actions/auth'
import Mailbox from '../components/Mailbox'
import getMails from '../scripts/getMails'
import { onMarkClick, onUnmarkClick } from '../scripts/interactionsMail'

const Archive = ({ isAuthenticated, logout }) => {
    const [mails, setMails] = useState([])

    useEffect(() => {
        getMails('archive', setMails)
    }, [])

    if (!isAuthenticated) {
        logout()
        return <Redirect to="/logout" />
    }

    return (
        <>
            <Helmet>
                <title>Archive - Mail</title>

                <meta name="Access all your archived mails here" content="Archive page" />
            </Helmet>

            <h3 className="main__name">Archive</h3>

            <Mailbox 
                mailbox='archive'
                mails={mails} 
                setMails={setMails} 
                onMarkClick={onMarkClick} 
                onUnmarkClick={onUnmarkClick} 
            />
        </>
    )
}

Archive.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Archive)