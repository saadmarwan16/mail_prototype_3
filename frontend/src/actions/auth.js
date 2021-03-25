import axios from 'axios'
import { setAlert } from './alert'
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from './types'

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post('http://127.0.0.1:5000/api/token/', body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
            email: email
        })

        dispatch(setAlert('Authenticated successfully', 'success'))
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })

        dispatch(setAlert('Error Authenticating', 'error'))
    }
}

export const signup = ({ name, email, password, confirmation }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password, confirmation })

    try {
        const res = await axios.post('http://127.0.0.1:5000/accounts/signup', body, config)

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })

        dispatch(login(email, password))
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })

        dispatch(setAlert('Error Authenticating', 'error'))
    }
}

export const logout = () => dispatch => {
    dispatch(setAlert('Logout successful', 'success'))
    dispatch({ type: LOGOUT, email: null })
}