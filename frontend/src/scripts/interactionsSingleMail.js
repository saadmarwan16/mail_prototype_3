import axios from 'axios'

export function onMarkClick(id, action) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    } 
    
    const body = JSON.stringify({
        [action]: true
    })

    try {
        axios.put(`${process.env.REACT_APP_API_ROOT_URL}/api/emails/email/${id}`, body, config)
        .then(_res => {})
    } catch(_err) {}
}

export function onUnmarkClick(id, action) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    const body = JSON.stringify({
        [action]: false
    })

    try {
        axios.put(`${process.env.REACT_APP_API_ROOT_URL}/api/emails/email/${id}`, body, config)
        .then(_res => {})
    } catch(_err) {}
}