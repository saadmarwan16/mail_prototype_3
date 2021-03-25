import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../actions/auth'
import Mailbox from '../components/Mailbox'
import getMails from '../scripts/getMails'
import { onMarkClick, onUnmarkClick } from '../scripts/interactionsMail'

const Trash = ({ isAuthenticated, logout }) => {
    const [mails, setMails] = useState([])

    useEffect(() => {
        getMails('trash', setMails)
    }, [])

    if (!isAuthenticated) {
        logout()
        return <Redirect to="/logout" />
    }

    return (
        <>
            <Helmet>
                <title>Trash - Mail</title>

                <meta name="Access all your trashed mails here" content="Trash page" />
            </Helmet>

            <h3 className="main__name">Trash</h3>

            <Mailbox 
                mailbox='trash'
                mails={mails} 
                setMails={setMails} 
                onMarkClick={onMarkClick} 
                onUnmarkClick={onUnmarkClick} 
            />
        </>
    )
}

Trash.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Trash)