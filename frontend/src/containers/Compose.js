import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types'
import { logout } from '../actions/auth'

const Compose = ({ isAuthenticated, logout, email }) => {
    const [isSent, setIsSent] = useState(false)

    const [formData, setFormData] = useState({
        sender: email,
        recipients: [],
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
            axios.post('http://127.0.0.1:5000/api/emails/compose', body, config)
            .then(res => {
                if (res.data.success) {
                    setIsSent(true)
                } else {
                    console.log("Failed")
                    // Do something
                }
            })
        } catch(_err) {}
    }

    return (
        <>
            <Helmet>
                <title>Compose - Mail</title>

                <meta name="You can compose and send messages in here" content="Compose page" />
            </Helmet>

            <div className="main__compose">
                <h3 className="main__compose__heading">New Email</h3>

                {/* <div className={isErrorMessage ? 'alert alert-danger \
                    register-login-error-message' : 'alert alert-danger \
                    register-login-error-message hide'}
                >
                    <strong>Oops!</strong> {errorMessage}
                </div> */}

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
        </>
    )
}

Compose.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    email: state.auth.email
})

export default connect(mapStateToProps, { logout })(Compose)