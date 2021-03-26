import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types'

var jwt = require('jsonwebtoken')

const isTokenValid = () => {
    const token = localStorage.getItem('token')
    const decodedToken = jwt.decode(token, {complete: true})
    const dateNow = new Date()

    try {
        return decodedToken.payload.exp < dateNow.getTime()
    } catch(_err) {
        return null
    }
}

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: isTokenValid(),
    loading: false,
    email: localStorage.getItem('email')
}

// eslint-disable-next-line
export default function(state = initialState, action) {
    const { type, payload, email } = action

    switch(type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.access)
            localStorage.setItem('email', email)
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                token: payload.access,
                email: email
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                loading: true
            }
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                email: null
            }
        default:
            return state
    }
}