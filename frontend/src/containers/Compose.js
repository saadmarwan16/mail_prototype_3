import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types'
import Layout from '../hocs/Layout'
import { logout } from '../actions/auth'
import { setAlert } from '../actions/alert'

const Compose = ({ setAlert, isAuthenticated, logout, email }) => {
    const [isSent, setIsSent] = useState(false)

    const [formData, setFormData] = useState({
        sender: email,
        recipients: '',
        subject: '',
        composeBody: ''
    })

    const { sender, recipients, subject, composeBody } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    if (!isAuthenticated) {
        logout()
        return <Redirect to="/logout" />
    }

    if (isSent) {
        return <Redirect to="/sent" />
    }

    const onSubmit = e => {
        e.preventDefault()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        const body = JSON.stringify({
            sender: sender,
            recipients: recipients,
            subject: subject,
            body: composeBody
        })

        try {
            axios.post(`${process.env.REACT_APP_API_ROOT_URL}/api/emails/compose`, body, config)
            .then(res => {
                if (res.data.success) {
                    setAlert(res.data.success, 'success')
                    setIsSent(true)
                } else {
                    setAlert(`Oops! ${res.data.error}`, 'danger')
                }
            })
        } catch(_err) {
            setAlert('Oops! Something went wrong', 'danger')
        }
    }

    return (
        <Layout>
            <Helmet>
                <title>Compose - Mail</title>

                <meta name="You can compose and send messages in here" content="Compose page" />
            </Helmet>

            <div className="main__compose">
                <h3 className="main__compose__heading">New Email</h3>

                <form onSubmit={onSubmit}>
                    <div className="form-group main__compose__sender">
                        From:   
                        <input disabled className="form-control main__compose__sender__inner"
                            name="sender" value={sender}
                        />
                    </div>
                    <div className="form-group main__compose__recipients">
                        To: 
                        <input autoFocus className="form-control main__compose__recipients__inner" 
                            name="recipients" placeholder="Recipient(s)" value={recipients} onChange={onChange}
                        />
                    </div>
                    <div className="form-group main__compose__subject">
                        <input className="form-control main__compose__subject__inner" placeholder="Subject" 
                            name="subject" value={subject} onChange={onChange}
                        />
                    </div>
                    <div className="form-group main__compose__body">
                        <textarea className="form-control main__compose__body__inner" placeholder="Body" 
                            name="composeBody" onChange={onChange} value={composeBody}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary main__compose__submit-btn" />
                </form>
            </div>
        </Layout>
    )
}

Compose.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    email: state.auth.email
})

export default connect(mapStateToProps, { setAlert, logout })(Compose)