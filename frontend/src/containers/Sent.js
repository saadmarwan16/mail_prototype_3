import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../actions/auth'
import Mailbox from '../components/Mailbox'
import getMails from '../scripts/getMails'
import { onMarkClick, onUnmarkClick } from '../scripts/interactionsMail'

const Sent = ({ isAuthenticated, logout }) => {
    const [mails, setMails] = useState([])

    useEffect(() => {
        getMails('sent', setMails)
    }, [])

    if (!isAuthenticated) {
        logout()
        return <Redirect to="/logout" />
    }

    return (
        <>
            <Helmet>
                <title>Sent - Mail</title>

                <meta name="Access all your sents mails here" content="Sent page" />
            </Helmet>

            <h3 className="main__name">Sent</h3>

            <Mailbox 
                mailbox='sent'
                mails={mails} 
                setMails={setMails} 
                onMarkClick={onMarkClick} 
                onUnmarkClick={onUnmarkClick} 
            />
        </>
    )
}

Sent.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Sent)