import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../actions/auth'
import Auth from '../components/Auth'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const formDetails = [
        {
            isAutoFocus: true,
            type: 'email',
            placeholder: 'Email Address',
            name: 'email',
            value: email,
            onChange: onChange
        },
        {
            isAutoFocus: false,
            type: 'password',
            placeholder: 'Password',
            name: 'password',
            value: password,
            onChange: onChange
        }
    ]

    const onSubmit = e => {
        e.preventDefault()

        login(email, password)
    }

    if (isAuthenticated) {
        return <Redirect to="/inbox" /> 
    }
    
    return (
        <div className="container-fluid auth">
            <Helmet>
                <title>Login - Mail</title>

                <meta name="Login to get the best messaging experience" content="login page" />
            </Helmet>

            <div className="auth__subsection">
                <div className="auth__subsection__subsection">
                    <div className="auth__subsection__subsection__form">
                        <h2 className="auth__subsection__subsection__form__heading">Login</h2>

                        <Auth
                            formDetails={formDetails} 
                            submitValue="Login" 
                            onSubmit={onSubmit} 
                        />
                    
                        <small className="auth__subsection__subsection__form__small">
                            Don't have an account? 
                            <Link className="auth__subsection__subsection__form__small__link" 
                                to="/register"
                            >
                                Register
                            </Link>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)