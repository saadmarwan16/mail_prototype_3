import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { signup } from '../actions/auth'
import Auth from '../components/Auth'
import { setAlert } from '../actions/alert'

const Register = ({ setAlert, signup, isAuthenticated, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmation: ''
    })

    const { name, email, password, confirmation } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const formDetails = [
        {
            isAutoFocus: true,
            type: 'text',
            placeholder: 'Full name',
            name: 'name',
            value: name,
            onChange: onChange
        },
        {
            isAutoFocus: false,
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
        },
        {
            isAutoFocus: false,
            type: 'password',
            placeholder: 'Password Again',
            name: 'confirmation',
            value: confirmation,
            onChange: onChange
        }
    ]

    const onSubmit = e => {
        e.preventDefault()

        if (password !== confirmation) {
            setAlert('Passwords do not match', 'error')
        } else {
            signup({ name, email, password, confirmation })
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/inbox" /> 
    }

    return (
        <div className="container-fluid auth">
            <Helmet>
                <title>Register - Mail</title>

                <meta name="Register to get the best messaging experience" content="registration page" />
            </Helmet>

            <div className="auth__subsection">
                <div className="auth__subsection__subsection">
                    <div className="auth__subsection__subsection__form">
                        <Auth
                            formDetails={formDetails} 
                            submitValue="Register" 
                            onSubmit={onSubmit} 
                        />
                    
                        <small className="auth__subsection__subsection__form__small">
                            Already have an account? 
                            <Link className="auth__subsection__subsection__form__small__link" 
                                to="/login"
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

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
})

export default connect(mapStateToProps, { setAlert, signup })(Register)